"use client";

import smartcrop from "smartcrop";
import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
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
  Loader2,
  Upload,
  CheckCircle2,
  ShieldCheck,
  FileWarning,
  Sparkles,
  Calendar,
  Type,
  Palette,
  ScanFace,
  HelpCircle,
  FileSignature,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { type FormatConfig } from "@/config/formats";
import { formatBytes } from "@/utils/formatBytes";
import { resolveSpecFallbacks, isLiveCaptureRequired } from "@/utils/fallbackResolver";
import FeedbackModal from "@/components/ui/FeedbackModal";
import "react-image-crop/dist/ReactCrop.css";

// ---------------------------------------------------------------------------
// Helpers (mirrored from PhotoEditor to keep this component self-contained)
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

/**
 * Extracts only the user's current crop region from the displayed <img> element
 * and scales it down to at most MAX_BG_DIMENSION on its longest side before
 * returning a JPEG Blob for the BG-removal model.
 */
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

const blobToTransparentDataUrl = async (blob: Blob) => {
  const img = await loadImageElement(blob);
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;
  const canvas = document.createElement("canvas");
  canvas.width = width || 1;
  canvas.height = height || 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported.");
  // Keep transparency intact so renderCanvas can fill with the dynamic bgColor
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

const AIProcessingOverlay = ({ loadingText }: { loadingText: string }) => (
  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black/40 backdrop-blur-sm">
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-70"
        style={{ animation: "smart-shimmer 2.8s linear infinite" }}
      />
    </div>
    <div className="relative flex items-center justify-center">
      <div
        className="h-16 w-16 rounded-full bg-gradient-to-tr from-brand-500 via-brand-400 to-brand-300 shadow-[0_0_40px_rgba(49,92,234,0.5)] animate-pulse"
        style={{ animationDuration: "2.4s" }}
      />
    </div>
    <p key={loadingText} className="mt-4 text-sm font-medium tracking-wide text-white/90 animate-bounce">
      {loadingText}
    </p>
    <style jsx>{`
      @keyframes smart-shimmer {
        0%   { transform: translateX(-150%) skewX(-12deg); }
        100% { transform: translateX(150%)  skewX(-12deg); }
      }
    `}</style>
  </div>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

interface SmartEditorProps {
  config: FormatConfig;
}

export default function SmartEditor({ config }: SmartEditorProps) {
  const [activeDocIndex, setActiveDocIndex] = useState(0);
  const rawActiveDoc = config.documents[activeDocIndex];
  const { hydratedSpec: activeDoc } = useMemo(
    () => resolveSpecFallbacks(rawActiveDoc, "exam"),
    [rawActiveDoc]
  );
  const { width, height, minKb, maxKb, name: docName } = activeDoc;
  // True when the exam portal requires a live webcam capture for this specific document
  const isLiveCapture = activeDoc?.isLiveCapture === true || isLiveCaptureRequired(activeDoc);
  // Defensive fallbacks: some exam configs legitimately ship 0×0 dimensions
  // (e.g. "any standard passport size"). Use these safe values everywhere
  // the engine needs real pixels, but keep `width`/`height` untouched so the
  // UI can detect the zero-dimension case and show friendly copy instead.
  const safeWidth  = width  === 0 ? 413 : width;
  const safeHeight = height === 0 ? 531 : height;
  const aspectRatio = safeWidth / safeHeight;

  // True when the active document is a signature or thumb impression scan
  const isDocumentMode =
    activeDoc?.name?.toLowerCase().includes('signature') ||
    activeDoc?.name?.toLowerCase().includes('thumb');

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<PercentCrop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [targetKb, setTargetKb] = useState<number>(minKb);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);  
  const [finalSizeKb, setFinalSizeKb] = useState<number | null>(null);  
  const [estimatedFileSize, setEstimatedFileSize] = useState("—");
  const [showInfoPopover, setShowInfoPopover] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [originalSizeBytes, setOriginalSizeBytes] = useState<number | null>(null);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [removeBgStage, setRemoveBgStage] = useState<
    "idle" | "optimizing" | "removing"
  >("idle");
  // Dynamic loading text cycling during BG removal
  const [loadingText, setLoadingText] = useState("Processing Image...");

  // Background color state
  const [bgColor, setBgColor] = useState("#FFFFFF");

  // B&W Document Scan toggle (signature / thumb impression mode)
  const [applyBwScan, setApplyBwScan] = useState(false);

  // Stamp state
  const [isStampingEnabled, setIsStampingEnabled] = useState(false);
  const [stampName, setStampName] = useState("");
  const [stampDate, setStampDate] = useState(() => {
    const d = new Date();
    const dd = String(d.getDate()).padStart(2, "0");
    const mm = String(d.getMonth() + 1).padStart(2, "0");
    const yyyy = d.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  });
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  const imgRef = useRef<HTMLImageElement | null>(null);

  // Reset workspace and re-lock engine when the user switches tabs
  useEffect(() => {
    setImageSrc(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setDownloadUrl(null);    
    setFinalSizeKb(null);    
    setError(null);
    setEstimatedFileSize("—");
    // State protection: always wipe an active stamp when the document changes
    // so it cannot leak onto a doc that forbids stamping.
    setIsStampingEnabled(false);
    // Reset B&W scan toggle whenever the active document changes
    setApplyBwScan(false);
    setOriginalSizeBytes(null);
    imgRef.current = null;
  }, [activeDocIndex]);

  // Clamp targetKb whenever the active document changes
  useEffect(() => {
    setTargetKb((prev) => Math.min(Math.max(prev, minKb), maxKb));
  }, [minKb, maxKb]);

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  // -------------------------------------------------------------------------
  // Dropzone
  // -------------------------------------------------------------------------

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Invalid file type. Please upload an image (JPG, PNG).");
      return;
    }

    // 20MB limit
    if (file.size > 20 * 1024 * 1024) {
      toast.error("File is too large. Please upload an image under 20MB.");
      return;
    }

    setOriginalSizeBytes(file.size);
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result as string);
      setCrop(undefined);
      setCompletedCrop(undefined);
      setDownloadUrl(null);
      setFinalSizeKb(null);
      setError(null);
    };
    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    maxFiles: 1,
    onDrop,
  });

  // -------------------------------------------------------------------------
  // Crop init on image load
  // -------------------------------------------------------------------------

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    imgRef.current = target;
    setCrop(centerAspectCrop(target.naturalWidth, target.naturalHeight, aspectRatio));
  };

  // -------------------------------------------------------------------------
  // Canvas rendering
  // -------------------------------------------------------------------------

  const renderCanvas = useCallback(() => {
    if (!imgRef.current || !completedCrop) return null;
    if (!completedCrop.width || !completedCrop.height) return null;

    const canvas = document.createElement("canvas");
    canvas.width = safeWidth;
    canvas.height = safeHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // ── Step 1: Flood-fill background (flattens all transparency) ──────────
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ── Step 2: Draw the cropped photo on top of the background ────────────
    const photoHeight = isStampingEnabled ? Math.round(safeHeight * 0.85) : safeHeight;

    // ── B&W Document Scan filter (signature / thumb impression mode) ────────
    if (isDocumentMode && applyBwScan) {
      ctx.filter = 'grayscale(100%) contrast(300%) brightness(120%)';
    } else {
      ctx.filter = 'none';
    }

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      safeWidth,
      photoHeight
    );

    // Reset filter so subsequent canvas operations are unaffected
    ctx.filter = 'none';

    // ── Step 3: Auto-Stamper overlay (only when enabled) ───────────────────
    if (isStampingEnabled) {
      const stripY = photoHeight;
      const stripHeight = safeHeight - photoHeight;

      // White strip for legible text
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, stripY, safeWidth, stripHeight);

      // Text
      const fontSize = Math.max(10, Math.round(stripHeight * 0.32));
      ctx.fillStyle = "#000000";
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(stampName || "Full Name", safeWidth / 2, stripY + stripHeight * 0.32);
      ctx.fillText(stampDate, safeWidth / 2, stripY + stripHeight * 0.72);
    }

    return canvas;
  }, [bgColor, completedCrop, safeHeight, isStampingEnabled, stampDate, stampName, safeWidth, applyBwScan, isDocumentMode]);

  // -------------------------------------------------------------------------
  // Binary-search compression (V8 algorithm)
  // -------------------------------------------------------------------------

  const findQualityForKB = useCallback(
    async (canvas: HTMLCanvasElement, targetKbValue: number) => {
      const toBlobAtQuality = (q: number) =>
        new Promise<Blob | null>((resolve) =>
          canvas.toBlob((blob) => resolve(blob), "image/jpeg", q)
        );

      let low = 0.1;
      let high = 1;
      let bestQuality = 0.1;
      let bestSize = 0;
      let bestDiff = Number.POSITIVE_INFINITY;

      for (let i = 0; i < 5; i += 1) {
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
        const fallbackBlob = await toBlobAtQuality(0.1);
        const fallbackSize = fallbackBlob
          ? Math.max(1, Math.round(fallbackBlob.size / 1024))
          : 0;
        return { quality: 0.1, sizeKb: fallbackSize };
      }

      return {
        quality: Math.max(0.1, Math.min(1, bestQuality)),
        sizeKb: bestSize,
      };
    },
    []
  );

  // -------------------------------------------------------------------------
  // Live size estimation
  // -------------------------------------------------------------------------

  useEffect(() => {
    if (!imageSrc || !completedCrop) {
      setEstimatedFileSize(imageSrc ? "Awaiting crop..." : "—");
      return;
    }

    setEstimatedFileSize("Estimating...");
    let cancelled = false;
    const handle = window.setTimeout(async () => {
      const canvas = renderCanvas();
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
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [completedCrop, findQualityForKB, imageSrc, renderCanvas, targetKb]);

  // -------------------------------------------------------------------------
  // Smart crop (biometric auto-centering)
  // -------------------------------------------------------------------------

  const handleSmartCrop = useCallback(async () => {
    const img = imgRef.current;
    if (!img) return;

    try {
      const result = await smartcrop.crop(img, {
        width: activeDoc.width,
        height: activeDoc.height,
      });
      const { x, y, width: cropW, height: cropH } = result.topCrop;

      const naturalW = img.naturalWidth;
      const naturalH = img.naturalHeight;
      const displayW = img.width;
      const displayH = img.height;

      // Convert natural-pixel coords → percent for ReactCrop state
      const pct: PercentCrop = {
        unit: "%",
        x: (x / naturalW) * 100,
        y: (y / naturalH) * 100,
        width: (cropW / naturalW) * 100,
        height: (cropH / naturalH) * 100,
      };

      // Derive pixel crop in display-image coords for completedCrop
      const px: PixelCrop = {
        unit: "px",
        x: Math.round((x / naturalW) * displayW),
        y: Math.round((y / naturalH) * displayH),
        width: Math.round((cropW / naturalW) * displayW),
        height: Math.round((cropH / naturalH) * displayH),
      };

      setCrop(pct);
      setCompletedCrop(px);
    } catch (err) {
      console.error("Smart crop failed:", err);
      setError("Auto-centering failed. Please crop manually.");
    }
  }, [activeDoc.width, activeDoc.height]);

  // -------------------------------------------------------------------------
  // Remove background
  // -------------------------------------------------------------------------

  const handleRemoveBackground = useCallback(async () => {
    if (!imageSrc) return;
    setIsRemovingBg(true);
    setRemoveBgStage("optimizing");
    setError(null);

    // Cycle through psychological loading messages every 1.5 s
    const phrases = ["Analyzing biometrics...", "Extracting foreground...", "Refining edges..."];
    let step = 0;
    setLoadingText(phrases[0]);
    const textInterval = setInterval(() => {
      step++;
      setLoadingText(phrases[step % phrases.length]);
    }, 1500);

    try {
      // Prefer the cropped region so the ML model processes a much smaller payload.
      // Fall back to the full (resized) image if no crop has been committed yet.
      const inputBlob =
        imgRef.current && completedCrop?.width && completedCrop?.height
          ? await getCroppedBlob(imgRef.current, completedCrop)
          : await resizeForBgRemoval(imageSrc);

      setRemoveBgStage("removing");
      const bgRemovedBlob = await removeBackground(inputBlob);
      const dataUrl = await blobToTransparentDataUrl(bgRemovedBlob);

      // The returned image IS already the cropped area, so reset the crop box
      // to full coverage so the user doesn't end up with a mis-sized selection.
      const fullCrop: PercentCrop = {
        unit: "%",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      };
      setImageSrc(dataUrl);
      setCrop(fullCrop);
      setCompletedCrop(undefined);
      setDownloadUrl(null);
      setFinalSizeKb(null);
    } catch (err) {
      console.error(err);
      setError("Failed to remove background. Please try again.");
    } finally {
      clearInterval(textInterval);
      setLoadingText("Processing Image...");
      setIsRemovingBg(false);
      setRemoveBgStage("idle");
    }
  }, [imageSrc, completedCrop]);

  // -------------------------------------------------------------------------
  // Process (generate final image)
  // -------------------------------------------------------------------------

  const generateCroppedImage = async () => {
    if (!imgRef.current || !completedCrop) return;
    setProcessing(true);
    setError(null);

    try {
      const canvas = renderCanvas();
      if (!canvas) throw new Error("Unable to prepare canvas.");

      const { quality: resolvedQuality, sizeKb } = await findQualityForKB(
        canvas,
        targetKb
      );

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/jpeg", resolvedQuality)
      );
      if (!blob) throw new Error("Unable to generate image blob.");

      if (sizeKb < minKb || sizeKb > maxKb) {
        throw new Error(
          `Output is ~${sizeKb} KB, outside the required ${minKb}–${maxKb} KB range. Try adjusting the slider.`
        );
      }

      setEstimatedFileSize(`≈${sizeKb} KB`);
      setFinalSizeKb(sizeKb);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      console.error(err);
      toast.error("Failed to process image. The file might be corrupted.");
      setError((err as Error).message || "Failed to process image.");
      
      // Safely reset the component state so the user can try again
      setImageSrc(null);
      setCrop(undefined);
      setCompletedCrop(undefined);
      setDownloadUrl(null);
      setFinalSizeKb(null);
    } finally {
      setProcessing(false);
    }
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="w-full max-w-6xl mx-auto">
      <Toaster position="top-center" />

      {/* ── Document Tabs (segmented control) ── */}
      {config.documents.length > 1 && (
        <div className="mb-ff-6 flex">
          <div className="bg-ff-surface-subtle p-1 rounded-ff-lg inline-flex gap-1">
            {config.documents.map((doc, index) => (
              <button
                key={doc.id}
                type="button"
                onClick={() => setActiveDocIndex(index)}
                className={`px-4 py-1.5 text-sm font-semibold select-none transition-all duration-[180ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                  activeDocIndex === index
                    ? "bg-ff-surface shadow-ff-sm text-brand-600 rounded-ff-md"
                    : "text-ff-foreground-muted hover:text-ff-foreground rounded-ff-md"
                }`}
              >
                {doc.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── 2-column grid ── */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px] items-start">

        {/* ── LEFT COLUMN — Optical Stage ── */}
        <section className="flex flex-col gap-4">

          {/* Live Capture bypass — replaces upload/canvas UI when live webcam is required */}
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
          ) : !imageSrc ? (
            /* ── Pre-upload: dropzone inside dark optical stage ── */
            <div className="bg-ff-canvas border border-ff-border-strong rounded-ff-lg overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">
              <div
                {...getRootProps()}
                role="button"
                tabIndex={0}
                className={`cursor-pointer [&_*]:cursor-pointer group border border-transparent relative flex min-h-[420px] flex-1 flex-col items-center justify-center gap-5 p-10 text-center transition-all duration-[180ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 bg-[radial-gradient(#ffffff14_1px,transparent_1px)] [background-size:16px_16px] hover:border-brand-500 hover:bg-brand-500/5 hover:shadow-[0_0_30px_rgba(49,92,234,0.15)] ${
                  isDragActive
                    ? "bg-brand-500/10"
                    : ""
                }`}
              >
                <input {...getInputProps()} />

                {isDragActive && (
                  <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-brand-400/40" />
                )}

                {/* This wrapper ensures the cursor fix remains active */}
                <div className="flex flex-col items-center justify-center w-full h-full pointer-events-none select-none p-6">
                  {/* 1. The Icon Wrapper (Sleek Circle) */}
                  <div className="w-16 h-16 mb-5 flex items-center justify-center rounded-full bg-white/5 border border-white/10 transition-colors duration-[180ms] group-hover:bg-brand-500/10 group-hover:border-brand-500/30">
                    <Upload className="w-8 h-8 text-slate-400 transition-all duration-[180ms] group-hover:-translate-y-1 group-hover:text-brand-400 group-hover:scale-110" />
                  </div>

                  {/* 2. The Headings */}
                  <h3 className="text-lg font-medium text-white mb-2">
                    {isDragActive
                      ? "Release to begin processing"
                      : `Upload your ${docName} here`}
                  </h3>
                  <p className="text-sm text-slate-400 max-w-sm mx-auto text-center leading-relaxed">
                    {isDragActive
                      ? "Engine ready - auto-crop will be applied instantly."
                      : `Auto-crop and compress to ${width}x${height} px under ${maxKb} KB - portal-ready in seconds.`}
                  </p>

                  {/* 3. The Pill Button */}
                  <div className="mt-6 inline-flex items-center justify-center px-5 py-2 rounded-lg border border-white/10 bg-white/5 text-sm font-medium text-slate-300 transition-all duration-[180ms] group-hover:bg-brand-500/20 group-hover:border-brand-500/50 group-hover:text-white shadow-sm">
                    Or click to browse files
                  </div>
                </div>
              </div>
              {/* Telemetry bar */}
              <div className="bg-ff-canvas-surface border-t border-ff-border-strong/50 px-ff-4 py-ff-2.5 font-mono text-[11px] text-ff-foreground-muted uppercase tracking-wider text-center">
                {width === 0 ? "Standard Passport" : `${width} × ${height} px`} &nbsp;·&nbsp; {minKb}–{maxKb} KB
              </div>
            </div>
          ) : (
            /* ── Post-upload: dark optical stage ── */
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
                <div className="relative inline-flex items-center justify-center w-fit h-fit max-w-full mx-auto shadow-[0_8px_30px_rgb(0,0,0,0.6)] ring-1 ring-white/20 rounded-sm overflow-hidden bg-black">
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
                      alt="Upload preview"
                      onLoad={onImageLoad}
                      className="block max-h-[62vh] w-auto max-w-full object-contain select-none"
                      style={{ maxHeight: "62vh", width: "auto", maxWidth: "100%", height: "auto", display: "block" }}
                    />
                  </ReactCrop>
                  {isRemovingBg && <AIProcessingOverlay loadingText={loadingText} />}
                </div>

                {/* Auto-Center Biometrics button */}
                <button
                  type="button"
                  onClick={handleSmartCrop}
                  title="Detect face and snap crop box to optimal biometric framing"
                  className="absolute right-4 top-4 inline-flex cursor-pointer select-none items-center gap-2 rounded-ff-md border border-violet-500/40 bg-ff-canvas/80 px-3 py-2 text-xs font-semibold text-violet-300 shadow-lg shadow-violet-500/10 backdrop-blur-sm transition hover:border-violet-400 hover:bg-violet-500/20 hover:text-violet-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                >
                  <ScanFace className="h-4 w-4" />
                  <span className="hidden sm:inline">Auto-Center Biometrics</span>
                </button>
              </div>

              {/* TELEMETRY BAR */}
              <div className="relative z-20 w-full bg-ff-canvas-surface border-t border-ff-border-strong/50 px-4 py-2.5 font-mono text-[11px] text-ff-foreground-muted uppercase tracking-wider flex items-center justify-between">
                <span>
                  {width === 0 ? "Standard Passport" : `${width} × ${height} px`} &nbsp;·&nbsp; {minKb}–{maxKb} KB
                </span>
                {/* Re-upload nudge inside telemetry bar */}
                <div
                  {...getRootProps()}
                  className="flex cursor-pointer items-center gap-1.5 rounded-ff-sm border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/40 transition hover:border-brand-500/40 hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
                >
                  <input {...getInputProps()} />
                  <Upload className="h-3 w-3" />
                  Replace
                </div>
              </div>
            </div>

        )}
        </section>

        {/* ── RIGHT COLUMN — Pre-Flight Inspector ── */}
        <aside className="bg-ff-surface border border-ff-border rounded-ff-lg shadow-ff-sm p-ff-6 flex flex-col gap-ff-6">

          {/* Requirements checklist */}
          <div>
            <p className="text-ff-foreground-muted text-[11px] font-mono uppercase tracking-widest mb-ff-3">Official Requirements</p>
            <ul className="space-y-ff-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ff-success" />
                <div>
                  <p className="text-[11px] font-mono uppercase text-ff-foreground-muted">Dimensions</p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-ff-foreground">
                    {width === 0
                      ? "Standard Passport Size (Auto)"
                      : <>{width}&thinsp;&times;&thinsp;{height}&thinsp;px</>}
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ff-success" />
                <div>
                  <p className="text-[11px] font-mono uppercase text-ff-foreground-muted">File Size</p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-ff-foreground">
                    {minKb}&thinsp;KB &ndash; {maxKb}&thinsp;KB
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-ff-success" />
                <div>
                  <p className="text-[11px] font-mono uppercase text-ff-foreground-muted">Format</p>
                  <p className="mt-0.5 text-sm font-semibold text-ff-foreground">JPG, PNG</p>
                </div>
              </li>
              <li className="flex items-start gap-3 pt-ff-4 border-t border-ff-border">
                <FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-ff-warning" />
                <div>
                  <p className="text-[11px] font-mono uppercase text-ff-foreground-muted">Aspect Ratio</p>
                  <p className="mt-0.5 font-mono text-sm font-semibold text-ff-foreground">
                    {width === 0
                      ? "Standard 3.5×4.5"
                      : <>{(safeWidth / safeHeight).toFixed(3)}:1 &mdash; enforced</>}
                  </p>
                </div>
              </li>
            </ul>

            {/* Verification status footer */}
            <div className="mt-4 pt-3 border-t border-ff-border flex flex-wrap items-center text-[11px] text-ff-foreground-muted">
              <span>Last verified {getVerificationDate()}</span>
              <span className="mx-2 text-slate-300">•</span>
              <button
                type="button"
                onClick={() => setIsFeedbackOpen(true)}
                className="text-slate-500 hover:text-brand-600 transition-colors cursor-pointer text-sm font-medium"
              >
                Report a change
              </button>
            </div>
          </div>

          {/* Compression Gauge */}
          {!isLiveCapture && imageSrc && (
            <div className="border border-ff-border rounded-ff-md p-ff-4">
              <div className="flex items-center justify-between mb-ff-3">
                <p className="text-[11px] font-mono uppercase text-ff-foreground-muted">Compression Target</p>
                <span className="font-mono text-sm font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded-ff-sm">
                  Max {targetKb}&thinsp;KB
                </span>
              </div>
              <input
                type="range"
                aria-label={`Target file size in kilobytes, between ${minKb} and ${maxKb}`}
                min={minKb}
                max={maxKb}
                step={1}
                value={targetKb}
                onChange={(e) => setTargetKb(Math.round(Number(e.target.value)))}
                disabled={!completedCrop}
                className="w-full cursor-pointer accent-brand-500 disabled:cursor-not-allowed disabled:opacity-40"
              />
              <div className="mt-ff-1 flex justify-between text-[11px] font-mono text-ff-foreground-muted">
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
              <div className="relative mt-ff-3 flex items-center justify-between rounded-ff-md border border-ff-border bg-ff-surface-subtle px-3 py-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-mono uppercase text-ff-foreground-muted">Est. Output</span>
                  <button
                    type="button"
                    id="size-info-trigger"
                    aria-label="Why is the size smaller?"
                    onClick={() => setShowInfoPopover((v) => !v)}
                    className="cursor-pointer text-ff-foreground-muted hover:text-brand-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 rounded-full"
                  >
                    <HelpCircle className="h-3 w-3" />
                  </button>
                </div>
                <span
                  className={`font-mono text-sm font-bold tabular-nums ${
                    estimatedFileSize === "—" || estimatedFileSize === "Awaiting crop..."
                      ? "text-ff-foreground-muted"
                      : estimatedFileSize === "Estimating..."
                      ? "text-ff-warning animate-pulse"
                      : "text-ff-success"
                  }`}
                >
                  {estimatedFileSize === "Estimating..."
                    ? "Estimating…"
                    : estimatedFileSize === "Awaiting crop..."
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
                      aria-labelledby="size-info-title"
                      className="absolute bottom-full left-0 right-0 z-20 mb-2 rounded-ff-md border border-ff-border bg-ff-surface p-ff-4 shadow-ff-md"
                    >
                      <div className="flex items-start justify-between gap-3 mb-ff-2">
                        <h4 id="size-info-title" className="text-sm font-semibold text-ff-foreground leading-snug">
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
                        highest quality that stays safely under your limit so the exam website
                        never rejects it.
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Name & Date Stamp */}
          {!isLiveCapture && imageSrc && activeDoc.stampRequired && (
            <div className="border border-ff-border rounded-ff-md p-ff-4 space-y-ff-3">
              <label className="flex cursor-pointer items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-ff-md bg-ff-warning-light">
                    <Type className="h-4 w-4 text-ff-warning-dark" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ff-foreground">Add Stamp</p>
                    <p className="text-[11px] font-mono text-ff-foreground-muted uppercase">Required for this document</p>
                  </div>
                </div>
                {/* Toggle switch */}
                <button
                  type="button"
                  onClick={() => setIsStampingEnabled((v) => !v)}
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 ${
                    isStampingEnabled ? "bg-brand-500" : "bg-ff-border-strong"
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-4 w-4 rounded-full bg-white shadow-md transform transition-transform duration-200 ${
                      isStampingEnabled ? "translate-x-5" : "translate-x-0.5"
                    }`}
                  />
                </button>
              </label>
              {isStampingEnabled && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-ff-3">
                  <div className="relative">
                    <Type className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ff-foreground-muted" />
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={stampName}
                      onChange={(e) => setStampName(e.target.value)}
                      className="w-full bg-ff-background border border-ff-border rounded-ff-md px-3 py-2 pl-9 text-sm text-ff-foreground placeholder:text-ff-foreground-muted focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:outline-none transition"
                    />
                  </div>
                  <div className="relative">
                    <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-ff-foreground-muted" />
                    <input
                      type="text"
                      placeholder="DD-MM-YYYY"
                      value={stampDate}
                      onChange={(e) => setStampDate(e.target.value)}
                      className="w-full bg-ff-background border border-ff-border rounded-ff-md px-3 py-2 pl-9 text-sm text-ff-foreground placeholder:text-ff-foreground-muted focus:ring-2 focus:ring-brand-500 focus:border-brand-500 focus:outline-none transition"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Studio Background selector / B&W Document Scan toggle */}
          {imageSrc && (
            isDocumentMode ? (
              <div className="mb-5 p-4 rounded-xl border border-ff-border bg-ff-surface">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <FileSignature className="w-5 h-5 text-brand-600" />
                    <div>
                      <h4 className="text-sm font-semibold text-ff-foreground">Smart Enhance</h4>
                      <p className="text-[10px] text-ff-foreground-muted uppercase tracking-wider">Cleans lighting and sharpens ink for strict compliance</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={applyBwScan}
                      onChange={(e) => setApplyBwScan(e.target.checked)}
                    />
                    <div className="w-9 h-5 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-brand-500"></div>
                  </label>
                </div>
              </div>
            ) : (
              <>
                {/* Studio Background selector */}
                <div className="border border-ff-border rounded-ff-md p-ff-4">
                  <div className="flex items-center gap-3 mb-ff-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-ff-md bg-brand-50">
                      <Palette className="h-4 w-4 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-ff-foreground">Background</p>
                      <p className="text-[11px] font-mono uppercase text-ff-foreground-muted">Fills after BG removal</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {([
                      { color: "#FFFFFF", label: "Pure White" },
                      { color: "#F3F4F6", label: "Light Grey" },
                      { color: "#0EA5E9", label: "Studio Blue" },
                    ] as const).map(({ color, label }) => (
                      <button
                        key={color}
                        type="button"
                        title={label}
                        aria-label={`Set background to ${label}`}
                        onClick={() => setBgColor(color)}
                        className={`cursor-pointer h-8 w-8 rounded-full border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                          bgColor === color
                            ? "border-brand-500 ring-2 ring-brand-500 ring-offset-2 ring-offset-ff-surface scale-110"
                            : "border-ff-border hover:border-ff-border-strong hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>
              </>
            )
          )}

          {/* Action buttons */}
          {!isLiveCapture && imageSrc && (
            <div className="flex flex-col gap-ff-3 mt-auto">
              {!isDocumentMode && (
                <button
                  type="button"
                  onClick={handleRemoveBackground}
                  disabled={isRemovingBg}
                  className="inline-flex cursor-pointer select-none w-full items-center justify-center gap-2 rounded-ff-md border border-ff-border bg-ff-surface px-5 py-2.5 text-sm font-semibold text-ff-foreground shadow-ff-sm transition-all duration-[180ms] hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {removeBgStage !== "idle" ? (
                    <span className="h-4 w-4 rounded-full border-2 border-transparent border-r-brand-500 border-t-brand-500 animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {removeBgStage === "optimizing"
                    ? "Optimizing..."
                    : removeBgStage === "removing"
                    ? "Removing BG..."
                    : "Remove Background"}
                </button>
              )}

              <button
                type="button"
                onClick={generateCroppedImage}
                disabled={!completedCrop || processing}
                className="inline-flex cursor-pointer select-none w-full items-center justify-center gap-2 rounded-ff-md bg-brand-500 hover:bg-brand-600 px-6 py-2.5 text-sm font-semibold text-white shadow-ff-sm transition-all duration-[180ms] disabled:cursor-not-allowed disabled:bg-ff-border-strong disabled:opacity-50 disabled:shadow-none"
              >
                {processing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {processing ? "Processing..." : "Process & Compress"}
              </button>
            </div>
          )}

          {/* Pre-Flight Validation Check */}
          {!isLiveCapture && downloadUrl && finalSizeKb !== null && (
            <div className="rounded-ff-md border border-ff-success/30 bg-ff-success-light p-ff-4">
              <div className="flex items-center gap-2 mb-ff-3">
                <ShieldCheck className="h-5 w-5 text-ff-success-dark" />
                <h3 className="text-sm font-bold text-ff-success-dark tracking-wide">Pre-Flight Check</h3>
              </div>
              <ul className="space-y-ff-2">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-ff-success shrink-0 mt-0.5" />
                  <p className="text-xs text-ff-foreground">
                    <span className="font-semibold block">Dimensions Locked:</span>
                    <span className="font-mono">{activeDoc.width} &times; {activeDoc.height} px</span>
                  </p>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-ff-success shrink-0 mt-0.5" />
                  <p className="text-xs text-ff-foreground">
                    <span className="font-semibold block">File Size Passed:</span>
                    <span className="font-mono">{finalSizeKb} KB</span>
                    <span className="text-ff-success-dark ml-1 text-[11px]">({activeDoc.minKb}–{activeDoc.maxKb} KB)</span>
                  </p>
                </li>
              </ul>
            </div>
          )}

          {/* Download link */}
          {!isLiveCapture && downloadUrl && (
            <a
              href={downloadUrl}
              download={`${config.title.replace(/\s+/g, "_")}_${activeDoc.id}_FormFoto.jpg`}
              className="inline-flex cursor-pointer select-none w-full items-center justify-center gap-2 rounded-ff-md bg-brand-500 hover:bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-ff-sm transition-all duration-[180ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Download className="h-4 w-4" />
              Download {docName}
            </a>
          )}

          {/* Error message */}
          {error && (
            <div className="flex items-start gap-3 rounded-ff-md border border-ff-error/30 bg-ff-error-light px-ff-4 py-ff-3">
              <FileWarning className="mt-0.5 h-4 w-4 shrink-0 text-ff-error" />
              <p className="text-sm text-ff-error-dark">{error}</p>
            </div>
          )}

          {/* Trust box */}
          <div className="flex items-start gap-3 rounded-ff-md border border-ff-success/20 bg-ff-success-light/40 px-ff-4 py-ff-3 mt-auto">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-ff-success" />
            <div>
              <p className="text-sm font-semibold text-ff-foreground">100% Private</p>
              <p className="mt-0.5 text-xs leading-relaxed text-ff-foreground-muted">
                Processed locally on your device. Zero server uploads. Your photo never leaves your browser.
              </p>
            </div>
          </div>
        </aside>

      </div>
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        title="Report a Specification Change"
        description="Has something changed in the official exam requirements? Let us know and we'll update the spec."
      />
    </div>
  );
}
