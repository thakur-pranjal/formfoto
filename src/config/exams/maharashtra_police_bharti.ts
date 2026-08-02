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

export const maharashtra_police_bhartiConfig: FormatConfig = {
  id: 'maharashtra_police_bharti',
  title: 'Maharashtra Police Bharti (Constable, Driver, SRPF) 2024-2025',
  description: 'Strict photo and signature size limits and format guidelines for the MahaIT Maharashtra Police Recruitment Portal.',
  category: 'exam',
  subCategory: 'Police',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 160,
      height: 200,
      minKb: 5,
      maxKb: 20,
    stampRequired: false,
      rules: {
        minPixels: '160 x 200 px',
        dpi: '200 DPI (Preferred)',
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Light-colored or White background',
        colorMode: 'Color',
        eyePositionRule: 'Eyes must be clearly visible',
        facePosition: 'Front-facing with a relaxed face',
        shadowAllowed: false,
        glassesAllowed: 'Permitted only if there is no glare/reflection and eyes are clearly visible. Dark glasses and sunglasses are strictly prohibited.',
        headwearAllowed: 'No (Caps, hats, and masks are prohibited. Religious headwear is allowed but must not cover the face)',
        nameAndDateStampRequired: false,
        onlyJpgAllowed: true,
        pngAllowed: false,
        compressionRestrictions: 'Must be strictly between 5 KB and 20 KB (The MahaIT portal is notoriously strict regarding this specific file size limitation).',
        dimensionRestrictions: 'Images must closely match the required pixels (Photo: 160x200 px).',
        validUntil: 'Photograph must be a recent passport-sized picture taken within the last 6 months.',
        commonRejectionReasons: [
          'Photograph or signature file size exceeding 20 KB.',
          'Photograph taken with a dark background or poor lighting.',
          'Wearing a mask, cap, or dark sunglasses.',
          'Uploading a blurry image...',
          'Signature uploaded instead of the photograph or vice-versa.'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 256,
      height: 64,
      minKb: 5,
      maxKb: 20,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ink pen',
        backgroundColor: 'White paper',
        onlyJpgAllowed: true,
        pngAllowed: false,
        compressionRestrictions: 'Must be strictly between 5 KB and 20 KB.',
        dimensionRestrictions: 'Images must closely match the required pixels (Signature: 256x64 px).',
        commonRejectionReasons: [
          'Photograph or signature file size exceeding 20 KB.',
          'Uploading a blurry image or a signature written in all capital letters.',
          'Signature uploaded instead of the photograph or vice-versa.'
        ]
      }
    }
  ]
};