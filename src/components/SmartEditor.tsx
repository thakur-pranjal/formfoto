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
  Loader2,
  UploadCloud,
  CheckCircle2,
  ShieldCheck,
  FileWarning,
  Sparkles,
} from "lucide-react";
import { type FormatConfig } from "@/config/formats";
import "react-image-crop/dist/ReactCrop.css";

// ---------------------------------------------------------------------------
// Helpers (mirrored from PhotoEditor to keep this component self-contained)
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

const compositeTransparentOnWhite = async (blob: Blob) => {
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
// Sub-components
// ---------------------------------------------------------------------------

const AIProcessingOverlay = () => (
  <div className="absolute inset-0 z-50 flex flex-col items-center justify-center overflow-hidden bg-black/40 backdrop-blur-sm">
    <div className="pointer-events-none absolute inset-0">
      <div
        className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-70"
        style={{ animation: "smart-shimmer 2.8s linear infinite" }}
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
  const activeDoc = config.documents[activeDocIndex];
  const { width, height, minKb, maxKb, name: docName } = activeDoc;
  const aspectRatio = width / height;

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<PercentCrop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [targetKb, setTargetKb] = useState<number>(minKb);
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [estimatedFileSize, setEstimatedFileSize] = useState("â€”");
  const [error, setError] = useState<string | null>(null);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [removeBgStage, setRemoveBgStage] = useState<
    "idle" | "optimizing" | "removing"
  >("idle");

  const imgRef = useRef<HTMLImageElement | null>(null);

  // Reset workspace and re-lock engine when the user switches tabs
  useEffect(() => {
    setImageSrc(null);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setDownloadUrl(null);
    setError(null);
    setEstimatedFileSize("â€”");
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
    canvas.width = width;
    canvas.height = height;
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
      width,
      height
    );

    return canvas;
  }, [completedCrop, height, width]);

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
      setEstimatedFileSize(imageSrc ? "Awaiting crop..." : "â€”");
      return;
    }

    setEstimatedFileSize("Estimating...");
    let cancelled = false;
    const handle = window.setTimeout(async () => {
      const canvas = renderCanvas();
      if (!canvas) {
        if (!cancelled) setEstimatedFileSize("â€”");
        return;
      }
      try {
        const { sizeKb } = await findQualityForKB(canvas, targetKb);
        if (!cancelled) setEstimatedFileSize(`â‰ˆ${sizeKb} KB`);
      } catch {
        if (!cancelled) setEstimatedFileSize("â€”");
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [completedCrop, findQualityForKB, imageSrc, renderCanvas, targetKb]);

  // -------------------------------------------------------------------------
  // Remove background
  // -------------------------------------------------------------------------

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
          `Output is ~${sizeKb} KB, outside the required ${minKb}â€“${maxKb} KB range. Try adjusting the slider.`
        );
      }

      setEstimatedFileSize(`â‰ˆ${sizeKb} KB`);
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError((err as Error).message || "Failed to process image.");
    } finally {
      setProcessing(false);
    }
  };

  // -------------------------------------------------------------------------
  // Render
  // -------------------------------------------------------------------------

  return (
    <div className="w-full max-w-6xl mx-auto">
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

        {/* ------------------------------------------------------------------ */}
        {/* LEFT COLUMN â€” Requirements Panel                                    */}
        {/* ------------------------------------------------------------------ */}
        <aside className="lg:col-span-5 flex flex-col gap-4">

          {/* Header */}
          <div>
            <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue-400">
              Configuration
            </p>
            <h2 className="text-2xl font-bold text-white">Official Requirements</h2>
            <p className="mt-1 text-sm text-slate-400">
              All parameters are locked by the engine. Your output is guaranteed
              to meet every specification below.
            </p>
          </div>

          {/* Document tabs */}
          {config.documents.length > 1 && (
            <div className="flex flex-wrap gap-2 rounded-2xl border border-slate-700/60 bg-slate-800/40 p-2">
              {config.documents.map((doc, index) => (
                <button
                  key={doc.id}
                  type="button"
                  onClick={() => setActiveDocIndex(index)}
                  className={`flex-1 rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    activeDocIndex === index
                      ? "bg-blue-600 text-white shadow-md shadow-blue-500/25"
                      : "text-slate-400 hover:bg-slate-700/60 hover:text-slate-200"
                  }`}
                >
                  {doc.name}
                </button>
              ))}
            </div>
          )}

          {/* Checklist card */}
          <div className="flex-1 rounded-2xl border border-slate-700/80 bg-slate-800/60 p-5 shadow-xl shadow-black/30 backdrop-blur-sm">
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-white">Exact Dimensions</p>
                  <p className="mt-0.5 font-mono text-sm text-slate-300">
                    {width}&thinsp;&times;&thinsp;{height}&thinsp;px
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-white">File Size Range</p>
                  <p className="mt-0.5 font-mono text-sm text-slate-300">
                    {minKb}&thinsp;KB &ndash; {maxKb}&thinsp;KB
                  </p>
                </div>
              </li>

              <li className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
                <div>
                  <p className="text-sm font-semibold text-white">Allowed Formats</p>
                  <p className="mt-0.5 text-sm text-slate-300">JPG, PNG</p>
                </div>
              </li>

              <li className="flex items-start gap-3 pt-3 mt-1 border-t border-slate-700/60">
                <FileWarning className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" />
                <div>
                  <p className="text-sm font-semibold text-white">Aspect Ratio Locked</p>
                  <p className="mt-0.5 font-mono text-sm text-slate-300">
                    {(width / height).toFixed(3)}:1 &mdash; enforced by the crop engine
                  </p>
                </div>
              </li>
            </ul>
          </div>

          {/* Trust box */}
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-4">
            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-emerald-400" />
            <div>
              <p className="text-sm font-semibold text-white">100% Private</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-400">
                Processed locally on your device. Zero server uploads. Your photo
                never leaves your browser.
              </p>
            </div>
          </div>
        </aside>

        {/* ------------------------------------------------------------------ */}
        {/* RIGHT COLUMN â€” Dropzone / Editor Engine                             */}
        {/* ------------------------------------------------------------------ */}
        <section className="lg:col-span-7 flex flex-col gap-5">

          {!imageSrc ? (
            /* -------- Pre-upload: premium dropzone -------- */
            <div
              {...getRootProps()}
              className={`group relative flex min-h-[420px] flex-1 cursor-pointer flex-col items-center justify-center gap-5 rounded-2xl border-2 border-dashed p-10 text-center transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                isDragActive
                  ? "border-blue-400 bg-blue-500/10 shadow-[0_0_60px_rgba(59,130,246,0.2)]"
                  : "border-slate-700 bg-slate-800/40 shadow-xl shadow-black/30 hover:border-blue-500/60 hover:bg-slate-800/70 hover:shadow-blue-500/10"
              }`}
            >
              <input {...getInputProps()} />

              {isDragActive && (
                <div className="pointer-events-none absolute inset-0 rounded-2xl ring-2 ring-inset ring-blue-400/40" />
              )}

              {/* Icon */}
              <div
                className={`flex h-24 w-24 items-center justify-center rounded-full border transition-all duration-300 ${
                  isDragActive
                    ? "border-blue-400/40 bg-blue-500/20 shadow-[0_0_40px_rgba(59,130,246,0.35)]"
                    : "border-slate-700 bg-slate-900 shadow-inner shadow-black/50 group-hover:border-blue-500/40 group-hover:bg-slate-800"
                }`}
              >
                <UploadCloud
                  className={`h-11 w-11 transition-all duration-300 ${
                    isDragActive
                      ? "text-blue-300 scale-110"
                      : "text-slate-500 group-hover:text-blue-400"
                  }`}
                  strokeWidth={1.5}
                />
              </div>

              {/* Copy */}
              <div className="max-w-sm space-y-2">
                <p className="text-xl font-semibold text-white">
                  {isDragActive
                    ? "Release to begin processing"
                    : `Upload your ${docName} here`}
                </p>
                <p className="text-sm leading-relaxed text-slate-400">
                  {isDragActive
                    ? "Engine ready - auto-crop will be applied instantly."
                    : `Auto-crop and compress to ${width}x${height} px under ${maxKb} KB - portal-ready in seconds.`}
                </p>
              </div>

              {/* Browse hint */}
              {!isDragActive && (
                <span className="rounded-lg border border-slate-700 bg-slate-900/70 px-4 py-2 text-xs font-medium text-slate-400 transition group-hover:border-blue-500/40 group-hover:text-blue-300">
                  Or click to browse files
                </span>
              )}
            </div>
          ) : (
            /* -------- Post-upload: crop + controls -------- */
            <>
              {/* Crop canvas */}
              <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/60 shadow-xl shadow-black/30">
                <ReactCrop
                  crop={crop}
                  onChange={(_c, percentCrop) => setCrop(percentCrop)}
                  onComplete={(c) => setCompletedCrop(c)}
                  aspect={aspectRatio}
                  keepSelection
                  className="max-h-[60vh]"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imageSrc}
                    alt="Upload preview"
                    onLoad={onImageLoad}
                    className="max-h-[60vh] w-full object-contain"
                  />
                </ReactCrop>
                {isRemovingBg && <AIProcessingOverlay />}
              </div>

              {/* Re-upload nudge */}
              <div
                {...getRootProps()}
                className="flex cursor-pointer items-center gap-2 self-start rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs text-slate-400 transition hover:border-blue-500/40 hover:text-blue-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
              >
                <input {...getInputProps()} />
                <UploadCloud className="h-3.5 w-3.5" />
                Replace photo
              </div>

              {/* Target size slider */}
              <div className="rounded-2xl border border-slate-700 bg-slate-800/60 px-5 py-4 shadow-lg shadow-black/20">
                <div className="mb-4 flex items-center justify-between gap-4">
                  <div className="space-y-0.5">
                    <p className="text-sm font-semibold text-white">Target File Size</p>
                    <p className="text-xs text-slate-500">
                      Locked between {minKb}&thinsp;KB and {maxKb}&thinsp;KB
                    </p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-blue-500/15 px-3 py-1.5 font-bold text-xl text-blue-300">
                    {targetKb} KB
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
                  className="w-full accent-blue-500 disabled:opacity-40"
                />

                <div className="mt-1.5 flex justify-between text-xs text-slate-500">
                  <span>{minKb}&thinsp;KB</span>
                  <span>{maxKb}&thinsp;KB</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleRemoveBackground}
                  disabled={isRemovingBg}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-200 shadow-sm transition hover:border-purple-500/50 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {removeBgStage !== "idle" ? (
                    <span className="h-4 w-4 rounded-full border-2 border-transparent border-r-white border-t-white animate-spin" />
                  ) : (
                    <Sparkles className="h-4 w-4" />
                  )}
                  {removeBgStage === "optimizing"
                    ? "Optimizing..."
                    : removeBgStage === "removing"
                    ? "Removing BG..."
                    : "Remove Background"}
                </button>

                <button
                  type="button"
                  onClick={generateCroppedImage}
                  disabled={!completedCrop || processing}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-600 disabled:opacity-50 disabled:shadow-none"
                >
                  {processing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  {processing ? "Processing..." : "Process & Compress"}
                </button>
              </div>

              {/* Download link */}
              {downloadUrl && (
                <a
                  href={downloadUrl}
                  download={`${config.title.replace(/\s+/g, "_")}_${activeDoc.id}_FormFoto.jpg`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/25 transition hover:shadow-[0_0_28px_rgba(16,185,129,0.5)] focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
                >
                  <Download className="h-4 w-4" />
                  Download {docName}
                </a>
              )}

              {/* Error message */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3">
                  <FileWarning className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                  <p className="text-sm text-rose-300">{error}</p>
                </div>
              )}
            </>
          )}
        </section>

      </div>
    </div>
  );
}
