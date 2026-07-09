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

export const bihar_stetConfig: FormatConfig = {
  id: 'bihar_stet',
  title: 'Bihar STET 2024',
  description: 'Official document formatting and upload requirements for the Bihar State Teacher Eligibility Test (STET) 2024 cycle.',
  category: 'exam',
  subCategory: 'Teaching / Eligibility',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413,  // 3.5 cm at 300 DPI
      height: 531, // 4.5 cm at 300 DPI
      minKb: 20,
      maxKb: 100,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or Light-coloured background',
        colorMode: 'Color',
        eyePositionRule: 'Must look straight at the lens; no red-eye effect.',
        facePosition: 'Clear, unobstructed frontal view',
        shadowAllowed: false,
        glassesAllowed: 'Clear glasses allowed; dark glasses or tinted lenses prohibited',
        headwearAllowed: 'Prohibited (except for religious headwear, provided it does not obscure the face)',
        onlyJpgAllowed: true,
        documentRequirements: {
          format: 'PDF',
          minKb: 50,
          maxKb: 150
        },
        commonRejectionReasons: [
          'Photo with dark background',
          'Wearing dark glasses/caps',
          'Unclear or blurry face'
        ],
        expiryRecommendation: 'Valid Until: End of application/correction window for the STET 2024 cycle.'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,  // Not specified in official payload
      height: 0, // Not specified in official payload
      minKb: 10,
      maxKb: 50,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue ink',
        backgroundColor: 'White paper',
        onlyJpgAllowed: true,
        commonRejectionReasons: [
          'Signature done in block/capital letters',
          'Uploading someone else\'s documents'
        ]
      }
    }
  ]
};