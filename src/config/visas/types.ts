export interface VisaPassportConfig {
  id: string; // e.g. "us-visa", "india-passport"
  title: string;
  country: string;
  countryCode: string; // e.g. "US", "IN"
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
