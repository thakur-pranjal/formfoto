"use client";

import smartcrop from "smartcrop";
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
  Calendar,
  Type,
  Palette,
  ScanFace,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
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
  const [finalSizeKb, setFinalSizeKb] = useState<number | null>(null);  
  const [estimatedFileSize, setEstimatedFileSize] = useState("—");
  const [error, setError] = useState<string | null>(null);
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [removeBgStage, setRemoveBgStage] = useState<
    "idle" | "optimizing" | "removing"
  >("idle");

  // Background color state
  const [bgColor, setBgColor] = useState("#FFFFFF");

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
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // ── Step 1: Flood-fill background (flattens all transparency) ──────────
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // ── Step 2: Draw the cropped photo on top of the background ────────────
    const photoHeight = isStampingEnabled ? Math.round(height * 0.85) : height;
    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      width,
      photoHeight
    );

    // ── Step 3: Auto-Stamper overlay (only when enabled) ───────────────────
    if (isStampingEnabled) {
      const stripY = photoHeight;
      const stripHeight = height - photoHeight;

      // White strip for legible text
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, stripY, width, stripHeight);

      // Text
      const fontSize = Math.max(10, Math.round(stripHeight * 0.32));
      ctx.fillStyle = "#000000";
      ctx.font = `bold ${fontSize}px sans-serif`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      ctx.fillText(stampName || "Full Name", width / 2, stripY + stripHeight * 0.32);
      ctx.fillText(stampDate, width / 2, stripY + stripHeight * 0.72);
    }

    return canvas;
  }, [bgColor, completedCrop, height, isStampingEnabled, stampDate, stampName, width]);

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

    try {
      const resizedBlob = await resizeForBgRemoval(imageSrc);
      setRemoveBgStage("removing");
      const bgRemovedBlob = await removeBackground(resizedBlob);
      const dataUrl = await blobToTransparentDataUrl(bgRemovedBlob);
      setImageSrc(dataUrl);
      setCrop(undefined);
      setCompletedCrop(undefined);
      setDownloadUrl(null);
      setFinalSizeKb(null);
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
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">

        {/* ------------------------------------------------------------------ */}
        {/* LEFT COLUMN — Requirements Panel                                    */}
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
        {/* RIGHT COLUMN — Dropzone / Editor Engine                             */}
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
            <div className="flex flex-col md:flex-row gap-4 md:gap-8 w-full">
              
              {/* --- LEFT SIDE: CROP AREA --- */}
              <div className="flex flex-col gap-4 w-full flex-1">
                {/* Crop canvas */}
                <div className="relative w-full max-w-[100vw] md:max-w-2xl overflow-hidden flex justify-center rounded-2xl border border-slate-700 bg-slate-900/60 shadow-xl shadow-black/30">
                  <ReactCrop
                    crop={crop}
                    onChange={(_c, percentCrop) => setCrop(percentCrop)}
                    onComplete={(c) => setCompletedCrop(c)}
                    aspect={aspectRatio}
                    keepSelection
                    className="max-h-[60vh] w-full flex justify-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={imageSrc}
                      alt="Upload preview"
                      onLoad={onImageLoad}
                      className="max-h-[60vh] w-auto object-contain"
                    />
                  </ReactCrop>
                  {isRemovingBg && <AIProcessingOverlay />}

                  {/* Auto-Center Biometrics button — floats over the crop preview */}
                  <button
                    type="button"
                    onClick={handleSmartCrop}
                    title="Detect face and snap crop box to optimal biometric framing"
                    className="absolute right-3 top-3 inline-flex items-center gap-2 rounded-xl border border-violet-500/40 bg-slate-900/80 px-3 py-2 text-xs font-semibold text-violet-300 shadow-lg shadow-violet-500/10 backdrop-blur-sm transition hover:border-violet-400 hover:bg-violet-500/20 hover:text-violet-200 hover:shadow-violet-500/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400"
                  >
                    <ScanFace className="h-4 w-4" />
                    <span className="hidden sm:inline">Auto-Center Biometrics</span>
                  </button>
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
              </div>

              {/* --- RIGHT SIDE: CONTROLS PANEL --- */}
              <div className="w-full md:w-80 flex flex-col gap-4">
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

                {/* Name & Date Stamp toggle */}
                <div className="rounded-2xl border border-slate-700 bg-slate-800/60 px-5 py-4 shadow-lg shadow-black/20 space-y-4">
                  <label className="flex cursor-pointer items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15">
                        <Type className="h-4 w-4 text-amber-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">
                          Add Stamp
                        </p>
                        <p className="text-xs text-slate-500">Required for exams</p>
                      </div>
                    </div>
                    {/* Toggle switch */}
                    <button
                      type="button"
                      onClick={() => setIsStampingEnabled((v) => !v)}
                      className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900 ${
                        isStampingEnabled ? "bg-amber-500" : "bg-slate-600"
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <div className="relative">
                        <Type className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          placeholder="Full Name"
                          value={stampName}
                          onChange={(e) => setStampName(e.target.value)}
                          className="w-full rounded-xl border border-slate-600 bg-slate-900/70 py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500/70 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                        />
                      </div>
                      <div className="relative">
                        <Calendar className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                        <input
                          type="text"
                          placeholder="DD-MM-YYYY"
                          value={stampDate}
                          onChange={(e) => setStampDate(e.target.value)}
                          className="w-full rounded-xl border border-slate-600 bg-slate-900/70 py-2.5 pl-9 pr-3 text-sm text-slate-100 placeholder-slate-500 transition focus:border-amber-500/70 focus:outline-none focus:ring-1 focus:ring-amber-500/50"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Studio Background selector */}
                <div className="rounded-2xl border border-slate-700 bg-slate-800/60 px-5 py-4 shadow-lg shadow-black/20">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-sky-500/15">
                      <Palette className="h-4 w-4 text-sky-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">Background</p>
                      <p className="text-xs text-slate-500">Fills after BG removal</p>
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
                        className={`h-8 w-8 rounded-full border-2 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                          bgColor === color
                            ? "border-blue-400 ring-2 ring-blue-500 ring-offset-2 ring-offset-slate-800 scale-110"
                            : "border-slate-600 hover:border-slate-400 hover:scale-105"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-3">
                  <button
                    type="button"
                    onClick={handleRemoveBackground}
                    disabled={isRemovingBg}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-5 py-2.5 text-sm font-semibold text-slate-200 shadow-sm transition hover:border-purple-500/50 hover:bg-slate-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-500/25 transition hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/40 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-600 disabled:opacity-50 disabled:shadow-none"
                  >
                    {processing ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    {processing ? "Processing..." : "Process & Compress"}
                  </button>
                </div>

                {/* Pre-Flight Validation Check */}
                {downloadUrl && finalSizeKb !== null && (
                  <div className="rounded-2xl border border-emerald-500/30 bg-slate-900/80 p-5 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
                    <div className="flex items-center gap-2 mb-4">
                      <ShieldCheck className="h-5 w-5 text-emerald-400" />
                      <h3 className="text-base font-bold text-white tracking-wide">
                        Pre-Flight Check
                      </h3>
                    </div>
                    <ul className="space-y-3">
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                        <p className="text-sm text-slate-300">
                          <strong className="text-white block">Dimensions Locked:</strong> {activeDoc.width} &times; {activeDoc.height} px
                        </p>
                      </li>
                      <li className="flex items-start gap-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                        <p className="text-sm text-slate-300">
                          <strong className="text-white block">File Size Passed:</strong> {finalSizeKb} KB <span className="text-emerald-400/80 block text-xs">(Between {activeDoc.minKb}-{activeDoc.maxKb} KB)</span>
                        </p>
                      </li>
                    </ul>
                  </div>
                )}

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
              </div>

              {/* Error message */}
              {error && (
                <div className="flex items-start gap-3 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 mt-4 w-full">
                  <FileWarning className="mt-0.5 h-4 w-4 shrink-0 text-rose-400" />
                  <p className="text-sm text-rose-300">{error}</p>
                </div>
              )}
            </div>
          )}
        </section>

      </div>
    </div>
  );
}
