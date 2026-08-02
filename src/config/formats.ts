export interface FormatDocument {
  id: string;
  name: string;
  width: number;
  height: number;
  minKb: number;
  maxKb: number;
  /** When true, the Add-Stamp UI panel is shown and the canvas stamper is active. */
  stampRequired: boolean;
  rules?: Record<string, any>; // Dynamically captures compliance metadata (bg, ink, stamp, etc.)
}

export interface FormatConfig {
  id: string;                  // Matches the 'id' field generated in your 25 files
  title: string;
  description: string;
  category: 'exam' | 'passport' | 'visa';
  subCategory?: string;        // Safely handles the custom categories like 'Engineering Entrance Exam'
  documents: FormatDocument[];
}

export { FORMATS } from './index';