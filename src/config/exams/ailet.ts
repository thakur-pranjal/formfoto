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

export const ailetConfig: FormatConfig = {
  id: 'ailet',
  title: 'AILET 2026',
  description: 'Official document formatting configuration for the All India Law Entrance Test (AILET) 2026 application cycle.',
  category: 'exam',
  subCategory: 'Law Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // Standard 3.5cm width at 300 DPI fallback
      height: 531, // Standard 4.5cm height at 300 DPI fallback
      minKb: 10,
      maxKb: 1024, // 1 MB
      rules: {
        allowedFormats: ['JPG', 'JPEG', 'PNG'],
        pngAllowed: true,
        backgroundColor: 'White background',
        colorMode: 'Coloured',
        headSizePercent: 75,
        facePosition: 'Face must be clearly shown in the preview box/page',
        glassesAllowed: 'Spectacles are allowed (Goggles are not allowed)',
        headwearAllowed: 'Cap etc. not allowed',
        rejectionReasons: [
          'Face covering less than 75% of the photo',
          'Wearing a cap or goggles',
          'Uploading unclear images',
          'Mismatch in physical appearance on exam day'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 709, // 6 cm at 300 DPI
      height: 354, // 3 cm at 300 DPI
      minKb: 10,
      maxKb: 1024, // 1 MB
      rules: {
        allowedFormats: ['JPG', 'JPEG', 'PNG'],
        pngAllowed: true,
        inkColor: 'Black or Blue pen',
        backgroundColor: 'White paper sheet',
        dimensionRestrictions: 'Signature must be drawn within a 6x3 cms (width x height) box.',
        rejectionReasons: [
          'Overwriting on the signature',
          'Uploading unclear images'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression',
      width: 256, // Standard thumb impression width fallback
      height: 256, // Standard thumb impression height fallback
      minKb: 10,
      maxKb: 50,
      rules: {
        status: 'Explicitly mentioned but specifications currently omitted from official notification.'
      }
    }
  ]
};