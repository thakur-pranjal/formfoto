"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  type SyntheticEvent,
} from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
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
} from "lucide-react";
import { type VisaPassportConfig } from "@/config/visas/types";
import "react-image-crop/dist/ReactCrop.css";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): PercentCrop {
  return centerCrop(
    makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight
  );
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

function derivePixelDimensions(config: VisaPassportConfig): {
  width: number;
  height: number;
} {
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
  const dpi = config.physical.targetDpi;
  const width = Math.round((config.physical.widthMm * dpi) / 25.4);
  const height = Math.round((config.physical.heightMm * dpi) / 25.4);
  return { width, height };
}

function deriveKbLimits(config: VisaPassportConfig): {
  minKb: number;
  maxKb: number;
} {
  return {
    minKb: config.digital?.minKb ?? 50,
    maxKb: config.digital?.maxKb ?? 500,
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
        className="h-16 w-16 rounded-full bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 shadow-[0_0_40px_rgba(20,184,166,0.6)] animate-pulse"
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
  accentColor: string; // CSS colour string, e.g. "rgb(16,185,129)"
}

function BiometricGuideOverlay({ config, accentColor }: BiometricGuideProps) {
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

  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="absolute inset-0 pointer-events-none w-full h-full z-10"
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
        stroke={accentColor}
        strokeWidth="0.4"
        strokeDasharray="2 1.5"
        opacity="0.9"
        filter="url(#glow)"
      />
      <text
        x="15" y={crownPct - 1.2}
        fontSize="3.2"
        fill={accentColor}
        textAnchor="start"
        opacity="0.9"
        style={{ fontFamily: "sans-serif" }}
      >
        Crown
      </text>

      {/* Eye line */}
      <line
        x1="5" y1={eyeLinePct} x2="95" y2={eyeLinePct}
        stroke="#f59e0b"
        strokeWidth="0.35"
        strokeDasharray="1.5 1.5"
        opacity="0.85"
        filter="url(#glow)"
      />
      <text
        x="15" y={eyeLinePct - 1}
        fontSize="3.2"
        fill="#f59e0b"
        textAnchor="start"
        opacity="0.9"
        style={{ fontFamily: "sans-serif" }}
      >
        Eye level
      </text>

      {/* Chin line */}
      <line
        x1="5" y1={chinPct} x2="95" y2={chinPct}
        stroke={accentColor}
        strokeWidth="0.4"
        strokeDasharray="2 1.5"
        opacity="0.9"
        filter="url(#glow)"
      />
      <text
        x="15" y={chinPct + 3.5}
        fontSize="3.2"
        fill={accentColor}
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
        stroke={accentColor}
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
        fill={accentColor}
        opacity="0.05"
      />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// CompliancePanel — Premium glassmorphic HUD
// ---------------------------------------------------------------------------

interface CompliancePanelProps {
  config: VisaPassportConfig;
  mode: "passport" | "visa";
  pixelWidth: number;
  pixelHeight: number;
  accentClass: string;
}

function CompliancePanel({
  config,
  pixelWidth,
  pixelHeight,
  accentClass,
}: CompliancePanelProps) {
  const { biometrics, background, physical, sourceVerification } = config;

  return (
    <div className="bg-slate-900/60 border border-slate-800 backdrop-blur-md rounded-2xl p-6 space-y-5">

      {/* ── Header ─────────────────────────────────────────── */}
      <div className="flex items-center gap-2">
        <ShieldCheck className={`h-4 w-4 ${accentClass}`} />
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
          Official Compliance Checklist
        </h3>
      </div>

      {/* ── Data rows ──────────────────────────────────────── */}
      <div className="divide-y divide-slate-800/50">

        {/* Background */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs text-slate-500 font-medium">Background</span>
          <div className="flex items-center gap-2">
            <div
              className="h-4 w-4 rounded-full border border-slate-600 flex-shrink-0 shadow-inner"
              style={{ backgroundColor: background.requiredHex }}
              title={background.requiredHex}
            />
            <span className="text-xs font-semibold text-white">{background.label}</span>
            <span className="text-[10px] font-mono text-slate-600">{background.requiredHex}</span>
          </div>
        </div>

        {/* Dimensions + DPI */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs text-slate-500 font-medium">Dimensions</span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-white">
              {physical.widthMm} × {physical.heightMm} mm
            </span>
            <span className="rounded-md bg-slate-800 px-1.5 py-0.5 text-[10px] font-mono text-slate-400">
              {physical.targetDpi} DPI
            </span>
          </div>
        </div>

        {/* Digital size */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs text-slate-500 font-medium">Digital Size</span>
          <span className="text-xs font-semibold text-white">
            {pixelWidth} × {pixelHeight} px
          </span>
        </div>

        {/* Paper finish */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs text-slate-500 font-medium">Finish</span>
          <span className="text-xs font-semibold text-white capitalize">{physical.paperFinish}</span>
        </div>

        {/* Glasses */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs text-slate-500 font-medium">Glasses</span>
          {biometrics.glassesAllowed ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Allowed
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
              <XCircle className="h-3.5 w-3.5" /> Prohibited
            </span>
          )}
        </div>

        {/* Smile */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs text-slate-500 font-medium">Smile</span>
          {biometrics.smileAllowed ? (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" /> Allowed
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-semibold text-rose-400">
              <XCircle className="h-3.5 w-3.5" /> Neutral only
            </span>
          )}
        </div>

        {/* Shoulders */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs text-slate-500 font-medium">Shoulders</span>
          <span className="text-xs font-semibold text-white">
            {biometrics.shouldersVisible ? "Must be visible" : "Not required"}
          </span>
        </div>

        {/* Face / Frame ratio */}
        <div className="flex items-center justify-between py-2.5">
          <span className="text-xs text-slate-500 font-medium">Face / Frame</span>
          <span className="text-xs font-semibold text-white">
            {Math.round(biometrics.headRatioMin * 100)}–{Math.round(biometrics.headRatioMax * 100)}% of height
          </span>
        </div>

      </div>

      {/* ── Attire / contrast warning ───────────────────────── */}
      {biometrics.contrastWarning && (
        <div className="flex items-start gap-3 rounded-xl border-l-4 border-amber-500 bg-amber-500/10 p-3">
          <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-amber-200/90 leading-relaxed">
            <span className="font-semibold text-amber-300">Attire:</span> Dark clothing strongly recommended to contrast the white background. Light or white tops risk rejection.
          </p>
        </div>
      )}

      {/* ── Infant rules ─────────────────────────────────────── */}
      {config.infantRules?.applicable && config.infantRules.relaxedConstraints && (
        <div className="flex items-start gap-3 rounded-xl border border-blue-500/30 bg-blue-500/10 p-3">
          <ShieldCheck className="h-4 w-4 text-blue-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-300 leading-relaxed">
            <span className="font-semibold">Infants:</span> {config.infantRules.relaxedConstraints}
          </p>
        </div>
      )}

      {/* ── Authority footer ─────────────────────────────────── */}
      <div className="border-t border-slate-800/60 pt-4 space-y-1">
        <p className="text-[11px] text-slate-600">
          Verified by{" "}
          <span className="text-slate-500 font-medium">{sourceVerification.authority}</span>
          {" · "}Last verified {sourceVerification.lastVerifiedDate}
        </p>
        <a
          href={sourceVerification.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-[11px] text-slate-600 hover:text-slate-300 transition-colors"
        >
          Official guidelines <ExternalLink className="h-3 w-3" />
        </a>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

interface BiometricStudioProps {
  config: VisaPassportConfig;
  mode: "passport" | "visa";
}

export default function BiometricStudio({ config, mode }: BiometricStudioProps) {
  // Derived constants from config (stable, no state needed)
  const aspectRatio = config.aspectRatio;
  const { width: pixelWidth, height: pixelHeight } = derivePixelDimensions(config);
  const { minKb, maxKb } = deriveKbLimits(config);

  const isPassport = mode === "passport";
  // ── Palette engine ─────────────────────────────────────────────────────────
  const accentGradient = isPassport
    ? "from-emerald-500 to-teal-500"
    : "from-amber-400 to-orange-500";
  const accentText    = isPassport ? "text-emerald-400"              : "text-amber-400";
  const accentBorder  = isPassport ? "border-emerald-500/40"         : "border-amber-500/40";
  const accentBg      = isPassport ? "bg-emerald-500/10"             : "bg-amber-500/10";
  const accentRing    = isPassport ? "focus-visible:ring-emerald-400" : "focus-visible:ring-amber-400";
  const accentSvgColor = isPassport ? "rgb(16,185,129)"              : "rgb(251,146,60)";
  // Primary CTA gradient + shadow (used on Digital Submission button)
  const accentCta = isPassport
    ? "bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950"
    : "bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-slate-950";
  const accentCtaShadow = isPassport
    ? "shadow-emerald-950/40"
    : "shadow-amber-950/40";

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
  const [showGuide, setShowGuide] = useState(true);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [removeBgStage, setRemoveBgStage] = useState<"idle" | "optimizing" | "removing">("idle");

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
  // Image load handler
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
  // Export: Digital
  // ---------------------------------------------------------------------------

  const exportDigital = async () => {
    if (!completedCrop) return;
    setProcessing(true);
    setError(null);

    try {
      const canvas = renderPhotoCanvas();
      if (!canvas) throw new Error("Unable to prepare canvas.");

      const { quality, sizeKb } = await findQualityForKB(canvas, targetKb);

      if (sizeKb < minKb || sizeKb > maxKb) {
        throw new Error(
          `Output is ≈${sizeKb} KB. Move the slider to stay within ${minKb}–${maxKb} KB.`
        );
      }

      const blob = await canvasToBlob(canvas, "image/jpeg", quality);
      if (digitalUrl) URL.revokeObjectURL(digitalUrl);
      const url = URL.createObjectURL(blob);
      setDigitalUrl(url);
      setEstimatedFileSize(`≈${sizeKb} KB`);

      // Auto-trigger download
      const a = document.createElement("a");
      a.href = url;
      a.download = `${config.id}_digital_${pixelWidth}x${pixelHeight}.jpg`;
      a.click();
    } catch (err) {
      setError((err as Error).message || "Failed to process image.");
    } finally {
      setProcessing(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Export: Print-Ready Sheet
  // ---------------------------------------------------------------------------

  const exportPrintSheet = async () => {
    if (!completedCrop) return;
    setProcessing(true);
    setError(null);

    try {
      const photoCanvas = renderPhotoCanvas();
      if (!photoCanvas) throw new Error("Unable to prepare canvas.");

      const sheetCanvas = renderPrintSheet(photoCanvas);
      const blob = await canvasToBlob(sheetCanvas, "image/jpeg", 0.95);
      if (printUrl) URL.revokeObjectURL(printUrl);
      const url = URL.createObjectURL(blob);
      setPrintUrl(url);

      const a = document.createElement("a");
      a.href = url;
      a.download = `${config.id}_print_sheet_4x6.jpg`;
      a.click();
    } catch (err) {
      setError((err as Error).message || "Failed to generate print sheet.");
    } finally {
      setProcessing(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="w-full space-y-5">
      {/* ─── Spec strip ───────────────────────────────────── */}
      <div
        className={`flex flex-wrap items-center gap-3 rounded-xl border ${accentBorder} px-4 py-2.5`}
        style={{ background: "rgba(15,23,42,0.6)" }}
      >
        <div className={`flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest ${accentText}`}>
          <ShieldCheck className="h-3.5 w-3.5" />
          {isPassport ? "Passport" : "Visa"} Photo Studio
        </div>
        <div className="ml-auto flex flex-wrap items-center gap-1.5 text-[11px] text-slate-500">
          <span className="rounded bg-slate-800/80 px-1.5 py-0.5 font-mono text-slate-400">
            {config.physical.widthMm}×{config.physical.heightMm} mm
          </span>
          <span className="rounded bg-slate-800/80 px-1.5 py-0.5 font-mono text-slate-400">
            {pixelWidth}×{pixelHeight} px
          </span>
          <span className="rounded bg-slate-800/80 px-1.5 py-0.5 font-mono text-slate-400">
            {config.physical.targetDpi} DPI
          </span>
        </div>
      </div>

      {/* ─── Main grid: workspace (left 8) + sidebar (right 4) ─── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">

        {/* ═══ LEFT COLUMN — Workspace (col-span-8) ═══ */}
        <div className="col-span-1 space-y-4 lg:col-span-8">

          {/* Dropzone */}
          {!imageSrc && (
            <div
              {...getRootProps()}
              className={`group flex min-h-[400px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed p-10 text-white transition-all duration-200 focus:outline-none focus-visible:ring-2 ${accentRing} ${
                isDragActive
                  ? `border-current ${accentText} bg-slate-900/60`
                  : "border-slate-700/60 bg-slate-950/60 hover:border-slate-500 hover:bg-slate-900/40"
              }`}
              style={{
                backgroundImage: "radial-gradient(circle, rgba(148,163,184,0.04) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            >
              <input {...getInputProps()} />
              <div className="space-y-4 text-center">
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-2xl ${accentBg} ${accentText} shadow-lg`}
                  style={{ backdropFilter: "blur(8px)" }}
                >
                  <Upload className="h-7 w-7" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-200">
                    {isDragActive ? "Drop your photo here" : "Drop your photo here, or click to browse"}
                  </p>
                  <p className="mt-1.5 text-xs text-slate-500">
                    JPG · PNG · WEBP &nbsp;·&nbsp; Front-facing, well-lit portrait recommended
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* ─── Canvas workspace (shown after upload) ─── */}
          {imageSrc && (
            <div className="space-y-3">

              {/* Premium dark canvas wrapper */}
              <div
                className="relative flex items-center justify-center overflow-hidden rounded-2xl border border-slate-800/60 shadow-inner"
                style={{
                  background: "#060a14",
                  backgroundImage:
                    "radial-gradient(circle, rgba(148,163,184,0.04) 1px, transparent 1px)",
                  backgroundSize: "16px 16px",
                  minHeight: "400px",
                }}
              >
                {/* Inner wrapper — ref'd by ResizeObserver (Phase 1) */}
                <div className="relative" ref={imageContainerRef}>
                  <ReactCrop
                    crop={crop}
                    onChange={(_c, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspectRatio}
                    keepSelection
                    className="max-h-[62vh]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt="Uploaded photo"
                      onLoad={onImageLoad}
                      className="max-h-[62vh] max-w-full"
                    />
                  </ReactCrop>

                  {/* Biometric guide overlay — pinned via ResizeObserver dims (Phase 1) */}
                  {showGuide && (
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: overlayDims.left,
                        width: overlayDims.width || "100%",
                        height: overlayDims.height || "100%",
                        pointerEvents: "none",
                        zIndex: 10,
                      }}
                    >
                      <BiometricGuideOverlay
                        config={config}
                        accentColor={accentSvgColor}
                      />
                    </div>
                  )}

                  {/* BG removal processing overlay */}
                  {isRemovingBg && removeBgStage !== "idle" && (
                    <AIProcessingOverlay stage={removeBgStage} />
                  )}
                </div>
              </div>

              {/* ─── Pill Toolbar ─────────────────────────────── */}
              <div className="flex items-center justify-between rounded-full border border-slate-800 bg-slate-900 p-1.5">

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
                    }}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white"
                  >
                    <Upload className="h-3.5 w-3.5" />
                    Change Photo
                  </button>

                  {/* Divider */}
                  <span className="h-5 w-px bg-slate-700/60" />

                  {/* Remove BG */}
                  <button
                    type="button"
                    onClick={handleRemoveBackground}
                    disabled={isRemovingBg || !imageSrc}
                    className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
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
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                    showGuide
                      ? `${accentBg} ${accentText} ${accentBorder} border`
                      : "text-slate-500 hover:bg-slate-800 hover:text-slate-300"
                  }`}
                >
                  {showGuide ? <Eye className="h-3.5 w-3.5" /> : <EyeOff className="h-3.5 w-3.5" />}
                  Guide {showGuide ? "ON" : "OFF"}
                </button>
              </div>

              {/* ─── Target KB slider ─────────────────────────── */}
              <div className="rounded-xl border border-slate-800/80 bg-slate-900/40 p-4 space-y-2.5">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold text-slate-300">
                    Target Size{" "}
                    <span className={`font-bold ${accentText}`}>{displayTargetKb} KB</span>
                  </p>
                  <span className="text-xs font-mono font-medium text-slate-500">
                    {estimatedFileSize}
                  </span>
                </div>
                <input
                  type="range"
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
                  className={`w-full disabled:opacity-30 ${isPassport ? "accent-emerald-500" : "accent-amber-500"}`}
                />
                <div className="flex justify-between text-[10px] font-mono text-slate-600">
                  <span>{minKb} KB</span>
                  <span>{maxKb} KB</span>
                </div>
              </div>

              {/* Error */}
              {error && (
                <div className="flex items-start gap-2 rounded-lg border border-rose-500/20 bg-rose-500/8 p-3">
                  <XCircle className="h-4 w-4 text-rose-400 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-rose-300">{error}</p>
                </div>
              )}

              {/* Disclaimer */}
              <p className="text-[11px] leading-relaxed text-slate-600">
                {config.sourceVerification.disclaimer}
              </p>
            </div>
          )}
        </div>

        {/* ═══ RIGHT COLUMN — Compliance + Export (col-span-4) ═══ */}
        <div className="col-span-1 space-y-6 lg:col-span-4 lg:sticky lg:top-6 lg:self-start">

          {/* Compliance panel */}
          <CompliancePanel
            config={config}
            mode={mode}
            pixelWidth={pixelWidth}
            pixelHeight={pixelHeight}
            accentClass={accentText}
          />

          {/* Export CTAs */}
          <div className="space-y-3">
            {/* Digital Submission */}
            <button
              type="button"
              onClick={exportDigital}
              disabled={!completedCrop || processing}
              className={`group/btn flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-semibold shadow-lg transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-40 ${accentCta} ${accentCtaShadow}`}
            >
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
              )}
              Digital Submission
              <span className="text-[11px] font-normal opacity-70">
                {pixelWidth}×{pixelHeight}
              </span>
            </button>

            {/* Print-Ready Sheet */}
            <button
              type="button"
              onClick={exportPrintSheet}
              disabled={!completedCrop || processing}
              className="group/btn flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-transparent py-3 text-sm font-semibold text-slate-300 shadow-lg transition-all duration-200 hover:bg-slate-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-40"
            >
              {processing ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Printer className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5" />
              )}
              Print-Ready Sheet
              <span className="text-[11px] font-normal opacity-60">4×6</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
