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

export const mht_cetConfig: FormatConfig = {
  id: 'mht_cet',
  title: 'MHT CET 2026',
  description: 'Official document formatting guidelines and requirements for the Maharashtra Common Entrance Test (MHT CET) 2026 application.',
  category: 'exam',
  subCategory: 'Engineering',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // 3.5 cm at 300 DPI
      height: 531, // 4.5 cm at 300 DPI
      minKb: 15,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Plain light colored or white',
        colorMode: 'Color',
        headSize: 'Full face portion must be visible',
        eyePosition: 'Open, level, and clearly visible',
        facePosition: 'Front view, head in the center of the frame',
        shadowAllowed: false,
        glassesAllowed: 'Permitted, but glare must be avoided. No tinted or dark glasses.',
        smileAllowed: 'Neutral expression required',
        headwearAllowed: 'Not permitted except for religious reasons',
        nameDateStampRequired: false,
        validity: 'Recent photograph taken within the last 6 months',
        commonRejectionReasons: [
          'Blurry or pixelated images',
          'File size outside the 15-50 KB range',
          'Wrong format (e.g., PNG or HEIC)',
          'Dark background',
          'Wearing sunglasses'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0, // Not specified in payload
      height: 0, // Not specified in payload
      minKb: 5,
      maxKb: 20,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black',
        backgroundColor: 'White paper',
        commonRejectionReasons: [
          'Signature in capital letters',
          'Uploading the entire A4 page instead of cropping'
        ]
      }
    }
  ]
};