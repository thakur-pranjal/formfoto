"use client";

import { useState, useRef, useCallback, useEffect, useMemo, type SyntheticEvent } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  PixelCrop,
  PercentCrop,
} from "react-image-crop";
import { removeBackground } from "@imgly/background-removal";
import {
  Download,
  Upload,
  Image as ImageIcon,
  Loader2,
  ChevronDown,
} from "lucide-react";
import { EXAM_PRESETS, ExamPreset } from "@/lib/exam-presets";
import "react-image-crop/dist/ReactCrop.css";

const formatDisplayDate = (date: Date) => {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const yyyy = date.getFullYear();
  return `${dd}-${mm}-${yyyy}`;
};

const displayToInputDate = (display: string) => {
  const [dd, mm, yyyy] = display.split("-");
  if (!dd || !mm || !yyyy) return "";
  return `${yyyy}-${mm}-${dd}`;
};

const inputToDisplayDate = (input: string) => {
  if (!input) return "";
  const [yyyy, mm, dd] = input.split("-");
  if (!dd || !mm || !yyyy) return "";
  return `${dd}-${mm}-${yyyy}`;
};

function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number
): PercentCrop {
  // Start with a generous percentage width so users see most of the image by default.
  const crop = makeAspectCrop({ unit: "%", width: 90 }, aspect, mediaWidth, mediaHeight);
  return centerCrop(crop, mediaWidth, mediaHeight);
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

const canvasToBlob = (canvas: HTMLCanvasElement, type = "image/jpeg", quality = 0.92) =>
  new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error("Unable to create blob."));
      }
    }, type, quality);
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
    <p className="mt-4 text-sm font-medium tracking-wide text-white/80 animate-bounce">Processing Image...</p>
    <style jsx>{`
      @keyframes ai-shimmer {
        0% {
          transform: translateX(-150%) skewX(-12deg);
        }
        100% {
          transform: translateX(150%) skewX(-12deg);
        }
      }
    `}</style>
  </div>
);

interface PhotoEditorProps {
  mode?: "exam" | "passport" | "manual";
}

export default function PhotoEditor({ mode: pageMode }: PhotoEditorProps = {}) {
  const [category, setCategory] = useState<"exam" | "passport">(
    pageMode === "passport" ? "passport" : "exam"
  );
  const [selectedExam, setSelectedExam] = useState<ExamPreset>(EXAM_PRESETS[0]);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<PercentCrop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [processing, setProcessing] = useState(false);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showDate, setShowDate] = useState(false);
  const [dateValue, setDateValue] = useState(() => formatDisplayDate(new Date()));
  const [nameOnPhoto, setNameOnPhoto] = useState("");
  const [targetKb, setTargetKb] = useState(() => EXAM_PRESETS[0].minKB);
  const [displayTargetKb, setDisplayTargetKb] = useState(() => EXAM_PRESETS[0].minKB);
  const [estimatedFileSize, setEstimatedFileSize] = useState("—");
  const [mode, setMode] = useState<"photo" | "signature">("photo");
  const [isRemovingBg, setIsRemovingBg] = useState(false);
  const [removeBgStage, setRemoveBgStage] = useState<"idle" | "optimizing" | "removing">("idle");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const filteredPresets = useMemo(() => EXAM_PRESETS.filter((preset) => preset.category === category), [category]);
  const selectedExamCategory = selectedExam.category;

  const imgRef = useRef<HTMLImageElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const signatureAvailable =
    selectedExam.category === "exam" &&
    Boolean(
      selectedExam.sigWidth &&
        selectedExam.sigHeight &&
        selectedExam.sigMinKB &&
        selectedExam.sigMaxKB &&
        selectedExam.sigAspectRatio
    );
  const isSignatureMode = mode === "signature" && signatureAvailable;
  const activeWidth = isSignatureMode ? selectedExam.sigWidth! : selectedExam.width;
  const activeHeight = isSignatureMode ? selectedExam.sigHeight! : selectedExam.height;
  const activeMinKB = isSignatureMode ? selectedExam.sigMinKB! : selectedExam.minKB;
  const activeMaxKB = isSignatureMode ? selectedExam.sigMaxKB! : selectedExam.maxKB;
  const activeAspectRatio = isSignatureMode
    ? selectedExam.sigAspectRatio!
    : selectedExam.aspectRatio;
  const downloadSuffix = isSignatureMode ? "Signature" : "FormFoto";
  const aspectDisplay = Number.isFinite(activeAspectRatio)
    ? activeAspectRatio.toFixed(3)
    : "N/A";
  const isExamCategory = category === "exam";
  const isPassportCategory = category === "passport";

  useEffect(() => {
    const clamped = Math.min(Math.max(targetKb, activeMinKB), activeMaxKB);
    if (clamped !== targetKb) {
      setTargetKb(clamped);
      setDisplayTargetKb(clamped);
    } else {
      setDisplayTargetKb((prev) => Math.min(Math.max(prev, activeMinKB), activeMaxKB));
    }
  }, [activeMaxKB, activeMinKB, targetKb]);

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

  const handleExamChange = (id: string) => {
    const next = EXAM_PRESETS.find((preset: ExamPreset) => preset.id === id);
    if (!next) return;
    setSelectedExam(next);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setDownloadUrl(null);
    setError(null);
  };

  const handleModeChange = (nextMode: "photo" | "signature") => {
    if (nextMode === mode) return;
    if (nextMode === "signature" && !signatureAvailable) return;
    setMode(nextMode);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setDownloadUrl(null);
    setError(null);
  };

  useEffect(() => {
    return () => {
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [downloadUrl]);

  useEffect(() => {
    if (mode === "signature" && !signatureAvailable) {
      setMode("photo");
      setCrop(undefined);
      setCompletedCrop(undefined);
      setDownloadUrl(null);
      setError(null);
    }
  }, [mode, signatureAvailable]);

  useEffect(() => {
    const firstPreset = filteredPresets[0];
    if (!firstPreset) return;
    if (selectedExamCategory === category) return;
    setSelectedExam(firstPreset);
    setCrop(undefined);
    setCompletedCrop(undefined);
    setDownloadUrl(null);
    setError(null);
  }, [category, filteredPresets, selectedExamCategory]);

  useEffect(() => {
    if (category === "passport" && mode !== "photo") {
      setMode("photo");
      setCrop(undefined);
      setCompletedCrop(undefined);
      setDownloadUrl(null);
      setError(null);
    }
  }, [category, mode]);

  useEffect(() => {
    setShowDate(false);
  }, [selectedExam]);

  useEffect(() => {
    if (mode === "signature") {
      setShowDate(false);
    }
  }, [mode]);

  useEffect(() => {
    if (!imgRef.current) return;
    const { naturalWidth, naturalHeight } = imgRef.current;
    setCrop(centerAspectCrop(naturalWidth, naturalHeight, activeAspectRatio));
    setCompletedCrop(undefined);
  }, [selectedExam, mode, activeAspectRatio]);

  const onImageLoad = (e: SyntheticEvent<HTMLImageElement>) => {
    const target = e.currentTarget;
    imgRef.current = target;
    setCrop(centerAspectCrop(target.naturalWidth, target.naturalHeight, activeAspectRatio));
  };

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
      alert("Failed to remove background. Please try again.");
    } finally {
      setIsRemovingBg(false);
      setRemoveBgStage("idle");
    }
  }, [imageSrc]);

  const renderCanvas = useCallback(() => {
    if (!imgRef.current || !completedCrop) return null;
    if (!completedCrop.width || !completedCrop.height) return null;

    const canvas = document.createElement("canvas");
    canvas.width = activeWidth;
    canvas.height = activeHeight;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const image = imgRef.current;
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    const cropX = completedCrop.x * scaleX;
    const cropY = completedCrop.y * scaleY;
    const cropWidth = completedCrop.width * scaleX;
    const cropHeight = completedCrop.height * scaleY;

    ctx.drawImage(
      image,
      cropX,
      cropY,
      cropWidth,
      cropHeight,
      0,
      0,
      activeWidth,
      activeHeight
    );

    if (!isSignatureMode && showDate && selectedExam.supportsDate) {
      const stripHeight = canvas.height * 0.18;
      const stripTop = canvas.height - stripHeight;
      const centerX = canvas.width / 2;
      const trimmedName = nameOnPhoto.trim();
      const trimmedDate = (dateValue || "").trim();
      const hasName = Boolean(trimmedName);
      const hasDate = Boolean(trimmedDate);

      ctx.fillStyle = "white";
      ctx.fillRect(0, stripTop, canvas.width, stripHeight);
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (hasName && hasDate) {
        const nameFont = Math.max(canvas.height * 0.06, 11);
        ctx.font = `600 ${nameFont}px sans-serif`;
        ctx.fillText(trimmedName, centerX, stripTop + stripHeight * 0.4);

        const dateFont = Math.max(canvas.height * 0.055, 10);
        ctx.font = `500 ${dateFont}px sans-serif`;
        ctx.fillText(trimmedDate, centerX, stripTop + stripHeight * 0.78);
      } else {
        const soloFont = Math.max(canvas.height * 0.07, 12);
        ctx.font = `600 ${soloFont}px sans-serif`;
        const fallbackText = hasName
          ? trimmedName
          : hasDate
          ? trimmedDate
          : formatDisplayDate(new Date());
        ctx.fillText(fallbackText, centerX, stripTop + stripHeight / 2);
      }
    }

    return canvas;
  }, [
    activeHeight,
    activeWidth,
    completedCrop,
    dateValue,
    isSignatureMode,
    nameOnPhoto,
    selectedExam,
    showDate,
  ]);

  const findQualityForKB = useCallback(async (canvas: HTMLCanvasElement, targetKbValue: number) => {
    const toBlobAtQuality = (q: number) =>
      new Promise<Blob | null>((resolve) => canvas.toBlob((blob) => resolve(blob), "image/jpeg", q));

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

      if (sizeKb === targetKbValue || high - low < 0.02) {
        break;
      }

      if (sizeKb > targetKbValue) {
        high = mid;
      } else {
        low = mid;
      }
    }

    if (bestDiff === Number.POSITIVE_INFINITY) {
      const fallbackBlob = await toBlobAtQuality(0.1);
      const fallbackSize = fallbackBlob ? Math.max(1, Math.round(fallbackBlob.size / 1024)) : 0;
      return { quality: 0.1, sizeKb: fallbackSize };
    }

    return {
      quality: Math.max(0.1, Math.min(1, bestQuality)),
      sizeKb: bestSize,
    };
  }, []);

  const generateCroppedImage = async () => {
    if (!imgRef.current || !completedCrop) return;
    setProcessing(true);
    setError(null);

    try {
      if (isSignatureMode && !signatureAvailable) {
        throw new Error("Signature dimensions not available for this exam.");
      }
      const canvas = renderCanvas();
      if (!canvas) throw new Error("Unable to prepare preview.");

      const { quality: resolvedQuality, sizeKb } = await findQualityForKB(canvas, targetKb);

      const blob: Blob | null = await new Promise((resolve) =>
        canvas.toBlob((b) => resolve(b), "image/jpeg", resolvedQuality)
      );
      if (!blob) throw new Error("Unable to generate image blob.");

      if (sizeKb < activeMinKB || sizeKb > activeMaxKB) {
        throw new Error(
          `Output is ~${sizeKb} KB. Adjust the target slider to stay within ${activeMinKB}-${activeMaxKB} KB.`
        );
      }

      setEstimatedFileSize(`≈${sizeKb} KB`);

      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
    } catch (err) {
      setError((err as Error).message || "Failed to process image.");
    } finally {
      setProcessing(false);
    }
  };

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
        if (!cancelled) {
          setEstimatedFileSize(`≈${sizeKb} KB`);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
          setEstimatedFileSize("—");
        }
      }
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(handle);
    };
  }, [completedCrop, findQualityForKB, imageSrc, renderCanvas, targetKb]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 rounded-3xl border border-slate-700 bg-slate-800/50 p-4 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
      {!pageMode && (
        <div className="grid gap-3 sm:grid-cols-2" role="group" aria-label="Document category">
          <button
            type="button"
            aria-pressed={isExamCategory}
            onClick={() => setCategory("exam")}
            className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-400 focus-visible:ring-offset-slate-900 ${
              isExamCategory
                ? "border-blue-400 bg-gradient-to-r from-blue-600 to-blue-500 shadow-blue-500/30 shadow-xl"
                : "border-slate-700 bg-slate-900/40 text-slate-200 hover:border-blue-400/60 hover:bg-slate-900/70"
            }`}
          >
            <span className="text-3xl" aria-hidden>
              🎓
            </span>
            <div>
              <p className="text-base font-semibold">Exam / Government Form</p>
              <p className="text-xs text-slate-200">Access preset modes plus signature workflow.</p>
            </div>
          </button>
          <button
            type="button"
            aria-pressed={isPassportCategory}
            onClick={() => setCategory("passport")}
            className={`flex items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left text-white transition focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-slate-900 ${
              isPassportCategory
                ? "border-emerald-400 bg-gradient-to-r from-emerald-600 to-emerald-500 shadow-emerald-500/30 shadow-xl"
                : "border-slate-700 bg-slate-900/40 text-slate-200 hover:border-emerald-400/60 hover:bg-slate-900/70"
            }`}
          >
            <span className="text-3xl" aria-hidden>
              ✈️
            </span>
            <div>
              <p className="text-base font-semibold">Passport / Visa</p>
              <p className="text-xs text-slate-200">Square passport & visa presets, photo-only.</p>
            </div>
          </button>
        </div>
      )}

      {isExamCategory && (
        <div
          className="flex w-full gap-2 rounded-2xl border border-slate-700 bg-slate-900/60 p-1 text-sm font-semibold text-white"
          role="group"
          aria-label="Output type"
        >
          <button
            type="button"
            onClick={() => handleModeChange("photo")}
            aria-pressed={!isSignatureMode}
            className={`flex-1 rounded-xl px-4 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              !isSignatureMode
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "text-slate-300 hover:bg-slate-800/60"
            }`}
          >
            Photo
          </button>
          <button
            type="button"
            onClick={() => handleModeChange("signature")}
            aria-pressed={isSignatureMode}
            disabled={!signatureAvailable}
            title={!signatureAvailable ? "Signature requirements unavailable for this exam" : undefined}
            className={`flex-1 rounded-xl px-4 py-2 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
              isSignatureMode
                ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                : "text-slate-300 hover:bg-slate-800/60"
            } ${
              signatureAvailable ? "" : "cursor-not-allowed opacity-40 hover:bg-transparent"
            }`}
          >
            Signature
          </button>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold text-white">Photo Editor</h2>
          <p className="text-sm text-slate-400">
            Select a preset, upload your photo, crop to fit, then process to download.
          </p>
        </div>
        <div className="flex items-center gap-2 text-slate-300">
          <ImageIcon className="h-5 w-5 text-cyan-300" />
          <span className="text-sm font-medium text-white">{selectedExam.name}</span>
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium text-white">
          Preset
        </label>
        <div className="relative z-40 w-full" ref={dropdownRef}>
          {/* Trigger Button */}
          <div
            onClick={() => setIsDropdownOpen((prev) => !prev)}
            className="w-full bg-slate-800 border border-slate-700 hover:border-blue-500 rounded-xl p-4 flex justify-between items-center cursor-pointer transition-all shadow-md text-left"
          >
            <div>
              <p className="text-sm font-bold text-white">{selectedExam.name}</p>
              <span className="text-xs text-slate-400">
                {selectedExam.width}x{selectedExam.height}px · {selectedExam.minKB}-{selectedExam.maxKB} KB
              </span>
            </div>
            <ChevronDown
              className={`h-5 w-5 text-slate-400 transition-transform duration-300 ${
                isDropdownOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>

          {/* Dropdown Menu */}
          <div
            className={`absolute left-0 right-0 mt-2 bg-slate-900/80 backdrop-blur-xl border border-slate-700 rounded-xl shadow-2xl overflow-hidden z-50 transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] origin-top ${
              isDropdownOpen
                ? "opacity-100 translate-y-0 scale-100 blur-0"
                : "opacity-0 -translate-y-4 scale-95 blur-sm pointer-events-none"
            }`}
          >
            {filteredPresets.map((preset: ExamPreset) => (
              <div
                key={preset.id}
                onClick={() => {
                  handleExamChange(preset.id);
                  setIsDropdownOpen(false);
                }}
                className={`p-4 hover:bg-slate-800 cursor-pointer border-b border-slate-800/50 last:border-0 transition-colors duration-150 ${
                  preset.id === selectedExam.id ? "bg-slate-800/60" : ""
                }`}
              >
                <p className="text-sm font-semibold text-white">{preset.name}</p>
                <span className="text-xs text-slate-400">
                  {preset.width}x{preset.height}px · {preset.minKB}-{preset.maxKB} KB
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {!isSignatureMode && selectedExam.supportsDate && (
        <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-4 space-y-4">
          <div className="flex cursor-pointer items-center justify-between gap-4 select-none">
            <div>
              <p className="text-sm font-semibold text-white">Add Date of Photo (For SSC/Govt Exams)</p>
              <p className="text-xs text-slate-400">Toggle on to stamp the shooting date onto your processed photo.</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={showDate}
              onClick={() => setShowDate((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-900 ${
                showDate ? "bg-blue-500" : "bg-slate-600"
              }`}
            >
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                  showDate ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {showDate && (
            <div className="space-y-3">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-200" htmlFor="photo-name">
                  Applicant Name (Optional)
                </label>
                <input
                  id="photo-name"
                  type="text"
                  placeholder="Applicant Name (Optional)"
                  value={nameOnPhoto}
                  onChange={(event) => setNameOnPhoto(event.target.value)}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-200" htmlFor="photo-date">
                  Date of Photo
                </label>
                <input
                  id="photo-date"
                  type="date"
                  value={displayToInputDate(dateValue)}
                  onChange={(event) => {
                    const formatted = inputToDisplayDate(event.target.value);
                    setDateValue(formatted || "");
                  }}
                  className="w-full rounded-lg border border-slate-700 bg-slate-900/80 px-3 py-2 text-sm text-white focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          )}
        </div>
      )}

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
            {isDragActive ? "Drop the image here" : "Drag & drop an image, or click to select"}
          </div>
          <p className="text-xs text-slate-400">Supported formats: JPG, PNG. Max file recommended &lt; 5MB.</p>
        </div>
      </div>

      {imageSrc && (
        <div className="space-y-4">
          <div className="relative w-full overflow-hidden rounded-2xl border border-slate-700 bg-slate-900/40">
            <ReactCrop
              crop={crop}
              onChange={(_c, percentCrop) => setCrop(percentCrop)}
              onComplete={(c) => setCompletedCrop(c)}
              aspect={activeAspectRatio}
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

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full flex-col gap-2 sm:w-auto">
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
              <button
                type="button"
                onClick={generateCroppedImage}
                disabled={!completedCrop || processing}
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 px-5 py-2.5 text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-500 hover:to-blue-400 disabled:cursor-not-allowed disabled:from-slate-600 disabled:to-slate-600 disabled:opacity-50"
              >
                {processing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Download className="h-4 w-4" />}
                {processing ? "Processing..." : "Process"}
              </button>
            </div>

            <div className="text-sm text-slate-300">
              Target ({isSignatureMode ? "Signature" : "Photo"}): {activeWidth}x{activeHeight}px · {activeMinKB}-{activeMaxKB} KB · Aspect {aspectDisplay}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-700 bg-slate-900/40 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-white">
                Target Size: [ {displayTargetKb} KB ]
              </p>
              <span className="text-sm font-bold text-blue-600">{estimatedFileSize}</span>
            </div>
            <input
              type="range"
              min={activeMinKB}
              max={activeMaxKB}
              step={1}
              value={displayTargetKb}
              onChange={(event) => {
                const nextValue = Math.round(Number(event.target.value));
                setDisplayTargetKb(nextValue);
                setTargetKb(nextValue);
              }}
              disabled={!completedCrop}
              className="w-full accent-blue-500 disabled:opacity-40"
            />
            <div className="flex justify-between text-xs text-slate-400">
              <span>{activeMinKB} KB</span>
              <span>{activeMaxKB} KB</span>
            </div>
          </div>

          {downloadUrl && (
            <a
              href={downloadUrl}
              download={`${selectedExam.name.replace(/\s+/g, "_")}_${downloadSuffix}.jpg`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-blue-500 to-blue-700 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:shadow-[0_0_25px_rgba(59,130,246,0.65)] focus:outline-none focus:ring-2 focus:ring-blue-400 sm:w-auto"
            >
              <Download className="h-4 w-4" />
              Download processed {isSignatureMode ? "signature" : "photo"}
            </a>
          )}

          {error && <p className="text-sm text-rose-400">{error}</p>}
        </div>
      )}
    </div>
  );
}
