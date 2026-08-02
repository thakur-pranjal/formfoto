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

export const jee_mainConfig: FormatConfig = {
  id: 'jee_main',
  title: 'JEE Main 2026',
  description: 'Easily format and resize your application photograph and signature to meet the official NTA JEE Main 2026 upload guidelines.',
  category: 'exam',
  subCategory: 'Engineering Entrance Exam',
  documents: [
    {
      id: 'photo',
      name: 'Photograph',
      width: 413, 
      height: 531,
      minKb: 10,
      maxKb: 200,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Plain white',
        colorMode: 'Color',
        headSizePercentage: '80% face visible (including ears)',
        shadowAllowed: false,
        glassesAllowed: 'Allowed only if worn regularly',
        smileAllowed: false,
        headwearAllowed: 'Not allowed except for religious reasons',
        nameAndDateStampRequired: false,
        namingConvention: 'Photograph',
        validity: 'Photograph must be taken within the last 6 months',
        commonRejectionReasons: [
          'Photos with mask/cap/sunglasses',
          'Selfies or group photos',
          'Blurred/pixelated/rotated images',
          'Incorrect background',
          'Incorrect size/dimension',
          'Wrong file format',
          'Using image filters or editing software'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413,
      height: 177,
      minKb: 10,
      maxKb: 100,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Blue or black ink',
        backgroundColor: 'Plain white paper',
        namingConvention: 'Signature',
        commonRejectionReasons: [
          'Signature in capital letters/typed text/digital fonts',
          'Blurred/pixelated/rotated images',
          'Wrong file format',
          'Incorrect size/dimension'
        ]
      }
    }
  ]
};