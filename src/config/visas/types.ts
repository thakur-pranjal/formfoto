export interface VisaPassportConfig {
  id: string; // e.g. "us-visa", "india-passport"
  title: string;
  country?: string; // optional when nested inside CountryVisaConfig (which owns country/countryCode)
  countryCode?: string; // e.g. "US", "IN" — optional when nested inside CountryVisaConfig
  type: "visa" | "passport";
  channel: "digital_upload" | "physical_print" | "both";
  applicableCategories?: string[];
  aspectRatio: number;
  physical: {
    widthMm: number;
    heightMm: number;
    targetDpi: number;
    paperFinish: "glossy" | "matte" | "any";
    copiesRequired: number;
    printSheetSize: "4x6" | "A4" | "10x15cm";
    backSideRequired: boolean;
    backSideInstructions?: string;
  };
  digital?: {
    minWidthPx: number;
    minHeightPx: number;
    maxWidthPx?: number;
    maxHeightPx?: number;
    minKb?: number;
    maxKb?: number;
    allowedFormats: string[];
    colorSpace?: string;
    fileNameTemplate?: string;
  };
  signature?: {
    required: boolean;
    minWidthPx?: number;
    minHeightPx?: number;
    maxKb?: number;
    inkColor?: string;
  };
  passportScan?: {
    required: boolean;
    maxKb?: number;
    allowedFormats?: string[];
  };
  background: {
    requiredHex: string;
    label: string;
  };
  biometrics: {
    headRatioMin: number;
    headRatioMax: number;
    eyeLinePercentFromBottom?: number;
    shouldersVisible: boolean;
    glassesAllowed: boolean;
    smileAllowed: boolean;
    contrastWarning: boolean;
  };
  infantRules?: {
    applicable: boolean;
    relaxedConstraints?: string;
  };
  sourceVerification: {
    authority: string;
    officialUrl: string;
    lastVerifiedDate: string;
    disclaimer: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
  };
}

/**
 * Master wrapper for a destination country's visa photo specifications.
 * A single country may have multiple distinct photo profiles
 * (e.g., consular print vs. e-Visa digital upload).
 */
export interface CountryVisaConfig {
  id: string;                     // e.g. "us-visa", "india-visa"
  country: string;                // e.g. "United States of America"
  countryCode: string;            // ISO 3166-1 alpha-2 uppercase, e.g. "US"
  defaultProfileId: string;       // must match one of profiles[].id
  profiles: VisaPassportConfig[]; // 1 or more distinct photo specifications
}
