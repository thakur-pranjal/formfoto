export interface FormatDocument {
  id: 'photo' | 'signature' | 'thumb_impression';
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

export const catConfig: FormatConfig = {
  id: 'cat',
  title: 'Common Admission Test (CAT)',
  description: 'Official photo and signature formatting requirements for the Common Admission Test (CAT) registration portal.',
  category: 'exam',
  subCategory: 'Management Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 354, 
      height: 531,
      minKb: 10,
      maxKb: 80,
    stampRequired: false,
      rules: {
        allowedFormats: ['.jpg', '.jpeg'],
        backgroundColor: 'White or off-white',
        colorMode: 'Color',
        maxPixels: '1200 x 1200 pixels',
        minDpi: 150,
        eyePositionRule: 'Open and clearly visible (no red-eye)',
        facePosition: 'Facing the front',
        shadowAllowed: false,
        validityRequirement: 'Photograph must not be older than 6 months from the date of application',
        commonRejectionReasons: ['Blurry image', 'Non-white background', 'Photograph older than 6 months']
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 945, 
      height: 413,
      minKb: 10,
      maxKb: 80,
    stampRequired: false,
      rules: {
        allowedFormats: ['.jpg', '.jpeg'],
        inkColor: 'Black (preferred on white paper)',
        backgroundColor: 'White',
        commonRejectionReasons: ['Illegible signature', 'Signature cropped incorrectly']
      }
    }
  ]
};