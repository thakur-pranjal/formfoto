export interface FormatDocument {
  id: string;
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

export const jee_advancedConfig: FormatConfig = {
  id: 'jee_advanced',
  title: 'JEE Advanced 2026',
  description: 'Strictly format your photograph and signature to meet the official JEE Advanced 2026 upload constraints.',
  category: 'exam',
  subCategory: 'Engineering Entrance Exam',
  documents: [
    {
      id: 'photo',
      name: 'Photograph',
      width: 0, 
      height: 0, 
      minKb: 4,
      maxKb: 100,
      rules: {
        allowedFormats: ['JPG'],
        uploadPortalConstraints: {
          onlyJpgAllowed: true
        }
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 1,
      maxKb: 30,
      rules: {
        allowedFormats: ['JPG'],
        uploadPortalConstraints: {
          onlyJpgAllowed: true
        }
      }
    }
  ]
};