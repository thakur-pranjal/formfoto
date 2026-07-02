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

export const ts_eamcetConfig: FormatConfig = {
  id: 'ts_eamcet',
  title: 'TG EAPCET (TS EAMCET) 2026',
  description: 'Official document formatting guidelines and requirements for the Telangana State Engineering, Agriculture and Pharmacy Common Entrance Test (TG EAPCET / TS EAMCET) 2026.',
  category: 'exam',
  subCategory: 'Engineering, Agriculture and Pharmacy',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 50,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light background',
        colorMode: 'Color',
        headSize: 'Face, eyes, nose, and hair must be clearly visible',
        eyePosition: 'Looking directly at the camera',
        facePosition: 'Frontal view (shoulders should be visible)',
        shadowAllowed: false,
        nameDateStampRequired: false,
        validUntil: 'Photograph must not be older than 6 months',
        commonRejectionReasons: [
          'Blurred or unacceptable photograph',
          'Improper background',
          'Incorrect file size',
          'Wrong document format (e.g., PNG)'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 30,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or dark blue pen',
        backgroundColor: 'Plain white paper',
        commonRejectionReasons: [
          'Blurred or unacceptable signature images',
          'Incorrect file size',
          'Wrong document format'
        ]
      }
    }
  ]
};