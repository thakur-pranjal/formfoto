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

export const gujcetConfig: FormatConfig = {
  id: 'gujcet',
  title: 'GUJCET 2026',
  description: 'Official document formatting guidelines and requirements for the Gujarat Common Entrance Test (GUJCET) 2026 application.',
  category: 'exam',
  subCategory: 'Entrance Exam',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 120,
      height: 120,
      minKb: 5,
      maxKb: 50,
    stampRequired: false,
      rules: {
        aspectRatio: '1:1',
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White',
        colorMode: 'Color',
        dimensionRestrictions: 'Must match 120 x 120 pixels',
        validUntil: 'End of admission cycle'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 120,
      height: 120,
      minKb: 5,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        dimensionRestrictions: 'Must match 120 x 120 pixels'
      }
    }
  ]
};