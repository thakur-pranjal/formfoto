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
import { Download, Upload, Image as ImageIcon, Loader2 } from "lucide-react";
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

const AIProcessingOverlay = () => (
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
    <p className="mt-4 text-sm font-medium tracking-wide text-white/80 animate-bounce">
      Processing Image...
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
  // true when the user's target KB exceeds what quality:1.0 can physically produce
  const [estimateCapped, setEstimateCapped] = useState(false);
  // Output format toggle
  const [outputFormat, setOutputFormat] = useState<"image/jpeg" | "image/png">("image/jpeg");

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
    setError(null);
    try {
      const resizedBlob = await resizeForBgRemoval(imageSrc);
      setRemoveBgStage("removing");
      const bgRemovedBlob = await removeBackground(resizedBlob);
      const dataUrl = await compositeTransparentOnWhite(bgRemovedBlob);
      setImageSrc(dataUrl);
      setCrop(undefined);
      setCompletedCrop(undefined);
      setDownloadUrl(null);
    } catch (err) {
      console.error(err);
      setError("Failed to remove background. Please try again.");
    } finally {
      setIsRemovingBg(false);
      setRemoveBgStage("idle");
    }
  }, [imageSrc]);

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
    <div className="w-full max-w-4xl mx-auto space-y-6 rounded-3xl border border-slate-700 bg-slate-800/50 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">

      {/* ── Header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-white">Manual Editor</h2>
          <p className="text-sm text-slate-400">
            Set exact dimensions and target file size, then crop and process.
          </p>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <ImageIcon className="h-5 w-5 text-cyan-300" />
          <span className="text-sm font-medium text-white">
            Custom ({targetWidth}&times;{targetHeight}px · {targetKb}&nbsp;KB)
          </span>
        </div>
      </div>

      {/* ── Output Format Toggle ── */}
      <div className="flex items-center gap-3">
        <span className="text-xs font-medium text-slate-300 uppercase tracking-wider">Format</span>
        <div className="flex overflow-hidden rounded-lg border border-slate-600">
          <button
            type="button"
            onClick={() => setOutputFormat("image/jpeg")}
            className={`px-4 py-1.5 text-sm font-medium transition-colors ${
              outputFormat === "image/jpeg"
                ? "bg-blue-600 text-white"
                : "bg-slate-900/70 text-slate-400 hover:text-slate-200"
            }`}
          >
            JPG
          </button>
          <button
            type="button"
            onClick={() => setOutputFormat("image/png")}
            className={`px-4 py-1.5 text-sm font-medium transition-colors ${
              outputFormat === "image/png"
                ? "bg-blue-600 text-white"
                : "bg-slate-900/70 text-slate-400 hover:text-slate-200"
            }`}
          >
            PNG
          </button>
        </div>
      </div>

      {/* ── Dimension & size controls ── */}
      {presetConfig && (
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400">
            🔒 Preset Locked — {presetConfig.width}×{presetConfig.height}px · {presetConfig.maxKb}KB max
          </span>
        </div>
      )}
      <div className="grid grid-cols-3 gap-3">
        {/* Width */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="manual-width"
            className="text-xs font-medium text-slate-300 uppercase tracking-wider"
          >
            Width (px)
          </label>
          <input
            id="manual-width"
            type="number"
            min={1}
            value={targetWidth}
            disabled={!!presetConfig}
            onChange={(e) =>
              setTargetWidth(Math.max(1, Math.floor(Number(e.target.value))))
            }
            className={`bg-slate-900/70 border rounded-xl px-3 py-2.5 text-sm transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              presetConfig
                ? "border-emerald-700/50 text-emerald-300 cursor-not-allowed opacity-70"
                : "border-slate-600 hover:border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
        </div>

        {/* Height */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="manual-height"
            className="text-xs font-medium text-slate-300 uppercase tracking-wider"
          >
            Height (px)
          </label>
          <input
            id="manual-height"
            type="number"
            min={1}
            value={targetHeight}
            disabled={!!presetConfig}
            onChange={(e) =>
              setTargetHeight(Math.max(1, Math.floor(Number(e.target.value))))
            }
            className={`bg-slate-900/70 border rounded-xl px-3 py-2.5 text-sm transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              presetConfig
                ? "border-emerald-700/50 text-emerald-300 cursor-not-allowed opacity-70"
                : "border-slate-600 hover:border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
        </div>

        {/* Max KB */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="manual-kb"
            className={`text-xs font-medium uppercase tracking-wider ${
              outputFormat === "image/png" || presetConfig ? "text-slate-500" : "text-slate-300"
            }`}
          >
            Max File Size (KB)
          </label>
          <input
            id="manual-kb"
            type="number"
            min={1}
            value={targetKb}
            disabled={outputFormat === "image/png" || !!presetConfig}
            onChange={(e) =>
              setTargetKb(Math.max(1, Math.floor(Number(e.target.value))))
            }
            className={`bg-slate-900/70 border rounded-xl px-3 py-2.5 text-sm transition-colors [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${
              presetConfig
                ? "border-emerald-700/50 text-emerald-300 cursor-not-allowed opacity-70"
                : outputFormat === "image/png"
                ? "border-slate-700 text-slate-600 cursor-not-allowed opacity-50"
                : "border-slate-600 hover:border-blue-500 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            }`}
          />
          {outputFormat === "image/png" && !presetConfig && (
            <p className="text-xs text-amber-400/80 leading-tight">
              PNGs are lossless (file size cannot be compressed)
            </p>
          )}
        </div>
      </div>

      {/* Aspect ratio info pill */}
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-700 bg-slate-900/60 px-3 py-1 text-xs text-slate-400">
          <span className="text-slate-500">Aspect ratio</span>
          <span className="font-semibold text-slate-200">
            {Number.isFinite(aspectRatio) ? aspectRatio.toFixed(3) : "N/A"}
          </span>
          <span className="mx-1 text-slate-700">·</span>
          <span className="text-slate-500">Output</span>
          <span className="font-semibold text-slate-200">
            {targetWidth}&times;{targetHeight}
          </span>
        </span>
      </div>

      {/* ── Dropzone ── */}
      <div
        {...getRootProps()}
        className={`group flex min-h-[160px] cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-slate-600/70 bg-slate-900/30 p-6 text-white transition hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
          isDragActive ? "border-blue-500 bg-slate-900/50" : ""
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/10 text-blue-300 shadow-inner shadow-blue-500/30">
            <Upload className="h-6 w-6 animate-pulse" />
          </div>
          <div className="text-sm text-slate-200">
            {isDragActive
              ? "Drop the image here"
              : "Drag & drop an image, or click to select"}
          </div>
          <p className="text-xs text-slate-400">
            Supported formats: JPG, PNG. Max file recommended &lt; 5 MB.
          </p>
        </div>
      </div>

      {/* ── Image editor ── */}
      {imageSrc && (
        <div className="space-y-4">

          {/* ReactCrop canvas */}
          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/40">
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
            {isRemovingBg && <AIProcessingOverlay />}
          </div>

          {/* Action row */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full flex-col gap-2 sm:w-auto">

              {/* Remove Background */}
              <button
                type="button"
                onClick={handleRemoveBackground}
                disabled={!imageSrc || isRemovingBg}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2.5 text-white shadow-lg shadow-purple-500/20 transition hover:from-indigo-500 hover:to-purple-500 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-600 disabled:opacity-50"
              >
                {removeBgStage !== "idle" && (
                  <span className="h-5 w-5 rounded-full border-2 border-transparent border-r-white border-t-white animate-spin" />
                )}
                {removeBgStage === "optimizing"
                  ? "Optimizing..."
                  : removeBgStage === "removing"
                  ? "Removing BG..."
                  : "✨ Remove Background"}
              </button>

              {/* Process */}
              <button
                type="button"
                onClick={generateCroppedImage}
                disabled={!completedCrop || processing}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-500 hover:to-blue-400 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-600 disabled:opacity-50"
              >
                {processing ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                {processing ? "Processing..." : "Process"}
              </button>
            </div>

            {/* Live size estimate badge */}
            <div className="flex flex-col items-end gap-1">
              <span className="text-xs text-slate-500 uppercase tracking-wider">
                Estimated output
              </span>
              {estimateCapped ? (
                <>
                  <span className="text-lg font-bold text-amber-400">
                    {estimatedFileSize}
                  </span>
                  <span className="text-xs font-semibold text-amber-500">
                    Max Quality Reached
                  </span>
                </>
              ) : (
                <span className="text-lg font-bold text-blue-400">
                  {estimatedFileSize}
                </span>
              )}
              <span className="text-xs text-slate-400">
                Target: {targetKb}&nbsp;KB · {targetWidth}&times;{targetHeight}px
              </span>
            </div>
          </div>

          {/* Download link */}
          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`ManualEditor_${targetWidth}x${targetHeight}.${outputFormat === "image/png" ? "png" : "jpg"}`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:shadow-[0_0_25px_rgba(59,130,246,0.65)] focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Download processed photo
            </a>
          )}

          {/* Error */}
          {error && (
            <p className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm text-rose-400">
              {error}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
