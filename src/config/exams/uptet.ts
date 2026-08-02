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

export const uptetConfig: FormatConfig = {
  id: 'uptet',
  title: 'UPTET 2026',
  description: 'Official document formatting and upload requirements for the Uttar Pradesh Teacher Eligibility Test (UPTET) 2026 cycle.',
  category: 'exam',
  subCategory: 'Teaching / Eligibility',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413,  // Calculated for Standard Passport Size (3.5cm) at 300 DPI
      height: 531, // Calculated for Standard Passport Size (4.5cm) at 300 DPI
      minKb: 20,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Light or white',
        colorMode: 'Color',
        eyePositionRule: 'Look straight at the camera; eyes can be clearly seen if wearing glasses without reflections',
        facePosition: 'Front view, looking straight with a relaxed face',
        shadowAllowed: false,
        glassesAllowed: 'Clear glasses allowed; dark glasses not acceptable',
        smileAllowed: 'Relaxed face required',
        headwearAllowed: 'Religious headwear allowed (must not cover face); caps and hats are not acceptable',
        onlyJpgAllowed: true,
        commonRejectionReasons: [
          'Unclear images',
          'Shadows on the face or background',
          'Wearing dark glasses or caps'
        ],
        documentRequirementsNote: 'Certificates must be PDF format, between 50 KB - 500 KB',
        expiryRecommendation: 'Valid Until: May 8, 2026'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,  // Not specified in official payload
      height: 0, // Not specified in official payload
      minKb: 10,
      maxKb: 20,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black',
        backgroundColor: 'White paper',
        onlyJpgAllowed: true,
        commonRejectionReasons: [
          'Unclear images',
          'Signature not done by the applicant'
        ]
      }
    }
  ]
};