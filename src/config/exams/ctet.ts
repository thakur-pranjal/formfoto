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

export const ctetConfig: FormatConfig = {
  id: 'ctet',
  title: 'CTET 2026',
  description: 'Official document formatting requirements for the Central Teacher Eligibility Test (CTET) September 2026 cycle.',
  category: 'exam',
  subCategory: 'Teaching / Eligibility',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413,  // 3.5 cm at 300 DPI
      height: 531, // 4.5 cm at 300 DPI
      minKb: 10,
      maxKb: 100,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Light or white',
        colorMode: 'Color',
        facePosition: 'Clear, facing forward',
        shadowAllowed: false,
        glassesAllowed: 'Advised against accessories that obscure the face',
        dimensionRestrictions: 'Strictly 3.5 x 4.5 cm',
        onlyJpgAllowed: true,
        commonRejectionReasons: [
          'Unclear images',
          'Shadows on the face or background',
          'Wearing accessories that obscure the face'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413,  // 3.5 cm at 300 DPI
      height: 177, // 1.5 cm at 300 DPI
      minKb: 3,
      maxKb: 30,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: ['Black', 'Blue'],
        backgroundColor: 'White paper',
        dimensionRestrictions: 'Strictly 3.5 x 1.5 cm',
        onlyJpgAllowed: true,
        commonRejectionReasons: [
          'Unclear images',
          'Signature written in capital letters'
        ]
      }
    }
  ]
};