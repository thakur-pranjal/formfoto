export interface FormatDocument {
  id: string;
  name: string;
  width: number;
  height: number;
  minKb: number;
  maxKb: number;
  rules?: Record<string, any>; // LINE FOR FUTURE EXTENSIONS: This allows for additional rules or metadata to be associated with the document format, enabling flexibility for future requirements without altering the core structure.
}

export interface FormatConfig {
  id: string;        // The unique string ID (e.g., 'ssc_cgl', 'neet_ug', 'us_visa_ds160')
  title: string;     // Display title (e.g., 'SSC CGL 2026')
  description: string;
  category: 'exam' | 'passport' | 'visa';
  subCategory: string; // Dynamic grouping (e.g., 'Banking', 'Medical', 'Engineering', 'UPSC', 'US')
  documents: FormatDocument[];
}

export { FORMATS } from './index';