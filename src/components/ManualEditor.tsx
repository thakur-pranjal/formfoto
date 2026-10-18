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
import { Download, Upload, Image as ImageIcon, Loader2, Palette } from "lucide-react";
import "react-image-crop/dist/ReactCrop.css";

// ---------------------------------------------------------------------------
// Utility helpers
// ---------------------------------------------------------------------------

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): PercentCrop {
  const crop = makeAspectCrop(
    { unit: "%", width: 90 },
    aspect,
    mediaWidth,
    mediaHeight
  );
  return centerCrop(crop, mediaWidth, mediaHeight);
}

const MAX_BG_DIMENSION = 1024;

// Dynamic loading messages for psychological UX during BG removal
const BG_REMOVAL_STEPS = [
  "Analyzing subject...",
  "Extracting foreground...",
  "Refining edges...",
];

// Background color swatches for live canvas preview
const BG_COLOR_SWATCHES = [
  { label: "White",       value: "#ffffff",  tw: "bg-white border-slate-300" },
  { label: "Light gray",  value: "#f1f5f9",  tw: "bg-slate-100 border-slate-300" },
  { label: "Black",       value: "#000000",  tw: "bg-black border-slate-600" },
  { label: "Navy",        value: "#0f172a",  tw: "bg-slate-900 border-slate-600" },
  { label: "Transparent", value: "transparent", tw: "border-slate-600" },
];

const loadImageElement = (input: string | Blob): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
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
): Promise<Blob> =>
  new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error("Unable to create blob."))),
      type,
      quality
    );
  });

const resizeForBgRemoval = async (source: string): Promise<Blob> => {
  const img = await loadImageElement(source);
  const naturalWidth = img.naturalWidth || img.width;
  const naturalHeight = img.naturalHeight || img.height;
  const maxSide = Math.max(naturalWidth, naturalHeight);

  let tw = naturalWidth;
  let th = naturalHeight;
  if (maxSide > MAX_BG_DIMENSION) {
    const scale = MAX_BG_DIMENSION / maxSide;
    tw = Math.round(naturalWidth * scale);
    th = Math.round(naturalHeight * scale);
  }

  const canvas = document.createElement("canvas");
  canvas.width = tw || 1;
  canvas.height = th || 1;
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

const compositeTransparentOnWhite = async (blob: Blob): Promise<string> => {
  const img = await loadImageElement(blob);
  const width = img.naturalWidth || img.width;
  const height = img.naturalHeight || img.height;
  const canvas = document.createElement("canvas");
  canvas.width = width || 1;
  canvas.height = height || 1;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas is not supported.");
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/jpeg");
};

// ---------------------------------------------------------------------------
// AI Processing Overlay
// ---------------------------------------------------------------------------

const AIProcessingOverlay = ({ stepText }: { stepText: string }) => (
  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black/40 backdrop-blur-sm transition-all duration-500">
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-70"
        style={{ animation: "ai-shimmer 2.8s linear infinite" }}
      />
    </div>
    <div className="relative flex items-center justify-center">
      <div
        className="h-16 w-16 rounded-full bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-[0_0_40px_rgba(168,85,247,0.6)] animate-pulse"
        style={{ animationDuration: "2.4s" }}
      />
    </div>
    <p
      key={stepText}
      className="mt-4 text-sm font-medium tracking-wide text-white/90 animate-bounce"
      style={{ transition: "opacity 0.4s ease" }}
    >
      {stepText}
    </p>
    <style jsx>{`
      @keyframes ai-shimmer {
        0% { transform: translateX(-150%) skewX(-12deg); }
        100% { transform: translateX(150%) skewX(-12deg); }
      }
    `}</style>
  </div>
);

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

interface PresetConfig {
  width: number;
  height: number;
  maxKb: number;
}

export default function ManualEditor({ presetConfig }: { presetConfig?: PresetConfig }) {
  // Dimension & size state — user's typed value is absolute law
  const [targetWidth, setTargetWidth] = useState(presetConfig?.width ?? 500);
  const [targetHeight, setTargetHeight] = useState(presetConfig?.height ?? 500);
  const [targetKb, setTargetKb] = useState(presetConfig?.maxKb ?? 100);

  // Image pipeline state
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<PercentCrop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  // UI state
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [estimatedFileSize, setEstimatedFileSize] = useState("—");
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [removeBgStage, setRemoveBgStage] = useState<
    "idle" | "optimizing" | "removing"
  >("idle");
  // Dynamic loading step text cycling during BG removal
  const [bgRemovalStep, setBgRemovalStep] = useState(BG_REMOVAL_STEPS[0]);
  // true when the user's target KB exceeds what quality:1.0 can physically produce
  const [estimateCapped, setEstimateCapped] = useState(false);
  // Output format toggle
  const [outputFormat, setOutputFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");
  // Live canvas background color for transparent-image preview
  const [selectedBackgroundColor, setSelectedBackgroundColor] = useState("#ffffff");

  const imgRef = useRef<HTMLImageElement | null>(null);

  // Derived aspect ratio
  const aspectRatio =
    targetWidth > 0 && targetHeight > 0 ? targetWidth / targetHeight : 1;

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
      setDownloadUrl(null);
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
  // Image load
  // ---------------------------------------------------------------------------

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    imgRef.current = target;
    setCrop(
      centerAspectCrop(target.naturalWidth, target.naturalHeight, aspectRatio)
    );
  };

  // Re-center crop whenever dimensions change
  useEffect(() => {
    if (!imgRef.current) return;
    const { naturalWidth, naturalHeight } = imgRef.current;
    setCrop(centerAspectCrop(naturalWidth, naturalHeight, aspectRatio));
    setCompletedCrop(undefined);
  }, [aspectRatio]);

  // Revoke previous download URL
  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  // ---------------------------------------------------------------------------
  // Background removal
  // ---------------------------------------------------------------------------

  const handleRemoveBackground = useCallback(async () => {
    if (!imageSrc) return;
    setIsRemovingBg(true);
    setRemoveBgStage("optimizing");
    setBgRemovalStep(BG_REMOVAL_STEPS[0]);
    setError(null);

    // Cycle through psychological loading messages every 1.5 s
    let stepIndex = 0;
    const stepInterval = setInterval(() => {
      stepIndex = (stepIndex + 1) % BG_REMOVAL_STEPS.length;
      setBgRemovalStep(BG_REMOVAL_STEPS[stepIndex]);
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
      // Keep the image transparent (PNG) so the canvas background color bleeds through
      const objectUrl = URL.createObjectURL(bgRemovedBlob);

      // The returned image IS already the cropped area, so reset the crop box
      // to full coverage so the user doesn't end up with a mis-sized selection.
      const fullCrop: PercentCrop = {
        unit: "%",
        x: 0,
        y: 0,
        width: 100,
        height: 100,
      };
      setImageSrc(objectUrl);
      setCrop(fullCrop);
      setCompletedCrop(undefined);
      setDownloadUrl(null);
    } catch (err) {
      console.error(err);
      setError("Failed to remove background. Please try again.");
    } finally {
      clearInterval(stepInterval);
      setIsRemovingBg(false);
      setRemoveBgStage("idle");
    }
  }, [imageSrc, completedCrop]);

  // ---------------------------------------------------------------------------
  // Canvas render — crops to exactly targetWidth × targetHeight
  // ---------------------------------------------------------------------------

  const renderCanvas = useCallback((): HTMLCanvasElement | null => {
    if (!imgRef.current || !completedCrop) return null;
    if (!completedCrop.width || !completedCrop.height) return null;

    const canvas = document.createElement("canvas");
    canvas.width = targetWidth;
    canvas.height = targetHeight;
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
      targetWidth,
      targetHeight
    );

    return canvas;
  }, [completedCrop, targetWidth, targetHeight]);

  // ---------------------------------------------------------------------------
  // Binary search for JPEG quality → target KB
  // 20 bisection iterations for surgical precision.
  // cappedAtMax = true when the target is physically larger than quality:1.0 allows.
  // ---------------------------------------------------------------------------

  const findQualityForKB = useCallback(
    async (
      canvas: HTMLCanvasElement,
      targetKbValue: number
    ): Promise<{ quality: number; sizeKb: number; cappedAtMax: boolean }> => {
      const toBlobAtQuality = (q: number) =>
        new Promise<Blob | null>((resolve) =>
          canvas.toBlob((blob) => resolve(blob), "image/jpeg", q)
        );

      // ── Step 1: Check physical ceiling at quality 1.0 ──────────────────────
      const maxBlob = await toBlobAtQuality(1);
      const maxSizeKb = maxBlob ? Math.max(1, Math.round(maxBlob.size / 1024)) : 0;

      if (maxSizeKb <= targetKbValue) {
        // Target is at or above the physical maximum — return best we can.
        return { quality: 1, sizeKb: maxSizeKb, cappedAtMax: true };
      }

      // ── Step 2: 20-iteration bisection ─────────────────────────────────────
      let low = 0.01;
      let high = 1;
      let bestQuality = 0.01;
      let bestSize = 0;
      let bestDiff = Number.POSITIVE_INFINITY;

      for (let i = 0; i < 20; i += 1) {
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

        // Exact match or interval collapsed to floating-point noise
        if (sizeKb === targetKbValue || high - low < 0.0001) break;

        if (sizeKb > targetKbValue) {
          high = mid;
        } else {
          low = mid;
        }
      }

      // ── Step 3: Minimum floor — if even quality:0.01 overshoots, return it ─
      if (bestDiff === Number.POSITIVE_INFINITY) {
        const floorBlob = await toBlobAtQuality(0.01);
        const floorSize = floorBlob
          ? Math.max(1, Math.round(floorBlob.size / 1024))
          : 0;
        return { quality: 0.01, sizeKb: floorSize, cappedAtMax: false };
      }

      return {
        quality: Math.max(0.01, Math.min(1, bestQuality)),
        sizeKb: bestSize,
        cappedAtMax: false,
      };
    },
    []
  );

  // ---------------------------------------------------------------------------
  // Process
  // ---------------------------------------------------------------------------

  const generateCroppedImage = async () => {
    if (!imgRef.current || !completedCrop) return;
    setProcessing(true);
    setError(null);

    try {
      const canvas = renderCanvas();
      if (!canvas) throw new Error("Unable to prepare canvas.");

      let blob: Blob | null = null;
      let sizeKb = 0;

      if (outputFormat === "image/png") {
        // PNG is lossless — single pass, no binary search
        blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/png")
        );
        sizeKb = blob ? Math.max(1, Math.round(blob.size / 1024)) : 0;
        setEstimateCapped(false);
      } else {
        const { quality: resolvedQuality, sizeKb: jpegKb, cappedAtMax } =
          await findQualityForKB(canvas, targetKb);
        blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob((b) => resolve(b), "image/jpeg", resolvedQuality)
        );
        sizeKb = jpegKb;
        setEstimateCapped(cappedAtMax);
      }

      if (!blob) throw new Error("Unable to generate image blob.");

      setEstimatedFileSize(`≈${sizeKb} KB`);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError((err as Error).message || "Failed to process image.");
    } finally {
      setProcessing(false);
    }
  };

  // ---------------------------------------------------------------------------
  // Live size estimate (debounced)
  // ---------------------------------------------------------------------------

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
        if (outputFormat === "image/png") {
          const blob = await new Promise<Blob | null>((resolve) =>
            canvas.toBlob((b) => resolve(b), "image/png")
          );
          const sizeKb = blob ? Math.max(1, Math.round(blob.size / 1024)) : 0;
          if (!cancelled) {
            setEstimateCapped(false);
            setEstimatedFileSize(`≈${sizeKb} KB`);
          }
        } else {
          const { sizeKb, cappedAtMax } = await findQualityForKB(canvas, targetKb);
          if (!cancelled) {
            setEstimateCapped(cappedAtMax);
            setEstimatedFileSize(`≈${sizeKb} KB`);
          }
        }
      } catch {
        if (!cancelled) {
          setEstimateCapped(false);
          setEstimatedFileSize("—");
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [completedCrop, findQualityForKB, imageSrc, outputFormat, renderCanvas, targetKb]);

  // ---------------------------------------------------------------------------
  // Render
  // ---------------------------------------------------------------------------

  return (
    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">

      {/* ── LEFT COLUMN — Dark Optical Stage ── */}
      <div className="flex flex-col gap-0 bg-ff-canvas border border-ff-border-strong rounded-ff-lg overflow-hidden shadow-[inset_0_2px_8px_rgba(0,0,0,0.4)]">

        {/* Dropzone (replaced by canvas once imageSrc is set) */}
        {!imageSrc ? (
          <div
            {...getRootProps()}
            className={`group flex min-h-[420px] flex-1 cursor-pointer flex-col items-center justify-center gap-5 p-10 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
              isDragActive ? "bg-brand-500/10" : "hover:bg-white/[0.02]"
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive && (
              <div className="pointer-events-none absolute inset-0 ring-2 ring-inset ring-brand-400/40" />
            )}
            <div
              className={`flex h-24 w-24 items-center justify-center rounded-full border transition-all duration-300 ${
                isDragActive
                  ? "border-brand-400/40 bg-brand-500/20 shadow-[0_0_40px_rgba(49,92,234,0.35)]"
                  : "border-white/10 bg-white/5 shadow-inner group-hover:border-brand-500/40 group-hover:bg-white/10"
              }`}
            >
              <Upload
                className={`h-10 w-10 transition-all duration-300 ${
                  isDragActive
                    ? "text-brand-300 scale-110"
                    : "text-white/30 group-hover:text-brand-400"
                }`}
              />
            </div>
            <div className="max-w-sm space-y-2">
              <p className="text-lg font-semibold text-white">
                {isDragActive ? "Release to begin processing" : "Drop your image here"}
              </p>
              <p className="text-sm leading-relaxed text-white/50">
                {isDragActive
                  ? "Engine ready — crop will be applied instantly."
                  : "Drag & drop or click to select. JPG, PNG · Max 5 MB recommended."}
              </p>
            </div>
            {!isDragActive && (
              <span className="rounded-ff-md border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/40 transition group-hover:border-brand-500/40 group-hover:text-brand-300">
                Or click to browse files
              </span>
            )}
          </div>
        ) : (
          /* ── Canvas with ReactCrop ── */
          <div className="relative w-full flex-1 min-h-[420px]">
            <div
              className="w-full h-full min-h-[420px] transition-colors duration-300"
              style={{
                backgroundColor:
                  selectedBackgroundColor === "transparent"
                    ? undefined
                    : selectedBackgroundColor,
                backgroundImage:
                  selectedBackgroundColor === "transparent"
                    ? "conic-gradient(#475569 25%, #334155 0 50%, #475569 0 75%, #334155 0)"
                    : undefined,
                backgroundSize:
                  selectedBackgroundColor === "transparent" ? "16px 16px" : undefined,
              }}
            >
              <ReactCrop
                crop={crop}
                onChange={(_c, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspectRatio}
                keepSelection
                className="max-h-[70vh]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imageSrc}
                  alt="Upload preview"
                  onLoad={onImageLoad}
                  className="max-h-[70vh] object-contain"
                />
              </ReactCrop>
              {isRemovingBg && <AIProcessingOverlay stepText={bgRemovalStep} />}
            </div>

            {/* Re-upload overlay button */}
            <div
              {...getRootProps()}
              className="absolute top-3 right-3 flex cursor-pointer items-center gap-1.5 rounded-ff-sm border border-white/10 bg-ff-canvas/80 px-2 py-1 text-[11px] text-white/40 backdrop-blur-sm transition hover:border-brand-500/40 hover:text-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <input {...getInputProps()} />
              <Upload className="h-3 w-3" />
              Replace
            </div>
          </div>
        )}

        {/* Live Telemetry ticker bar */}
        <div className="bg-ff-canvas-surface border-t border-ff-border-strong/50 px-ff-4 py-ff-2 text-center font-mono text-[11px] tracking-wider text-ff-foreground-muted uppercase">
          {targetWidth}&thinsp;&times;&thinsp;{targetHeight}&thinsp;px
          &nbsp;&middot;&nbsp;
          {outputFormat === "image/png" ? "PNG · Lossless" : `JPEG · Max ${targetKb} KB`}
        </div>
      </div>

      {/* ── RIGHT COLUMN — Configuration Inspector ── */}
      <aside className="bg-ff-surface border border-ff-border rounded-ff-lg shadow-ff-sm p-ff-6 flex flex-col gap-ff-6">

        {/* Panel header */}
        <div>
          <p className="text-[11px] font-mono uppercase tracking-widest text-ff-foreground-muted mb-1">Configuration</p>
          <div className="flex items-center gap-2">
            <ImageIcon className="h-4 w-4 text-brand-500" />
            <span className="text-sm font-semibold text-ff-foreground">
              {targetWidth}&times;{targetHeight}px &middot; {targetKb}&nbsp;KB
            </span>
          </div>
        </div>

        {/* Preset lock banner */}
        {presetConfig && (
          <div className="inline-flex items-center gap-1.5 rounded-ff-md border border-ff-success/40 bg-ff-success-light px-3 py-2 text-xs font-semibold text-ff-success-dark">
            🔒 Preset Locked — {presetConfig.width}&times;{presetConfig.height}px &middot; {presetConfig.maxKb} KB max
          </div>
        )}

        {/* Output Format toggle (segmented control) */}
        <div>
          <p className="text-[11px] font-mono uppercase text-ff-foreground-muted mb-ff-2">Format</p>
          <div className="bg-ff-surface-subtle p-1 rounded-ff-lg inline-flex gap-1">
            <button
              type="button"
              onClick={() => setOutputFormat("image/jpeg")}
              className={`px-4 py-1.5 text-sm font-semibold select-none transition-all duration-[180ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                outputFormat === "image/jpeg"
                  ? "bg-ff-surface shadow-ff-sm text-brand-600 rounded-ff-md"
                  : "text-ff-foreground-muted hover:text-ff-foreground rounded-ff-md"
              }`}
            >
              JPG
            </button>
            <button
              type="button"
              onClick={() => setOutputFormat("image/png")}
              className={`px-4 py-1.5 text-sm font-semibold select-none transition-all duration-[180ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 ${
                outputFormat === "image/png"
                  ? "bg-ff-surface shadow-ff-sm text-brand-600 rounded-ff-md"
                  : "text-ff-foreground-muted hover:text-ff-foreground rounded-ff-md"
              }`}
            >
              PNG
            </button>
          </div>
        </div>

        {/* Dimension & size inputs */}
        <div>
          <p className="text-[11px] font-mono uppercase text-ff-foreground-muted mb-ff-3">Target Dimensions</p>
          <div className="grid grid-cols-3 gap-3">
            {/* Width */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="manual-width" className="text-[11px] font-mono uppercase text-ff-foreground-muted">
                Width (px)
              </label>
              <input
                id="manual-width"
                type="number"
                min={1}
                value={targetWidth}
                disabled={!!presetConfig}
                onChange={(e) => setTargetWidth(Math.max(1, Math.floor(Number(e.target.value))))}
                className={`bg-ff-background border rounded-ff-md px-3 py-2 text-sm text-ff-foreground transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none ${
                  presetConfig
                    ? "border-ff-success/40 text-ff-success-dark cursor-not-allowed opacity-70"
                    : "border-ff-border hover:border-ff-border-strong focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                }`}
              />
            </div>

            {/* Height */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="manual-height" className="text-[11px] font-mono uppercase text-ff-foreground-muted">
                Height (px)
              </label>
              <input
                id="manual-height"
                type="number"
                min={1}
                value={targetHeight}
                disabled={!!presetConfig}
                onChange={(e) => setTargetHeight(Math.max(1, Math.floor(Number(e.target.value))))}
                className={`bg-ff-background border rounded-ff-md px-3 py-2 text-sm text-ff-foreground transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none ${
                  presetConfig
                    ? "border-ff-success/40 text-ff-success-dark cursor-not-allowed opacity-70"
                    : "border-ff-border hover:border-ff-border-strong focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                }`}
              />
            </div>

            {/* Max KB */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="manual-kb"
                className={`text-[11px] font-mono uppercase ${
                  outputFormat === "image/png" || presetConfig
                    ? "text-ff-foreground-muted/50"
                    : "text-ff-foreground-muted"
                }`}
              >
                Max KB
              </label>
              <input
                id="manual-kb"
                type="number"
                min={1}
                value={targetKb}
                disabled={outputFormat === "image/png" || !!presetConfig}
                onChange={(e) => setTargetKb(Math.max(1, Math.floor(Number(e.target.value))))}
                className={`bg-ff-background border rounded-ff-md px-3 py-2 text-sm text-ff-foreground transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none focus:outline-none ${
                  presetConfig
                    ? "border-ff-success/40 text-ff-success-dark cursor-not-allowed opacity-70"
                    : outputFormat === "image/png"
                    ? "border-ff-border text-ff-foreground-muted cursor-not-allowed opacity-50"
                    : "border-ff-border hover:border-ff-border-strong focus:ring-2 focus:ring-brand-500 focus:border-brand-500"
                }`}
              />
              {outputFormat === "image/png" && !presetConfig && (
                <p className="text-[11px] text-ff-warning leading-tight">PNGs are lossless</p>
              )}
            </div>
          </div>

          {/* Aspect ratio info pill */}
          <div className="mt-ff-3 flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-ff-md border border-ff-border bg-ff-surface-subtle px-3 py-1 text-xs text-ff-foreground-muted">
              <span className="text-ff-foreground-muted/60">Ratio</span>
              <span className="font-semibold text-ff-foreground font-mono">
                {Number.isFinite(aspectRatio) ? aspectRatio.toFixed(3) : "N/A"}
              </span>
              <span className="mx-1 text-ff-border-strong">&middot;</span>
              <span className="text-ff-foreground-muted/60">Output</span>
              <span className="font-semibold text-ff-foreground font-mono">
                {targetWidth}&times;{targetHeight}
              </span>
            </span>
          </div>
        </div>

        {/* Background Color swatches */}
        <div>
          <div className="flex items-center gap-2 mb-ff-3">
            <Palette className="h-3.5 w-3.5 text-brand-500" />
            <p className="text-[11px] font-mono uppercase text-ff-foreground-muted">Background</p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {BG_COLOR_SWATCHES.map((swatch) => (
              <button
                key={swatch.value}
                type="button"
                title={swatch.label}
                onClick={() => setSelectedBackgroundColor(swatch.value)}
                className={`h-8 w-8 rounded-full border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 hover:scale-110 ${
                  selectedBackgroundColor === swatch.value
                    ? "border-brand-500 ring-2 ring-brand-500 ring-offset-2 ring-offset-ff-surface scale-110"
                    : "border-ff-border hover:border-ff-border-strong"
                } ${
                  swatch.value === "transparent"
                    ? "bg-[conic-gradient(#cbd5e1_25%,#fff_0_50%,#cbd5e1_0_75%,#fff_0)] bg-[length:8px_8px]"
                    : ""
                }`}
                style={swatch.value !== "transparent" ? { backgroundColor: swatch.value } : {}}
              />
            ))}
            {/* Free-pick color input */}
            <label
              title="Custom color"
              className="relative h-8 w-8 rounded-full border-2 border-dashed border-ff-border overflow-hidden hover:scale-110 hover:border-brand-500 transition-all cursor-pointer"
            >
              <input
                type="color"
                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                value={selectedBackgroundColor === "transparent" ? "#ffffff" : selectedBackgroundColor}
                onChange={(e) => setSelectedBackgroundColor(e.target.value)}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold text-ff-foreground-muted">+</span>
            </label>
          </div>
        </div>

        {/* Compression gauge / live size estimate */}
        <div className="border border-ff-border rounded-ff-md p-ff-4">
          <p className="text-[11px] font-mono uppercase text-ff-foreground-muted mb-ff-2">Est. Output</p>
          <div className="flex items-baseline gap-2">
            {estimateCapped ? (
              <>
                <span className="font-mono text-lg font-bold text-ff-warning">{estimatedFileSize}</span>
                <span className="text-[11px] font-semibold text-ff-warning-dark">Max Quality Reached</span>
              </>
            ) : (
              <span className={`font-mono text-lg font-bold ${
                estimatedFileSize === "—" || estimatedFileSize === "Awaiting crop..."
                  ? "text-ff-foreground-muted"
                  : estimatedFileSize === "Estimating..."
                  ? "text-ff-warning animate-pulse"
                  : "text-ff-success"
              }`}>
                {estimatedFileSize === "Estimating..."
                  ? "Estimating…"
                  : estimatedFileSize === "Awaiting crop..."
                  ? "Awaiting crop…"
                  : estimatedFileSize}
              </span>
            )}
          </div>
          <p className="text-[11px] font-mono text-ff-foreground-muted mt-1">
            Target: {targetKb}&nbsp;KB &middot; {targetWidth}&times;{targetHeight}px
          </p>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-ff-3 mt-auto">
          <button
            type="button"
            onClick={handleRemoveBackground}
            disabled={!imageSrc || isRemovingBg}
            className="inline-flex w-full cursor-pointer select-none items-center justify-center gap-2 rounded-ff-md border border-ff-border bg-ff-surface px-5 py-2.5 text-sm font-semibold text-ff-foreground shadow-ff-sm transition-all duration-[180ms] hover:border-brand-300 hover:bg-brand-50 hover:text-brand-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {removeBgStage !== "idle" && (
              <span className="h-4 w-4 rounded-full border-2 border-transparent border-r-brand-500 border-t-brand-500 animate-spin" />
            )}
            {removeBgStage === "optimizing"
              ? "Optimizing..."
              : removeBgStage === "removing"
              ? "Removing BG..."
              : "✨ Remove Background"}
          </button>

          <button
            type="button"
            onClick={generateCroppedImage}
            disabled={!completedCrop || processing}
            className="inline-flex w-full cursor-pointer select-none items-center justify-center gap-2 rounded-ff-md bg-brand-500 hover:bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-ff-sm transition-all duration-[180ms] disabled:cursor-not-allowed disabled:bg-ff-border-strong disabled:opacity-50 disabled:shadow-none"
          >
            {processing ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            {processing ? "Processing..." : "Process & Compress"}
          </button>

          {/* Download link */}
          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`ManualEditor_${targetWidth}x${targetHeight}.${outputFormat === "image/png" ? "png" : "jpg"}`}
              className="inline-flex w-full cursor-pointer select-none items-center justify-center gap-2 rounded-ff-md bg-brand-500 hover:bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-ff-sm transition-all duration-[180ms] focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500"
            >
              <Download className="h-4 w-4" />
              Download processed photo
            </a>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-start gap-2 rounded-ff-md border border-ff-error/30 bg-ff-error-light px-ff-4 py-ff-3">
              <p className="text-sm text-ff-error-dark">{error}</p>
            </div>
          )}
        </div>

      </aside>
    </div>
  );
}
