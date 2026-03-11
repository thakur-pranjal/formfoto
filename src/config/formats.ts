export interface FormatDocument {
  id: string;
  name: string;
  width: number;
  height: number;
  minKb: number;
  maxKb: number;
}

export interface FormatConfig {
  title: string;
  description: string;
  category: 'exam' | 'passport' | 'visa';
  documents: FormatDocument[];
}

export const FORMATS: Record<string, FormatConfig> = {
  'upsc': {
    title: 'UPSC Photo & Signature Resizer',
    description: 'Resize and compress your UPSC photo and signature to exact UPSC online portal specifications — instantly, in your browser.',
    category: 'exam',
    documents: [
      { id: 'photo', name: 'Passport Photo', width: 350, height: 450, minKb: 20, maxKb: 50 },
      { id: 'signature', name: 'Signature', width: 1000, height: 333, minKb: 10, maxKb: 20 },
    ],
  },
  'neet': {
    title: 'NEET Application Tools',
    description: 'Crop and compress your NEET photo, postcard photo, and signature to NTA\'s exact portal requirements.',
    category: 'exam',
    documents: [
      { id: 'photo', name: 'Passport Photo', width: 413, height: 531, minKb: 10, maxKb: 200 },
      { id: 'post-card', name: 'Postcard Size Photo', width: 400, height: 600, minKb: 10, maxKb: 200 },
      { id: 'signature', name: 'Signature', width: 350, height: 150, minKb: 4, maxKb: 30 },
    ],
  },
  'jee-main': {
    title: 'JEE Main Photo & Signature',
    description: 'Compress your JEE Main photo and signature to NTA\'s official 2026 size and file-size guidelines.',
    category: 'exam',
    documents: [
      { id: 'photo', name: 'Passport Photo', width: 350, height: 450, minKb: 10, maxKb: 200 },
      { id: 'signature', name: 'Signature', width: 350, height: 150, minKb: 10, maxKb: 100 },
    ],
  },
  'ssc': {
    title: 'SSC Photo & Signature Resizer',
    description: 'Resize your photo and signature for SSC CGL, CHSL, GD, and MTS applications to meet portal validation requirements.',
    category: 'exam',
    documents: [
      { id: 'photo', name: 'Passport Photo', width: 200, height: 230, minKb: 20, maxKb: 50 },
      { id: 'signature', name: 'Signature', width: 140, height: 60, minKb: 10, maxKb: 20 },
    ],
  },
  'ibps': {
    title: 'IBPS Bank Exam Tools',
    description: 'Prepare your photo, signature, and thumb impression for IBPS PO and Clerk applications with exact dimension and size compliance.',
    category: 'exam',
    documents: [
      { id: 'photo', name: 'Passport Photo', width: 200, height: 230, minKb: 20, maxKb: 50 },
      { id: 'signature', name: 'Signature', width: 140, height: 60, minKb: 10, maxKb: 20 },
      { id: 'thumb', name: 'Left Thumb Impression', width: 240, height: 240, minKb: 20, maxKb: 50 },
    ],
  },
  'us-visa': {
    title: 'US Visa Photo Maker',
    description: 'Create a compliant 2×2 inch US visa photo with the correct dimensions, white background, and file size limits.',
    category: 'visa',
    documents: [
      { id: 'photo', name: 'Visa Photo (2x2)', width: 600, height: 600, minKb: 50, maxKb: 240 },
    ],
  },
};