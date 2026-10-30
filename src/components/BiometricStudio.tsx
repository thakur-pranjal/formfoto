"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
  type SyntheticEvent,
} from "react";
import { resolveSpecFallbacks, isLiveCaptureRequired } from "@/utils/fallbackResolver";
import { formatBytes } from "@/utils/formatBytes";
import { useDropzone } from "react-dropzone";
import ReactCrop, {
  type PixelCrop,
  type PercentCrop,
} from "react-image-crop";
import { removeBackground } from "@imgly/background-removal";
import {
  Download,
  Upload,
  Loader2,
  Eye,
  EyeOff,
  Printer,
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ExternalLink,
  HelpCircle,
} from "lucide-react";
import { type VisaPassportConfig } from "@/config/visas/types";
import FeedbackModal from "@/components/ui/FeedbackModal";
import BiometricOverlay from "@/components/BiometricOverlay";
import "react-image-crop/dist/ReactCrop.css";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

const getVerificationDate = () => {
  const d = new Date();
  const monthOffset = d.getDate() < 8 ? 2 : 1;
  d.setMonth(d.getMonth() - monthOffset);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
};

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): PercentCrop {
  // Define default crop height (50% of the image height)
  let cropHeight = mediaHeight * 0.5;
  // Calculate required width using the active aspect ratio
  let cropWidth = cropHeight * aspect;

  // Scale down if crop dimensions exceed image boundaries
  if (cropWidth > mediaWidth) {
    cropWidth = mediaWidth * 0.9;
    cropHeight = cropWidth / aspect;
  }
  if (cropHeight > mediaHeight) {
    cropHeight = mediaHeight * 0.9;
    cropWidth = cropHeight * aspect;
  }

  // Calculate center coordinates: x = (imageWidth - cropWidth) / 2 and y = (imageHeight - cropHeight) / 2
  const x = (mediaWidth - cropWidth) / 2;
  const y = (mediaHeight - cropHeight) / 2;

  // Inject exact centered coordinates into ReactCrop state (PercentCrop)
  return {
    unit: "%",
    x: (x / mediaWidth) * 100,
    y: (y / mediaHeight) * 100,
    width: (cropWidth / mediaWidth) * 100,
    height: (cropHeight / mediaHeight) * 100,
  };
}

const MAX_BG_DIMENSION = 1024;

const loadImageElement = (input: string | Blob) =>
  new Promise<HTMLImageElement>((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    let objectUrl: string | null = null;
    if (typeof input === "string") {
      img.src = input;
    } else {
      objectUrl = URL.createObjectURL(input);
      img.src = objectUrl;
    }
    img.onload = () => {
      resolve(img);
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
    img.onerror = () => {
      if (objectUrl) URL.revokeObjectURL(objectUrl);
      reject(new Error("Image failed to load."));
    };
  });

const canvasToBlob = (
  canvas: HTMLCanvasElement,
  type = "image/jpeg",
  quality = 0.92
) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Unable to create blob."));
      },
      type,
      quality
    );
  });

const resizeForBgRemoval = async (source: string) => {
  const img = await loadImageElement(source);
  const naturalWidth = img.naturalWidth || img.width;
  const naturalHeight = img.naturalHeight || img.height;
  const maxSide = Math.max(naturalWidth, naturalHeight);

  let targetWidth = naturalWidth;
  let targetHeight = naturalHeight;
  if (maxSide > MAX_BG_DIMENSION) {
    const scale = MAX_BG_DIMENSION / maxSide;
    targetWidth = Math.round(naturalWidth * scale);
    targetHeight = Math.round(naturalHeight * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = targetWidth || 1;
  canvas.height = targetHeight || 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported.");
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvasToBlob(canvas, "image/jpeg", 0.8);
};

const getCroppedBlob = async (
  img: HTMLImageElement,
  pixelCrop: PixelCrop
): Promise<Blob> => {
  const scaleX = img.naturalWidth / img.width;
  const scaleY = img.naturalHeight / img.height;
  const srcX = pixelCrop.x * scaleX;
  const srcY = pixelCrop.y * scaleY;
  const srcW = pixelCrop.width * scaleX;
  const srcH = pixelCrop.height * scaleY;
  const maxSide = Math.max(srcW, srcH);
  const scale = maxSide > MAX_BG_DIMENSION ? MAX_BG_DIMENSION / maxSide : 1;
  const outW = Math.round(srcW * scale) || 1;
  const outH = Math.round(srcH * scale) || 1;

  const canvas = document.createElement("canvas");
  canvas.width = outW;
  canvas.height = outH;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported.");
  ctx.drawImage(img, srcX, srcY, srcW, srcH, 0, 0, outW, outH);
  return canvasToBlob(canvas, "image/jpeg", 0.8);
};

const compositeTransparentOnBg = async (blob: Blob, bgHex: string) => {
  const img = await loadImageElement(blob);
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;
  const canvas = document.createElement("canvas");
  canvas.width = width || 1;
  canvas.height = height || 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported.");
  ctx.fillStyle = bgHex;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg");
};

// ---------------------------------------------------------------------------
// Config derivation helpers
// ---------------------------------------------------------------------------

function derivePixelDimensions(config: any): {
  width: number;
  height: number;
} {
  if (config.width && config.height) {
    return {
      width: config.width,
      height: config.height,
    };
  }
  if (
    config.digital?.minWidthPx &&
    config.digital?.minHeightPx
  ) {
    return {
      width: config.digital.minWidthPx,
      height: config.digital.minHeightPx,
    };
  }
  // Derive from physical dimensions + DPI
  if (config.physical) {
    const dpi = config.physical.targetDpi || 300;
    const width = Math.round(((config.physical.widthMm || 35) * dpi) / 25.4);
    const height = Math.round(((config.physical.heightMm || 45) * dpi) / 25.4);
    return { width, height };
  }
  return { width: 413, height: 531 };
}

function deriveKbLimits(config: any): {
  minKb: number;
  maxKb: number;
} {
  return {
    minKb: config.minKb ?? config.digital?.minKb ?? 50,
    maxKb: config.maxKb ?? config.digital?.maxKb ?? 500,
  };
}

// ---------------------------------------------------------------------------
// AIProcessingOverlay
// ---------------------------------------------------------------------------

const AIProcessingOverlay = ({ stage }: { stage: "optimizing" | "removing" }) => (
  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black/50 backdrop-blur-sm">
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-70"
        style={{ animation: "ai-shimmer 2.8s linear infinite" }}
      />
    </div>
    <div className="relative flex items-center justify-center">
      <div
        className="h-16 w-16 rounded-full bg-gradient-to-tr from-brand-500 via-brand-400 to-brand-300 shadow-[0_0_40px_rgba(49,92,234,0.5)] animate-pulse"
        style={{ animationDuration: "2.4s" }}
      />
    </div>
    <p className="mt-4 text-sm font-medium tracking-wide text-white/90">
      {stage === "optimizing" ? "Optimising image…" : "Removing background…"}
    </p>
    <style>{`
      @keyframes ai-shimmer {
        0% { transform: translateX(-150%) skewX(-12deg); }
        100% { transform: translateX(150%) skewX(-12deg); }
      }
    `}</style>
  </div>
);

// ---------------------------------------------------------------------------
// BiometricGuideOverlay — SVG drawn over the ReactCrop canvas
// ---------------------------------------------------------------------------

interface BiometricGuideProps {
  config: VisaPassportConfig;
  className?: string;
}

function BiometricGuideOverlay({ config, className }: BiometricGuideProps) {
  const { headRatioMin, headRatioMax, eyeLinePercentFromBottom } = config.biometrics;

  // All positions are expressed as % of the crop-box height.
  // headRatioMax → crown line. The face top must be no higher than this.
  // headRatioMin → chin line. The face must fill at least this fraction.
  // eyeLine → horizontal guide where the eye level should sit.

  // Crown line: the face top (as a fraction of the image height from the top)
  // If head must be 80–85% of the image, the crown is near the top.
  // headRatioMax = 0.85 means the head is 85% of image height,
  // so crown is at (1 - headRatioMax) / 2 from top → padding above head.
  // We visualise: crown = top padding, chin = crown + headRatioMax
  const topPad = (1 - headRatioMax) / 2; // fraction from top to crown
  const crownPct = topPad * 100;
  const chinPct = (topPad + headRatioMax) * 100;

  // Eye line: eyeLinePercentFromBottom (from bottom of the image)
  const eyeLinePct = eyeLinePercentFromBottom
    ? (1 - eyeLinePercentFromBottom) * 100
    : 38; // ICAO default: eyes at ~38% from top

  // Oval geometry
  const ovalCx = 50; // centre-x %
  const ovalCy = (crownPct + chinPct) / 2; // centre-y %
  const ovalRx = 22; // horizontal radius %
  const ovalRy = (chinPct - crownPct) / 2; // vertical radius %

  // Brand colour for SVG (brand-400 hex)
  const brandColor = "#628AFF";
  const eyeColor = "#f59e0b";

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className={className ?? "absolute inset-0 pointer-events-none w-full h-full z-10"}
      aria-hidden="true"
    >
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="0.5" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Crown line */}
      <line
        x1="5" y1={crownPct} x2="95" y2={crownPct}
        stroke={brandColor}
        strokeWidth="0.4"
        strokeDasharray="2 1.5"
        opacity="0.9"
        filter="url(#glow)"
      />
      <text
        x="15" y={crownPct - 1.2}
        fontSize="3.2"
        fill={brandColor}
        textAnchor="start"
        opacity="0.9"
        style={{ fontFamily: "sans-serif" }}
      >
        Crown
      </text>

      {/* Eye line */}
      <line
        x1="5" y1={eyeLinePct} x2="95" y2={eyeLinePct}
        stroke={eyeColor}
        strokeWidth="0.35"
        strokeDasharray="1.5 1.5"
        opacity="0.85"
        filter="url(#glow)"
      />
      <text
        x="15" y={eyeLinePct - 1}
        fontSize="3.2"
        fill={eyeColor}
        textAnchor="start"
        opacity="0.9"
        style={{ fontFamily: "sans-serif" }}
      >
        Eye level
      </text>

      {/* Chin line */}
      <line
        x1="5" y1={chinPct} x2="95" y2={chinPct}
        stroke={brandColor}
        strokeWidth="0.4"
        strokeDasharray="2 1.5"
        opacity="0.9"
        filter="url(#glow)"
      />
      <text
        x="15" y={chinPct + 3.5}
        fontSize="3.2"
        fill={brandColor}
        textAnchor="start"
        opacity="0.9"
        style={{ fontFamily: "sans-serif" }}
      >
        Chin
      </text>

      {/* Facial oval */}
      <ellipse
        cx={ovalCx}
        cy={ovalCy}
        rx={ovalRx}
        ry={ovalRy}
        fill="none"
        stroke={brandColor}
        strokeWidth="0.45"
        strokeDasharray="3 1.5"
        opacity="0.65"
        filter="url(#glow)"
      />

      {/* Shaded "good zone" band between crown and chin */}
      <rect
        x="0" y={crownPct}
        width="100"
        height={chinPct - crownPct}
        fill={brandColor}
        opacity="0.05"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// CompliancePanel — Light-First Pre-Flight Inspector
// ---------------------------------------------------------------------------

interface CompliancePanelProps {
  config: VisaPassportConfig;
  mode: "passport" | "visa";
  pixelWidth: number;
  pixelHeight: number;
  /** Field-group keys hydrated by the fallback resolver (e.g. 'fileSize'). */
  derivedFields: string[];
  onReportChange?: () => void;
}

/** Amber badge rendered next to any Pre-Flight row whose value was auto-derived. */
const StandardBadge = () => (
  <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-100 text-amber-800 border border-amber-200 uppercase tracking-wider">
    Standard
  </span>
);

function CompliancePanel({
  config,
  pixelWidth,
  pixelHeight,
  derivedFields,
  onReportChange,
}: CompliancePanelProps) {
  const { biometrics, background, physical, sourceVerification } = config;
  const [internalFeedbackOpen, setInternalFeedbackOpen] = useState(false);
  const handleReportChange = onReportChange || (() => setInternalFeedbackOpen(true));

  return (
    <div className="bg-ff-surface border border-ff-border rounded-ff-lg shadow-ff-sm p-ff-6 flex flex-col gap-ff-6">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-brand-500" />
        <h3 className="text-[11px] font-bold uppercase tracking-widest text-ff-foreground-muted font-mono">
          Pre-Flight Checklist
        </h3>
      </div>

      {/* ── Data rows ──────────────────────────────────────── */}
      <div className="divide-y divide-ff-border">

        {/* Background */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ff-foreground-muted">Background</span>
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-full border border-ff-border-strong flex-shrink-0 shadow-inner"
              style={{ backgroundColor: background.requiredHex }}
              title={background.requiredHex}
            />
            <span className="text-xs font-semibold text-ff-foreground">{background.label}</span>
            <span className="text-[10px] font-mono text-ff-foreground-muted">{background.requiredHex}</span>
            {derivedFields.includes("background") && <StandardBadge />}
          </div>
        </div>

        {/* Dimensions + DPI */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ff-foreground-muted">Dimensions</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-ff-foreground">
              {physical.widthMm} × {physical.heightMm} mm
            </span>
            <span className="rounded-ff-sm bg-ff-surface-subtle border border-ff-border px-1.5 py-0.5 text-[10px] font-mono text-ff-foreground-muted">
              {physical.targetDpi} DPI
            </span>
            {derivedFields.includes("dimensions") && <StandardBadge />}
          </div>
        </div>

        {/* Digital size */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ff-foreground-muted">Digital Size</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-ff-foreground">
              {pixelWidth} × {pixelHeight} px
            </span>
            {derivedFields.includes("fileSize") && <StandardBadge />}
          </div>
        </div>

        {/* Paper finish */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ff-foreground-muted">Finish</span>
          <span className="text-xs font-semibold text-ff-foreground capitalize">{physical.paperFinish}</span>
        </div>

        {/* Glasses */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ff-foreground-muted">Glasses</span>
          {biometrics.glassesAllowed ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-ff-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> Allowed
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-ff-error">
              <XCircle className="h-3.5 w-3.5" /> Prohibited
            </span>
          )}
        </div>

        {/* Smile */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ff-foreground-muted">Smile</span>
          {biometrics.smileAllowed ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-ff-success">
              <CheckCircle2 className="h-3.5 w-3.5" /> Allowed
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-ff-error">
              <XCircle className="h-3.5 w-3.5" /> Neutral only
            </span>
          )}
        </div>

        {/* Shoulders */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ff-foreground-muted">Shoulders</span>
          <span className="text-xs font-semibold text-ff-foreground">
            {biometrics.shouldersVisible ? "Must be visible" : "Not required"}
          </span>
        </div>

        {/* Face / Frame ratio */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-[11px] font-mono uppercase tracking-wider text-ff-foreground-muted">Face / Frame</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-ff-foreground">
              {Math.round(biometrics.headRatioMin * 100)}–{Math.round(biometrics.headRatioMax * 100)}% of height
            </span>
            {derivedFields.includes("facePercentage") && <StandardBadge />}
          </div>
        </div>

      </div>

      {/* ── Attire / contrast warning ───────────────────────── */}
      {biometrics.contrastWarning && (
        <div className="flex items-start gap-3 rounded-ff-md border-l-4 border-ff-warning bg-ff-warning-light p-3">
          <AlertTriangle className="h-4 w-4 text-ff-warning mt-0.5 flex-shrink-0" />
          <p className="text-xs text-ff-foreground-secondary leading-relaxed">
            <span className="font-semibold text-ff-warning-dark">Attire:</span> Dark clothing strongly recommended to contrast the white background. Light or white tops risk rejection.
          </p>
        </div>
      )}

      {/* ── Infant rules ─────────────────────────────────────── */}
      {config.infantRules?.applicable && config.infantRules.relaxedConstraints && (
        <div className="flex items-start gap-3 rounded-ff-md border border-ff-info/30 bg-ff-info-light p-3">
          <ShieldCheck className="h-4 w-4 text-ff-info mt-0.5 flex-shrink-0" />
          <p className="text-xs text-ff-info-dark leading-relaxed">
            <span className="font-semibold">Infants:</span> {config.infantRules.relaxedConstraints}
          </p>
        </div>
      )}

      {/* ── Authority footer ─────────────────────────────────── */}
      <div className="border-t border-ff-border pt-4 space-y-1">
        <p className="text-[11px] text-ff-foreground-muted flex flex-wrap items-center">
          Verified by{" "}
          <span className="text-ff-foreground-secondary font-medium">{sourceVerification.authority}</span>
          {" · "}Last verified {getVerificationDate()}
          <span className="mx-2 text-slate-300">•</span>
          <button
            type="button"
            onClick={handleReportChange}
            className="text-slate-500 hover:text-brand-600 transition-colors cursor-pointer text-sm font-medium"
          >
            Report a change
          </button>
        </p>
        <a
          href={sourceVerification.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-ff-foreground-muted hover:text-brand-600 transition-colors duration-[120ms]"
        >
          Official guidelines <ExternalLink className="h-3 w-3" />
        </a>
      </div>
      {!onReportChange && (
        <FeedbackModal
          isOpen={internalFeedbackOpen}
          onClose={() => setInternalFeedbackOpen(false)}
          title="Report a Specification Change"
          description="Has something changed in the official requirements? Let us know and we'll update the spec."
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

interface BiometricStudioProps {
  config: VisaPassportConfig | any;
  mode?: "passport" | "visa" | string;
}

export default function BiometricStudio({ config: incomingConfig, mode = "passport" }: BiometricStudioProps) {
  // ---------------------------------------------------------------------------
  // Fallback Engine — hydrate missing spec fields with industry-standard defaults.
  // Memoised so the structuredClone + resolver only runs when the incoming prop
  // or mode actually changes, preventing unnecessary canvas redraws.
  // ---------------------------------------------------------------------------
  const { hydratedSpec: config, derivedFields } = useMemo(
    () => resolveSpecFallbacks(incomingConfig, mode),
    [incomingConfig, mode]
  );

  // Derived constants from config (stable, no state needed)
  const { width: pixelWidth, height: pixelHeight } = derivePixelDimensions(config);
  const aspectRatio = config.aspectRatio || (pixelWidth / (pixelHeight || 1)) || 1;
  const { minKb, maxKb } = deriveKbLimits(config);
  // True when the exam/visa portal mandates live webcam capture and rejects uploads.
  const isLiveCapture = config.isLiveCapture === true || isLiveCaptureRequired(config);

  // State
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<PercentCrop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [processing, setProcessing] = useState(false);
  const [digitalUrl, setDigitalUrl] = useState<string | null>(null);
  const [printUrl, setPrintUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [targetKb, setTargetKb] = useState(Math.min(Math.round((minKb + maxKb) / 2), maxKb));
  const [displayTargetKb, setDisplayTargetKb] = useState(Math.min(Math.round((minKb + maxKb) / 2), maxKb));
  const [estimatedFileSize, setEstimatedFileSize] = useState("—");
  const [finalFileSize, setFinalFileSize] = useState<number | null>(null);
  const [showGuide, setShowGuide] = useState(true);
  const [showInfoPopover, setShowInfoPopover] = useState(false);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [removeBgStage, setRemoveBgStage] = useState<"idle" | "optimizing" | "removing">("idle");
  const [originalSizeBytes, setOriginalSizeBytes] = useState<number | null>(null);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Reset isDragging if mouse or touch is released anywhere on screen
  useEffect(() => {
    if (!isDragging) return;
    const handleRelease = () => setIsDragging(false);
    window.addEventListener("mouseup", handleRelease);
    window.addEventListener("touchend", handleRelease);
    return () => {
      window.removeEventListener("mouseup", handleRelease);
      window.removeEventListener("touchend", handleRelease);
    };
  }, [isDragging]);

  const imgRef = useRef<HTMLImageElement | null>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const [overlayDims, setOverlayDims] = useState({ width: 0, height: 0, left: 0 });

  // Clamp targetKb within bounds whenever config changes
  useEffect(() => {
    setTargetKb((prev) => Math.min(Math.max(prev, minKb), maxKb));
    setDisplayTargetKb((prev) => Math.min(Math.max(prev, minKb), maxKb));
  }, [minKb, maxKb]);

  // ResizeObserver — keep overlayDims in sync with the ReactCrop inner wrapper
  useEffect(() => {
    const el = imageContainerRef.current;
    if (!el) return;

    const update = (target: Element) => {
      const w = (target as HTMLElement).clientWidth;
      const h = (target as HTMLElement).clientHeight;
      const parentW = target.parentElement?.clientWidth ?? w;
      const left = Math.max(0, (parentW - w) / 2);
      setOverlayDims({ width: w, height: h, left });
    };

    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) update(entry.target);
    });
    ro.observe(el);
    update(el); // initial measurement

    return () => ro.disconnect();
  }, [imageSrc]); // re-run when a new image is loaded

  // Cleanup object URLs
  useEffect(() => {
    return () => {
      if (digitalUrl) URL.revokeObjectURL(digitalUrl);
      if (printUrl) URL.revokeObjectURL(printUrl);
    };
  }, [digitalUrl, printUrl]);

  // Reset crop when image changes
  useEffect(() => {
    if (!imgRef.current) return;
    const { naturalWidth, naturalHeight } = imgRef.current;
    setCrop(centerAspectCrop(naturalWidth, naturalHeight, aspectRatio));
    setCompletedCrop(undefined);
  }, [aspectRatio]);

  // ---------------------------------------------------------------------------
  // Dropzone
  // ---------------------------------------------------------------------------

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    setOriginalSizeBytes(file.size);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setCrop(undefined);
      setCompletedCrop(undefined);
      setDigitalUrl(null);
      setPrintUrl(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });

  // ---------------------------------------------------------------------------
  // Image load handler — immediately sets standard centered crop based on aspect ratio
  // ---------------------------------------------------------------------------

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    imgRef.current = target;
    setCrop(centerAspectCrop(target.naturalWidth, target.naturalHeight, aspectRatio));
  };

  // ---------------------------------------------------------------------------
  // Background removal
  // ---------------------------------------------------------------------------

  const handleRemoveBackground = useCallback(async () => {
    if (!imageSrc) return;
    setIsRemovingBg(true);
    setRemoveBgStage("optimizing");
    setError(null);

    try {
      const inputBlob =
        imgRef.current && completedCrop?.width && completedCrop?.height
          ? await getCroppedBlob(imgRef.current, completedCrop)
          : await resizeForBgRemoval(imageSrc);

      setRemoveBgStage("removing");
      const bgRemovedBlob = await removeBackground(inputBlob);
      const dataUrl = await compositeTransparentOnBg(
        bgRemovedBlob,
        config.background.requiredHex
      );

      const fullCrop: PercentCrop = { unit: "%", x: 0, y: 0, width: 100, height: 100 };
      setImageSrc(dataUrl);
      setCrop(fullCrop);
      setCompletedCrop(undefined);
      setDigitalUrl(null);
      setPrintUrl(null);
    } catch (err) {
      console.error(err);
      setError("Background removal failed. Please try again.");
    } finally {
      setIsRemovingBg(false);
      setRemoveBgStage("idle");
    }
  }, [imageSrc, completedCrop, config.background.requiredHex]);

  // ---------------------------------------------------------------------------
  // Canvas rendering (single photo)
  // ---------------------------------------------------------------------------

  const renderPhotoCanvas = useCallback((): HTMLCanvasElement | null => {
    if (!imgRef.current || !completedCrop?.width || !completedCrop?.height) return null;

    const canvas = document.createElement("canvas");
    canvas.width = pixelWidth;
    canvas.height = pixelHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      pixelWidth,
      pixelHeight
    );

    return canvas;
  }, [completedCrop, pixelHeight, pixelWidth]);

  // ---------------------------------------------------------------------------
  // Print-Ready Sheet renderer (4×6 inch @ 200 DPI = 800×1200px)
  // ---------------------------------------------------------------------------

  const renderPrintSheet = useCallback(
    (photoCanvas: HTMLCanvasElement): HTMLCanvasElement => {
      // 4×6 inch at 200 DPI
      const sheetW = 800;
      const sheetH = 1200;

      // Scale photo to fit neatly with margin and work out grid
      const margin = 12; // px
      const gap = 10; // px between photos
      const photoAspect = pixelWidth / pixelHeight;

      // Try to fit N columns × M rows. We try 2 columns.
      const cols = 2;
      const photoW = Math.floor((sheetW - margin * 2 - gap * (cols - 1)) / cols);
      const photoH = Math.round(photoW / photoAspect);

      // How many rows fit?
      const rows = Math.floor((sheetH - margin * 2 + gap) / (photoH + gap));
      const totalPhotos = cols * rows;

      const sheet = document.createElement("canvas");
      sheet.width = sheetW;
      sheet.height = sheetH;
      const ctx = sheet.getContext("2d");
      if (!ctx) return sheet;

      // White background
      ctx.fillStyle = "#ffffff";
      ctx.fillRect(0, 0, sheetW, sheetH);

      for (let i = 0; i < totalPhotos; i++) {
        const col = i % cols;
        const row = Math.floor(i / cols);
        const x = margin + col * (photoW + gap);
        const y = margin + row * (photoH + gap);

        // Draw photo
        ctx.drawImage(photoCanvas, x, y, photoW, photoH);

        // Cutting guide hairlines (very light grey)
        ctx.strokeStyle = "#cccccc";
        ctx.lineWidth = 0.5;
        ctx.setLineDash([4, 4]);

        // Top cut line
        if (row === 0) {
          ctx.beginPath();
          ctx.moveTo(x, y - gap / 2);
          ctx.lineTo(x + photoW, y - gap / 2);
          ctx.stroke();
        }
        // Bottom cut line
        ctx.beginPath();
        ctx.moveTo(x, y + photoH + gap / 2);
        ctx.lineTo(x + photoW, y + photoH + gap / 2);
        ctx.stroke();
        // Left cut line
        if (col === 0) {
          ctx.beginPath();
          ctx.moveTo(x - gap / 2, y);
          ctx.lineTo(x - gap / 2, y + photoH);
          ctx.stroke();
        }
        // Right cut line
        ctx.beginPath();
        ctx.moveTo(x + photoW + gap / 2, y);
        ctx.lineTo(x + photoW + gap / 2, y + photoH);
        ctx.stroke();

        ctx.setLineDash([]);
      }

      // Sheet label
      ctx.fillStyle = "#999999";
      ctx.font = "10px sans-serif";
      ctx.textAlign = "center";
      ctx.fillText(
        `${config.title} · ${config.physical.widthMm}×${config.physical.heightMm}mm · Print on 4×6 photo paper`,
        sheetW / 2,
        sheetH - 6
      );

      return sheet;
    },
    [config, pixelWidth, pixelHeight]
  );

  // ---------------------------------------------------------------------------
  // KB targeting
  // ---------------------------------------------------------------------------

  const findQualityForKB = useCallback(
    async (canvas: HTMLCanvasElement, targetKbValue: number) => {
      const toBlobAtQuality = (q: number) =>
        new Promise<Blob | null>((resolve) =>
          canvas.toBlob((blob) => resolve(blob), "image/jpeg", q)
        );

      let low = 0.1;
      let high = 1;
      let bestQuality = 0.5;
      let bestSize = 0;
      let bestDiff = Number.POSITIVE_INFINITY;

      for (let i = 0; i < 6; i++) {
        const mid = (low + high) / 2;
        const blob = await toBlobAtQuality(mid);
        if (!blob) continue;
        const sizeKb = Math.max(1, Math.round(blob.size / 1024));
        const diff = Math.abs(sizeKb - targetKbValue);
        if (diff < bestDiff) {
          bestDiff = diff;
          bestQuality = mid;
          bestSize = sizeKb;
        }
        if (sizeKb === targetKbValue || high - low < 0.02) break;
        if (sizeKb > targetKbValue) high = mid;
        else low = mid;
      }

      if (bestDiff === Number.POSITIVE_INFINITY) {
        const fb = await toBlobAtQuality(0.5);
        return { quality: 0.5, sizeKb: fb ? Math.round(fb.size / 1024) : 0 };
      }
      return { quality: Math.max(0.1, Math.min(1, bestQuality)), sizeKb: bestSize };
    },
    []
  );

  // ---------------------------------------------------------------------------
  // Live size estimate
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!imageSrc || !completedCrop) {
      setEstimatedFileSize(imageSrc ? "Awaiting crop…" : "—");
      return;
    }

    setEstimatedFileSize("Estimating…");
    let cancelled = false;
    const handle = window.setTimeout(async () => {
      const canvas = renderPhotoCanvas();
      if (!canvas) {
        if (!cancelled) setEstimatedFileSize("—");
        return;
      }
      try {
        const { sizeKb } = await findQualityForKB(canvas, targetKb);
        if (!cancelled) setEstimatedFileSize(`≈${sizeKb} KB`);
      } catch {
        if (!cancelled) setEstimatedFileSize("—");
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(handle);
    };
  }, [completedCrop, findQualityForKB, imageSrc, renderPhotoCanvas, targetKb]);

  // ---------------------------------------------------------------------------
  // Process & Compress — generates both digital + print blobs, no auto-download
  // ---------------------------------------------------------------------------

  const handleProcess = async () => {
    if (!completedCrop) return;
    setProcessing(true);
    setError(null);
    setFinalFileSize(null);

    try {
      const photoCanvas = renderPhotoCanvas();
      if (!photoCanvas) throw new Error("Unable to prepare canvas.");

      // ── Digital: binary-search to target KB ──────────────────────────────
      const { quality, sizeKb } = await findQualityForKB(photoCanvas, targetKb);

      if (sizeKb < minKb || sizeKb > maxKb) {
        throw new Error(
          `Output is ≈${sizeKb} KB. Move the slider to stay within ${minKb}–${maxKb} KB.`
        );
      }

      const digitalBlob = await canvasToBlob(photoCanvas, "image/jpeg", quality);
      if (digitalUrl) URL.revokeObjectURL(digitalUrl);
      setDigitalUrl(URL.createObjectURL(digitalBlob));
      setEstimatedFileSize(`≈${sizeKb} KB`);
      setFinalFileSize(sizeKb);

      // ── Print-ready sheet ─────────────────────────────────────────────────
      const sheetCanvas = renderPrintSheet(photoCanvas);
      const sheetBlob = await canvasToBlob(sheetCanvas, "image/jpeg", 0.95);
      if (printUrl) URL.revokeObjectURL(printUrl);
      setPrintUrl(URL.createObjectURL(sheetBlob));
    } catch (err) {
      setError((err as Error).message || "Failed to process image.");
      setFinalFileSize(null);
    } finally {
      setProcessing(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  // Compression gauge: map displayTargetKb to a 0-100 fill %
  const gaugePercent = maxKb > minKb
    ? Math.round(((displayTargetKb - minKb) / (maxKb - minKb)) * 100)
    : 50;

  return (
    <div className="w-full space-y-4">

      {/* ─── Spec strip ──────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 rounded-ff-lg border border-ff-border bg-ff-surface-subtle px-4 py-2.5">
        <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-600">
          <ShieldCheck className="h-3.5 w-3.5" />
          {mode === "passport" ? "Passport" : "Visa"} Photo Studio
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-1.5 text-[11px] text-ff-foreground-muted">
          <span className="rounded-ff-sm border border-ff-border bg-ff-surface px-1.5 py-0.5 font-mono">
            {config.physical.widthMm}×{config.physical.heightMm} mm
          </span>
          <span className="rounded-ff-sm border border-ff-border bg-ff-surface px-1.5 py-0.5 font-mono">
            {pixelWidth}×{pixelHeight} px
          </span>
          <span className="rounded-ff-sm border border-ff-border bg-ff-surface px-1.5 py-0.5 font-mono">
            {config.physical.targetDpi} DPI
          </span>
        </div>
      </div>

      {/* ─── Main 2-column grid ───────────────────────────────── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] items-start">

        {/* ═══ LEFT COLUMN — Dark Optical Stage ═══ */}
        <div className="space-y-3">

          {/* Live Capture bypass — replaces the entire upload/canvas UI */}
          {isLiveCapture ? (
            <div className="flex flex-col items-center justify-center p-12 text-center bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm border border-slate-100 mb-6">
                <svg className="w-8 h-8 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
              </div>
              <h3 className="text-xl font-semibold text-slate-900 mb-2">Live Web-Capture Required</h3>
              <p className="text-slate-500 max-w-md mx-auto mb-6">
                The official portal for this exam no longer accepts pre-uploaded photos. You must use a live webcam directly on their application website.
              </p>
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-left w-full max-w-md">
                <h4 className="text-sm font-semibold text-amber-800 uppercase tracking-wider mb-2">Preparation Checklist</h4>
                <ul className="text-sm text-amber-700 space-y-1 list-disc pl-4">
                  <li>Sit against a plain, light-colored background.</li>
                  <li>Ensure bright, even lighting on your face.</li>
                  <li>Remove glasses, caps, and face coverings.</li>
                </ul>
              </div>
            </div>
          ) : (
            <>
              {/* Dropzone */}
              {!imageSrc && (
                <div className="relative w-full h-fit flex flex-col bg-ff-canvas border border-ff-border-strong rounded-ff-lg overflow-hidden shadow-ff-sm self-start">
                  <div
                    {...getRootProps()}
                    className={`cursor-pointer [&_*]:cursor-pointer group border border-transparent flex min-h-[420px] items-center justify-center p-10 transition-all duration-[180ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 bg-[radial-gradient(#ffffff14_1px,transparent_1px)] [background-size:16px_16px] hover:border-brand-500 hover:bg-brand-500/5 hover:shadow-[0_0_30px_rgba(49,92,234,0.15)] ${
                      isDragActive
                        ? "border-brand-400 bg-ff-canvas/80 text-white"
                        : ""
                    }`}
                  >
                    <input {...getInputProps()} />

                    {/* This wrapper ensures the cursor fix remains active */}
                    <div className="flex flex-col items-center justify-center w-full h-full pointer-events-none select-none p-6">
                      {/* 1. The Icon Wrapper (Sleek Circle) */}
                      <div className="w-16 h-16 mb-5 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-colors duration-[180ms] group-hover:bg-brand-500/10 group-hover:border-brand-500/30">
                        <Upload className="w-8 h-8 text-slate-400 transition-all duration-[180ms] group-hover:-translate-y-1 group-hover:text-brand-400 group-hover:scale-110" />
                      </div>

                      {/* 2. The Headings */}
                      <h3 className="text-lg font-medium text-white mb-2">
                        {isDragActive
                          ? "Drop your photo here"
                          : mode === "passport"
                            ? "Upload your Passport Photo here"
                            : "Upload your Visa Photo here"}
                      </h3>
                      <p className="text-sm text-slate-400 max-w-sm mx-auto text-center leading-relaxed">
                        JPG · PNG · WEBP · Front-facing, well-lit portrait recommended
                      </p>

                      {/* 3. The Pill Button */}
                      <div className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-slate-300 transition-all duration-[180ms] group-hover:bg-brand-500/20 group-hover:border-brand-500/50 group-hover:text-white shadow-sm">
                        Or click to browse files
                      </div>
                    </div>
                  </div>
                  {/* Telemetry bar */}
                  <div className="relative z-20 w-full bg-ff-canvas-surface border-t border-ff-border-strong/50 px-4 py-2.5 font-mono text-[11px] text-ff-foreground-muted uppercase tracking-wider text-center">
                    {pixelWidth} × {pixelHeight} px · {config.physical.targetDpi} DPI · {config.physical.widthMm}×{config.physical.heightMm} mm
                  </div>
                </div>
              )}

              {/* ─── Canvas workspace (shown after upload) ─── */}
              {imageSrc && (
                <div className="space-y-3">

                  {/* Dark Optical Stage — Ambient Blur Backdrop */}
                  <div className="relative w-full h-fit flex flex-col bg-ff-canvas border border-ff-border-strong rounded-ff-lg overflow-hidden shadow-ff-sm self-start">

                    {/* AMBIENT BLUR BACKDROP */}
                    {imageSrc && (
                      <div
                        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-40 scale-110 pointer-events-none"
                        style={{ backgroundImage: `url(${imageSrc})` }}
                      />
                    )}

                    {/* STAGE AREA */}
                    <div className="relative flex-1 w-full flex items-center justify-center p-4 sm:p-6 bg-[radial-gradient(#ffffff14_1px,transparent_1px)] [background-size:16px_16px] z-10">

                      {/* INNER SHRINK-WRAP CONTAINER */}
                      <div
                        className="relative inline-flex items-center justify-center w-fit h-fit max-w-full mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.6)] ring-1 ring-white/20 rounded-sm overflow-hidden bg-black"
                        ref={imageContainerRef}
                        onMouseDown={() => setIsDragging(true)}
                        onMouseUp={() => setIsDragging(false)}
                        onTouchStart={() => setIsDragging(true)}
                        onTouchEnd={() => setIsDragging(false)}
                      >
                        <ReactCrop
                          crop={crop}
                          onChange={(_c, percentCrop) => setCrop(percentCrop)}
                          onComplete={(c) => setCompletedCrop(c)}
                          aspect={aspectRatio}
                          keepSelection
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={imageSrc}
                            alt="Uploaded photo"
                            onLoad={onImageLoad}
                            className="block max-h-[62vh] w-auto max-w-full object-contain select-none"
                            style={{ maxHeight: "62vh", width: "auto", maxWidth: "100%", height: "auto", display: "block" }}
                          />
                        </ReactCrop>

                        {/* BiometricOverlay — dynamic stencil overlay with drag fade */}
                        {showGuide && (
                          <BiometricOverlay isDragging={isDragging} />
                        )}

                        {/* BG removal processing overlay */}
                        {isRemovingBg && removeBgStage !== "idle" && (
                          <AIProcessingOverlay stage={removeBgStage} />
                        )}
                      </div>
                    </div>

                    {/* TELEMETRY BAR */}
                    <div className="relative z-20 w-full bg-ff-canvas-surface border-t border-ff-border-strong/50 px-4 py-2.5 font-mono text-[11px] text-ff-foreground-muted uppercase tracking-wider text-center">
                      {pixelWidth} × {pixelHeight} px · {config.physical.targetDpi} DPI · {config.physical.widthMm}×{config.physical.heightMm} mm
                      {completedCrop ? (
                        <span className="ml-3 text-brand-400">✓ crop active</span>
                      ) : (
                        <span className="ml-3 text-white/30">— awaiting crop</span>
                      )}
                    </div>
                  </div>

                  {/* ─── Pill Toolbar ─────────────────────────────── */}
                  <div className="flex items-center justify-between rounded-ff-pill border border-ff-border bg-ff-surface p-1.5 shadow-ff-sm">

                    {/* Left cluster: Change Photo + Remove BG */}
                    <div className="flex items-center gap-1">
                      {/* Change photo */}
                      <button
                        type="button"
                        onClick={() => {
                          setImageSrc(null);
                          setCrop(undefined);
                          setCompletedCrop(undefined);
                          setDigitalUrl(null);
                          setPrintUrl(null);
                          setError(null);
                          setOriginalSizeBytes(null);
                        }}
                        className="inline-flex items-center gap-2 rounded-ff-pill px-4 py-2 text-sm font-medium text-ff-foreground-secondary transition hover:bg-ff-surface-subtle hover:text-ff-foreground"
                      >
                        <Upload className="h-3.5 w-3.5" />
                        Change Photo
                      </button>

                      {/* Divider */}
                      <span className="h-5 w-px bg-ff-border" />

                      {/* Remove BG */}
                      <button
                        type="button"
                        onClick={handleRemoveBackground}
                        disabled={isRemovingBg || !imageSrc}
                        className="inline-flex items-center gap-2 rounded-ff-pill px-4 py-2 text-sm font-medium text-ff-foreground-secondary transition hover:bg-ff-surface-subtle hover:text-ff-foreground disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {isRemovingBg ? (
                          <Loader2 className="h-3.5 w-3.5 animate-spin" />
                        ) : (
                          <span className="text-sm leading-none">✨</span>
                        )}
                        {removeBgStage !== "idle"
                          ? removeBgStage === "optimizing"
                            ? "Optimising…"
                            : "Removing BG…"
                          : "Remove BG"}
                      </button>
                    </div>

                    {/* Right cluster: Guide toggle */}
                    <button
                      type="button"
                      onClick={() => setShowGuide((v) => !v)}
                      className={`inline-flex items-center gap-2 rounded-ff-pill px-4 py-2 text-sm font-medium transition duration-[120ms] ${
                        showGuide
                          ? "bg-brand-50 text-brand-600 border border-brand-200"
                          : "text-ff-foreground-muted hover:bg-ff-surface-subtle hover:text-ff-foreground"
                      }`}
                    >
                      {showGuide ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                      Guide {showGuide ? "ON" : "OFF"}
                    </button>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="flex items-start gap-2 rounded-ff-md border border-ff-error/20 bg-ff-error-light p-3">
                      <XCircle className="h-4 w-4 text-ff-error mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-ff-error-dark">{error}</p>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <p className="text-[11px] leading-relaxed text-ff-foreground-muted">
                    {config.sourceVerification.disclaimer}
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* ═══ RIGHT COLUMN — Pre-Flight Inspector ═══ */}
        <div className="space-y-4 lg:sticky lg:top-6 lg:self-start">

          {/* Compliance panel */}
          <CompliancePanel
            config={config}
            mode={mode}
            pixelWidth={pixelWidth}
            pixelHeight={pixelHeight}
            derivedFields={derivedFields}
            onReportChange={() => setIsFeedbackOpen(true)}
          />

          {/* ─── Compression Gauge — hidden for live-capture specs ───── */}
          {!isLiveCapture && imageSrc && (
            <div className="bg-ff-surface border border-ff-border rounded-ff-lg shadow-ff-sm p-ff-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-ff-foreground-muted font-mono uppercase">Compression Target</span>
                <span className="bg-brand-50 text-brand-700 font-mono px-2 py-0.5 rounded text-xs font-semibold">Max {displayTargetKb} KB</span>
              </div>
              <input
                type="range"
                aria-label={`Target file size in kilobytes, between ${minKb} and ${maxKb}`}
                min={minKb}
                max={maxKb}
                step={1}
                value={displayTargetKb}
                onChange={(e) => {
                  const v = Math.round(Number(e.target.value));
                  setDisplayTargetKb(v);
                  setTargetKb(v);
                }}
                disabled={!completedCrop}
                className="w-full cursor-pointer accent-brand-500 disabled:cursor-not-allowed disabled:opacity-40"
              />
              <div className="mt-1 flex justify-between text-[11px] font-mono text-ff-foreground-muted">
                <span>{minKb}&thinsp;KB</span>
                <span>{maxKb}&thinsp;KB</span>
              </div>
              {/* Original file size */}
              {originalSizeBytes && (
                <div className="text-sm mt-2 text-slate-500 font-medium">
                  Original File Size: {formatBytes(originalSizeBytes)}
                </div>
              )}
              {/* Estimated output */}
              <div className="relative mt-3 flex items-center justify-between rounded-ff-md border border-ff-border bg-ff-surface-subtle px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono uppercase text-ff-foreground-muted">Est. Output</span>
                  <button
                    type="button"
                    id="bio-size-info-trigger"
                    aria-label="Why is the size approximate?"
                    onClick={() => setShowInfoPopover((v) => !v)}
                    className="cursor-pointer text-ff-foreground-muted hover:text-brand-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-full"
                  >
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </div>
                <span
                  className={`font-mono text-sm font-bold tabular-nums ${
                    estimatedFileSize === "—" || estimatedFileSize === "Awaiting crop…"
                      ? "text-ff-foreground-muted"
                      : estimatedFileSize === "Estimating…"
                      ? "text-ff-warning animate-pulse"
                      : "text-ff-success"
                  }`}
                >
                  {estimatedFileSize === "Estimating…"
                    ? "Estimating…"
                    : estimatedFileSize === "Awaiting crop…"
                    ? "Awaiting crop…"
                    : estimatedFileSize === "—"
                    ? "—"
                    : `~${estimatedFileSize.replace("≈", "").trim()}`}
                </span>
                {showInfoPopover && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setShowInfoPopover(false)}
                      aria-hidden="true"
                    />
                    <div
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="bio-size-info-title"
                      className="absolute bottom-full left-0 right-0 z-20 mb-2 rounded-ff-md border border-ff-border bg-ff-surface p-ff-4 shadow-ff-md"
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h4 id="bio-size-info-title" className="text-sm font-semibold text-ff-foreground leading-snug">
                          Why isn&apos;t it the exact size?
                        </h4>
                        <button
                          type="button"
                          aria-label="Close"
                          onClick={() => setShowInfoPopover(false)}
                          className="cursor-pointer shrink-0 text-ff-foreground-muted hover:text-ff-foreground transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-full"
                        >
                          <span className="text-lg leading-none">&times;</span>
                        </button>
                      </div>
                      <p className="text-xs leading-relaxed text-ff-foreground-muted">
                        Images shrink in steps, not exact numbers. We automatically pick the
                        highest quality that stays safely under your limit so the visa or passport
                        portal never rejects it.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* ─── Process & Compress — hidden for live-capture specs ─── */}
          {!isLiveCapture && (
            <div className="space-y-3">
              <button
                type="button"
                onClick={handleProcess}
                disabled={!completedCrop || processing}
                className="group/btn flex w-full items-center justify-center gap-2 rounded-ff-md bg-brand-500 hover:bg-brand-600 text-white py-3 text-sm font-semibold shadow-ff-sm transition-all duration-[180ms] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {processing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                )}
                {processing ? "Processing…" : "Process & Compress"}
                <span className="text-[11px] font-normal opacity-70">
                  {pixelWidth}×{pixelHeight}
                </span>
              </button>
            </div>
          )}

          {/* ─── Pre-Flight Check + Downloads — hidden for live-capture specs ── */}
          {!isLiveCapture && digitalUrl && finalFileSize !== null && (
            <div className="space-y-3">
              {/* Pre-Flight Check card */}
              <div className="rounded-lg bg-ff-success-light p-4 border border-ff-success/20">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-ff-success-dark" />
                  <h4 className="font-bold text-ff-success-dark">Pre-Flight Check</h4>
                </div>
                <div className="flex flex-col gap-2 ml-7">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ff-success mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-ff-foreground">Biometrics Locked:</p>
                      <p className="text-ff-foreground-muted font-mono">{pixelWidth} × {pixelHeight} px</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-ff-success mt-0.5" />
                    <div className="text-sm">
                      <p className="font-semibold text-ff-foreground">File Size Passed:</p>
                      <p className="text-ff-foreground-muted font-mono">
                        {finalFileSize} KB <span className="text-ff-success-dark">({minKb}–{maxKb} KB)</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Digital Submission download */}
              <a
                href={digitalUrl}
                download={`${config.id}_digital_${pixelWidth}x${pixelHeight}.jpg`}
                className="group/btn flex w-full items-center justify-center gap-2 rounded-ff-md bg-brand-500 hover:bg-brand-600 text-white py-3 text-sm font-semibold shadow-ff-sm transition-all duration-[180ms]"
              >
                <Download className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                Download Digital
                <span className="text-[11px] font-normal opacity-70">{pixelWidth}×{pixelHeight}</span>
              </a>

              {/* Print-Ready Sheet download */}
              {printUrl && (
                <a
                  href={printUrl}
                  download={`${config.id}_print_sheet_4x6.jpg`}
                  className="group/btn flex w-full items-center justify-center gap-2 rounded-ff-md border border-ff-border bg-ff-surface hover:bg-ff-surface-subtle py-3 text-sm font-semibold text-ff-foreground-secondary shadow-ff-sm transition-all duration-[180ms] hover:text-ff-foreground"
                >
                  <Printer className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
                  Download Print Sheet
                  <span className="text-[11px] font-normal opacity-60">4×6</span>
                </a>
              )}
            </div>
          )}

        </div>
      </div>
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        title="Report a Specification Change"
        description="Has something changed in the official requirements? Let us know and we'll update the spec."
      />
    </div>
  );
}
