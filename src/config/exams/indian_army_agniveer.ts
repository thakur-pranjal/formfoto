export interface FormatDocument {
  id: string;        // Must be 'photo', 'signature', or 'thumb_impression'
  name: string;      // E.g., 'Passport Photo', 'Signature'
  width: number;     // Integer values only. (If payload gives cm/mm, calculate pixel equivalents at 300 DPI).
  height: number;    // Integer values only.
  minKb: number;     // Integer only. Default to 10 if missing.
  maxKb: number;     // Integer only. Default to 50 if missing.
  rules?: Record<string, any>; // MAP ALL EXTRA COMPLIANCE DATA HERE (e.g., backgroundColor, glassesAllowed, stampRequired, inkColor)
}

export interface FormatConfig {
  id: string;        // Use the exact EXAM_ID from the payload.
  title: string;     // Clean display title (e.g., 'SBI PO 2026')
  description: string; // Generate a short 1-sentence SEO-friendly description.
  category: 'exam' | 'passport' | 'visa'; // Must strictly be 'exam'.
  subCategory: string; // Map based on exam type (e.g., 'Banking', 'Medical', 'UPSC', 'Defence').
  documents: FormatDocument[];
}

export const indian_army_agniveerConfig: FormatConfig = {
  id: 'indian_army_agniveer',
  title: 'Indian Army Agniveer 2026-2027',
  description: 'Comprehensive image upload requirements for the Indian Army Agniveer recruitment cycle, including strict photo and signature guidelines.',
  category: 'exam',
  subCategory: 'Defence',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 50,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Light / Plain White',
        colorMode: 'Colour',
        facePosition: 'Frontal view, face clearly visible',
        shadowAllowed: false,
        headwearAllowed: 'Not specified (Sikh candidates are generally allowed customary headwear)',
        nameAndDateStampRequired: false,
        rejectionReasons: [
          'Uploading blurred or distorted photographs',
          'Photographs not matching the candidate\'s face during Phase 1 (Online CEE) verification'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 20,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue ink (running handwriting)',
        backgroundColor: 'Plain white paper',
        rejectionReasons: [
          'Signatures written in full capital/block letters',
          'Uploading illegible scans'
        ]
      }
    }
  ]
};