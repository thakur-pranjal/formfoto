/**
 * fallbackResolver.ts
 * ---------------------------------------------------------------------------
 * Pure Fallback Engine — hydrates missing visa/passport photo specifications
 * with safe industry-standard defaults without mutating the original object.
 *
 * Usage:
 *   const { hydratedSpec, derivedFields } = resolveSpecFallbacks(config, mode);
 * ---------------------------------------------------------------------------
 */

import type { VisaPassportConfig } from "@/config/visas/types";

// ---------------------------------------------------------------------------
// Return type
// ---------------------------------------------------------------------------

export interface FallbackResult<T> {
  /** A deep-cloned copy of the spec with all missing fields hydrated. */
  hydratedSpec: T;
  /**
   * Logical field group keys that were filled by the resolver (not the
   * original spec). Consumers use this to render "Standard" badges in the UI.
   *
   * Possible values:
   *   'fileSize'      – digital.minKb / digital.maxKb
   *   'dimensions'    – digital.minWidthPx / digital.minHeightPx
   *   'facePercentage'– biometrics.headRatioMin / biometrics.headRatioMax
   *   'background'    – background.requiredHex / background.label
   *   'format'        – digital.allowedFormats
   */
  derivedFields: string[];
}

// ---------------------------------------------------------------------------
// Industry-standard fallback constants
// ---------------------------------------------------------------------------

const FALLBACK_FILE_SIZE_MIN_KB = 50;
const FALLBACK_FILE_SIZE_MAX_KB = 240;
const FALLBACK_WIDTH_PX = 600;
const FALLBACK_HEIGHT_PX = 600;
const FALLBACK_HEAD_RATIO_MIN = 0.70; // 70 % of frame height
const FALLBACK_HEAD_RATIO_MAX = 0.80; // 80 % of frame height
const FALLBACK_BACKGROUND_HEX = "#ffffff";
const FALLBACK_BACKGROUND_LABEL = "White";
const FALLBACK_FORMATS: string[] = ["jpg", "jpeg"];

// ---------------------------------------------------------------------------
// Resolver
// ---------------------------------------------------------------------------

export interface BaseSpec {
  isLiveCapture?: boolean;
  [key: string]: any;
}

/**
 * Detects whether a document specification requires live camera/webcam capture
 * instead of a pre-uploaded image file.
 *
 * Checks explicit flags, document naming (e.g. "Live Photograph", "Live Webcam Photo"),
 * captureMethod metadata, uploadAllowed restrictions, and portal policy changes.
 */
export function isLiveCaptureRequired(spec: any): boolean {
  if (!spec || typeof spec !== "object") return false;
  if (spec.isLiveCapture === true) return true;
  if (spec.isLiveCapture === false) return false;

  const name = String(spec.name || "").toLowerCase();
  const rules = spec.rules || {};
  const captureMethod = String(rules.captureMethod || "").toLowerCase();
  const allowedFormats = Array.isArray(rules.allowedFormats)
    ? rules.allowedFormats.map((f: any) => String(f).toLowerCase())
    : [];

  // 1. Explicit boolean or truthy rule flags
  if (
    rules.uploadAllowed === false ||
    rules.isLiveCapture === true ||
    rules.liveCaptureRequired === true ||
    rules.livePhotoMandatory === true ||
    rules.livePhotoCapturingMandatory === true ||
    rules.liveWebcamCaptureMandatory === true ||
    rules.mandatoryLivePhotoCapture === true
  ) {
    // If uploadAllowed is false, it's definitively live capture
    if (rules.uploadAllowed === false) return true;

    // If a live photo flag is true, verify it relates to photo capture (not signature)
    if (spec.id === "photo" || name.includes("photo") || name.includes("webcam")) {
      return true;
    }
  }

  // 2. Document name indicates live capture (e.g. "Live Photograph", "Live Webcam Photo", "Live Capture")
  if (
    name.includes("live photo") ||
    name.includes("live photograph") ||
    name.includes("live webcam") ||
    name.includes("webcam photo") ||
    name.includes("live capture") ||
    (name.includes("live") && (name.includes("cam") || name.includes("camera")))
  ) {
    return true;
  }

  // 3. captureMethod indicates live webcam / mobile app capture
  if (
    captureMethod.includes("live capture") ||
    captureMethod.includes("live webcam") ||
    captureMethod.includes("live photograph") ||
    captureMethod.includes("live photo") ||
    (captureMethod.includes("live") && (captureMethod.includes("webcam") || captureMethod.includes("mobile app") || captureMethod.includes("application")))
  ) {
    return true;
  }

  // 4. Allowed formats specifies live capture only
  if (
    allowedFormats.some(
      (f: string) => f.includes("live photo") || f.includes("live webcam") || f.includes("webcam")
    )
  ) {
    return true;
  }

  // 5. Explicit mention in strictEnforcement or changeFromPreviousYear
  const strictEnforcement = String(rules.strictEnforcement || "").toLowerCase();
  if (strictEnforcement.includes("live webcam") || strictEnforcement.includes("live photo")) {
    return true;
  }

  const changeNotice = String(rules.changeFromPreviousYear || "").toLowerCase();
  if (
    changeNotice.includes("no longer upload") ||
    changeNotice.includes("live photograph must be captured")
  ) {
    return true;
  }

  return false;
}

/**
 * Resolves missing fields in a specification by injecting safe defaults.
 * Uses `structuredClone` so the original `spec` reference is never mutated,
 * and guarantees that `isLiveCapture` is strictly preserved or automatically
 * detected from live photo / webcam requirements on the hydratedSpec.
 *
 * @param spec      - The incoming specification object.
 * @param _category - The active category, e.g. `"visa"`, `"passport"`, or `"exam"`.
 * @returns         `{ hydratedSpec, derivedFields }` — the hydrated clone and
 *                  the list of field-group keys that were injected.
 */
export function resolveSpecFallbacks<T extends BaseSpec = VisaPassportConfig>(
  spec: T,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _category?: string
): FallbackResult<T> {
  // Deep-clone: never mutate the caller's reference.
  const hydrated = structuredClone(spec) as T;
  const derivedFields: string[] = [];

  // Guarantee isLiveCapture is preserved if set, or auto-detected from metadata
  if (spec.isLiveCapture !== undefined) {
    hydrated.isLiveCapture = spec.isLiveCapture;
  } else if (isLiveCaptureRequired(spec)) {
    hydrated.isLiveCapture = true;
    derivedFields.push("liveCapture");
  }

  const isVisaPassport = (hydrated as any).type === "visa" || (hydrated as any).type === "passport";

  // ── 1. File Size & Digital Object ───────────────────────────────────────
  if (!hydrated.digital && (isVisaPassport || ((hydrated as any).minKb == null && (hydrated as any).maxKb == null && (hydrated as any).fileSize == null))) {
    (hydrated as any).digital = {
      minWidthPx: FALLBACK_WIDTH_PX,
      minHeightPx: FALLBACK_HEIGHT_PX,
      allowedFormats: [...FALLBACK_FORMATS],
    };
  }

  if (hydrated.digital) {
    const digital = hydrated.digital;

    if (digital.minKb == null || digital.maxKb == null) {
      if (digital.minKb == null) digital.minKb = FALLBACK_FILE_SIZE_MIN_KB;
      if (digital.maxKb == null) digital.maxKb = FALLBACK_FILE_SIZE_MAX_KB;
      derivedFields.push("fileSize");
    }

    // ── 2. Dimensions (digital.minWidthPx / digital.minHeightPx) ────────────
    if (digital.minWidthPx == null || digital.minHeightPx == null) {
      if (digital.minWidthPx == null) digital.minWidthPx = FALLBACK_WIDTH_PX;
      if (digital.minHeightPx == null) digital.minHeightPx = FALLBACK_HEIGHT_PX;
      derivedFields.push("dimensions");
    }

    // ── 5. Allowed Formats (digital.allowedFormats) ──────────────────────────
    if (!digital.allowedFormats || digital.allowedFormats.length === 0) {
      digital.allowedFormats = [...FALLBACK_FORMATS];
      derivedFields.push("format");
    }
  }

  // ── 3. Face / Frame Percentage (biometrics.headRatioMin / headRatioMax) ─
  if (!hydrated.biometrics && isVisaPassport) {
    (hydrated as any).biometrics = {
      headRatioMin: FALLBACK_HEAD_RATIO_MIN,
      headRatioMax: FALLBACK_HEAD_RATIO_MAX,
    };
    derivedFields.push("facePercentage");
  } else if (hydrated.biometrics) {
    if (
      hydrated.biometrics.headRatioMin == null ||
      hydrated.biometrics.headRatioMax == null
    ) {
      if (hydrated.biometrics.headRatioMin == null) {
        hydrated.biometrics.headRatioMin = FALLBACK_HEAD_RATIO_MIN;
      }
      if (hydrated.biometrics.headRatioMax == null) {
        hydrated.biometrics.headRatioMax = FALLBACK_HEAD_RATIO_MAX;
      }
      derivedFields.push("facePercentage");
    }
  }

  // ── 4. Background Color ──────────────────────────────────────────────────
  if (!hydrated.background && isVisaPassport) {
    (hydrated as any).background = {
      requiredHex: FALLBACK_BACKGROUND_HEX,
      label: FALLBACK_BACKGROUND_LABEL,
    };
    derivedFields.push("background");
  } else if (hydrated.background) {
    if (!hydrated.background.requiredHex) {
      hydrated.background.requiredHex = FALLBACK_BACKGROUND_HEX;
      derivedFields.push("background");
    }
    if (!hydrated.background.label) {
      hydrated.background.label = FALLBACK_BACKGROUND_LABEL;
      derivedFields.push("background");
    }
  }

  return { hydratedSpec: hydrated, derivedFields };
}
