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

export const neet_pgConfig: FormatConfig = {
  id: 'neet_pg',
  title: 'NEET PG 2026',
  description: 'Official document formatting specifications and compliance rules for the NEET PG 2026 medical entrance examination.',
  category: 'exam',
  subCategory: 'Medical',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413,  // 3.5 cm calculated at 300 DPI
      height: 531, // 4.5 cm calculated at 300 DPI
      minKb: 10,
      maxKb: 80,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White',
        expression: 'Neutral, non-smiling',
        eyes: 'Open and directed at the camera',
        coverage: 'Full face, ears, neck, and shoulders',
        shadowAllowed: false,
        selfieAllowed: false,
        lighting: 'Bright light, avoid flash to prevent shadows',
        validity: 'Not older than three months',
        rejectionCriteria: [
          'Blurred or pixelated images',
          'Colored or dark backgrounds',
          'Image includes other objects or additional people',
          'Parts of the body below shoulders visible'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413,  // 3.5 cm calculated at 300 DPI
      height: 177, // 1.5 cm calculated at 300 DPI
      minKb: 10,
      maxKb: 80,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Blank white page without lines',
        inkColor: ['Blue', 'Black'],
        capitalLettersAllowed: false,
        initialsAllowed: false,
        author: 'Must be done by the candidate only',
        rejectionCriteria: [
          'Signatures in CAPITALS (UPPER CASE letters)',
          'Signature uploaded as just initials',
          'Shadow of hands/camera/smartphone falling on the sheet'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Left Thumb Impression',
      width: 413,  // 3.5 cm calculated at 300 DPI
      height: 177, // 1.5 cm calculated at 300 DPI
      minKb: 10,
      maxKb: 80,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Blank white page without lines',
        inkColor: ['Blue', 'Black'],
        finger: 'Left thumb only',
        clarity: 'Finger prints must be clearly visible, do not press too hard',
        hennaAllowed: false,
        rejectionCriteria: [
          'Unclear, smudged, or improperly scanned thumb impressions',
          'Applying henna, colour, ink, paint or any other substance on fingers',
          'Shadow of hands/camera/smartphone falling on the sheet'
        ]
      }
    }
  ]
};