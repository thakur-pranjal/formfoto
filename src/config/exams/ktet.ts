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

export const ktetConfig: FormatConfig = {
  id: 'ktet',
  title: 'KTET 2025/2026',
  description: 'Official document formatting and upload requirements for the Kerala Teacher Eligibility Test (KTET) 2025/2026 cycle.',
  category: 'exam',
  subCategory: 'Teaching / Eligibility',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 150,  // Explicitly defined as 150 px in payload
      height: 200, // Explicitly defined as 200 px in payload
      minKb: 20,
      maxKb: 30,
      rules: {
        aspectRatio: '3:4',
        minPixels: '150 x 200',
        maxPixels: '150 x 200',
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light-coloured',
        colorMode: 'Color',
        eyePositionRule: 'Open and vivid, looking straight',
        facePosition: 'Centrally focused with both ears visible, no partial/side views',
        shadowAllowed: false,
        headwearAllowed: 'No cap or goggles allowed',
        nameAndDateStampRequired: true,
        stampPosition: 'Printed at the bottom of the photograph',
        stampFormat: 'Name and Date of Photo (DOP)',
        onlyJpgAllowed: true,
        dimensionRestrictions: 'Strictly 150 x 200 pixels for the photograph',
        commonRejectionReasons: [
          'Uploading images outside the 150x200 pixel bounds',
          'File size exceeding 30 KB',
          'Missing name/date at the bottom of the photo',
          'Harsh shadows',
          'Side profile views',
          'Wearing caps/goggles'
        ],
        expiryRecommendation: 'Valid Until: End of the application window for the current KTET cycle.'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 827,  // Calculated from 7 cm at 300 DPI
      height: 236, // Calculated from 2 cm at 300 DPI
      minKb: 20,
      maxKb: 50,
      rules: {
        minPixels: '280 x 80',
        maxPixels: '560 x 160',
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue',
        backgroundColor: 'White',
        onlyJpgAllowed: true
      }
    }
  ]
};