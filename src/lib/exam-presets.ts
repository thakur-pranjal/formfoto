// Exam photo presets derived for high-res 300 DPI print standards.
export interface ExamPreset {
  id: string;
  name: string;
  category: 'exam' | 'passport';
  width: number;
  height: number;
  minKB: number;
  maxKB: number;
  aspectRatio: number;
  description: string;
  supportsDate?: boolean;
  sigWidth?: number;
  sigHeight?: number;
  sigMinKB?: number;
  sigMaxKB?: number;
  sigAspectRatio?: number;
}

export const EXAM_PRESETS: ExamPreset[] = [
  {
    id: 'upsc',
    name: 'UPSC Civil Services',
    category: 'exam',
    width: 550,
    height: 550,
    minKB: 20,
    maxKB: 300,
    aspectRatio: 1,
    description: 'Passport size (350x350px min), 20-300KB. (Using higher res for clarity).',
    sigWidth: 550,
    sigHeight: 250,
    sigMinKB: 10,
    sigMaxKB: 20,
    sigAspectRatio: 550 / 250
  },
  {
    id: 'ssc',
    name: 'SSC CGL/CHSL',
    category: 'exam',
    width: 413,
    height: 531,
    minKB: 20,
    maxKB: 50,
    aspectRatio: 413 / 531,
    description: '3.5cm x 4.5cm, 20-50KB.',
    supportsDate: true,
    sigWidth: 550,
    sigHeight: 250,
    sigMinKB: 10,
    sigMaxKB: 20,
    sigAspectRatio: 550 / 250
  },
  {
    id: 'jee',
    name: 'JEE Main',
    category: 'exam',
    width: 413,
    height: 531,
    minKB: 10,
    maxKB: 200,
    aspectRatio: 413 / 531,
    description: '3.5cm x 4.5cm, 10-200KB.',
    sigWidth: 550,
    sigHeight: 200,
    sigMinKB: 4,
    sigMaxKB: 30,
    sigAspectRatio: 550 / 200
  },
  {
    id: 'neet-postcard',
    name: 'NEET UG (Postcard)',
    category: 'exam',
    width: 1181,
    height: 1772,
    minKB: 10,
    maxKB: 200,
    aspectRatio: 1181 / 1772,
    description: 'Postcard size (4x6 inches), 10-200KB.',
    sigWidth: 550,
    sigHeight: 200,
    sigMinKB: 4,
    sigMaxKB: 30,
    sigAspectRatio: 550 / 200
  },
  {
    id: 'ibps',
    name: 'IBPS PO/Clerk',
    category: 'exam',
    width: 413,
    height: 531,
    minKB: 20,
    maxKB: 50,
    aspectRatio: 413 / 531,
    description: '3.5cm x 4.5cm, 20-50KB.',
    supportsDate: true,
    sigWidth: 550,
    sigHeight: 250,
    sigMinKB: 10,
    sigMaxKB: 20,
    sigAspectRatio: 550 / 250
  },
  {
    id: 'passport',
    name: 'Generic Passport',
    category: 'passport',
    width: 413,
    height: 531,
    minKB: 50,
    maxKB: 100,
    aspectRatio: 413 / 531,
    description: 'Standard 3.5cm x 4.5cm, 50-100KB.'
  },
  {
    id: 'visa-standard',
    name: 'Visa (Standard Square)',
    category: 'passport',
    width: 600,
    height: 600,
    minKB: 60,
    maxKB: 240,
    aspectRatio: 1,
    description: 'Visa (US/Global) 2x2 inch requirements, 60-240KB range.'
  }
];
