export interface FormatDocument {
  id: 'photo' | 'signature' | 'thumb_impression';
  name: string;
  width: number;
  height: number;
  minKb: number;
  maxKb: number;
  rules?: Record<string, any>;
}

export interface FormatConfig {
  id: string;
  title: string;
  description: string;
  category: 'exam' | 'passport' | 'visa';
  subCategory: string;
  documents: FormatDocument[];
}

export const sbi_poConfig: FormatConfig = {
  id: 'sbi_po',
  title: 'SBI PO 2026',
  description: 'Strict format and compliance specifications for uploading digital documents to the SBI PO 2026 banking recruitment portal.',
  category: 'exam',
  subCategory: 'Banking',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 531, // Calculated from 4.5 cm at 300 DPI
      height: 413, // Calculated from 3.5 cm at 300 DPI
      minKb: 20,
      maxKb: 50,
    stampRequired: false,
      rules: {
        preferredPixels: { width: 200, height: 230 },
        minimumDpi: 200,
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light-coloured background',
        colorMode: 'True Colour',
        eyePositionRule: 'Eyes must be clearly visible (no "red-eye" or glass reflections)',
        facePosition: 'Look straight into the camera with a relaxed, neutral expression',
        shadowAllowed: false,
        glassesAllowed: 'Prescription glasses allowed (without reflections). Dark glasses/sunglasses not allowed.',
        smileAllowed: 'Relaxed/neutral expression',
        headwearAllowed: 'Caps and hats are not allowed. Religious headwear is allowed but it must not cover the face.',
        liveCaptureRequired: true,
        validUntil: 'Must be a recent photograph taken within the last 6 months.',
        cropRequirement: 'Crop the image in the scanner to the edge of the photograph before uploading.'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 140, // Provided preferred pixels
      height: 60, // Provided preferred pixels
      minKb: 10,
      maxKb: 20,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ink only (must NOT be in capital letters)',
        backgroundColor: 'White paper',
        cropRequirement: 'Crop the image in the scanner to the edge of the signature before uploading.'
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression',
      width: 354, // Calculated from 3 cm at 300 DPI
      height: 354, // Calculated from 3 cm at 300 DPI
      minKb: 20,
      maxKb: 50,
    stampRequired: false,
      rules: {
        preferredPixels: { width: 240, height: 240 },
        allowedFormats: ['JPG', 'JPEG'],
        cropRequirement: 'Crop the image in the scanner to the edge of the thumb impression before uploading.'
      }
    }
  ]
};