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

export const keamConfig: FormatConfig = {
  id: 'keam',
  title: 'KEAM 2026',
  description: 'Official document formatting guidelines and requirements for the Kerala Engineering Architecture Medical (KEAM) 2026 application.',
  category: 'exam',
  subCategory: 'Engineering, Architecture and Medical',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 150,
      height: 200,
      minKb: 1,
      maxKb: 100,
    stampRequired: false,
      rules: {
        aspectRatio: '3:4',
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Light color background, preferably white',
        colorMode: 'Color',
        headSize: 'Front view of full face and shoulder portion must be clearly visible',
        facePosition: 'Straight and at the centre',
        glassesAllowed: 'Dark glasses not allowed',
        headwearAllowed: 'Caps or masks not allowed',
        dimensionRestrictions: 'Must strictly match 150x200 px for photo',
        commonRejectionReasons: [
          'Photo taken with mobile phone/tab',
          'Wearing mask, cap, or dark glasses',
          'Unclear or improper images'
        ],
        validUntil: 'End of admission and allotment cycle'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 150,
      height: 100,
      minKb: 1,
      maxKb: 100,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue ink',
        backgroundColor: 'Plain white sheet',
        dimensionRestrictions: 'Must strictly match 150x100 px for signature'
      }
    }
  ]
};