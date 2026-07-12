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

export const hpscConfig: FormatConfig = {
  id: 'hpsc',
  title: 'HPSC 2026',
  description: 'Official document formatting requirements for the Haryana Public Service Commission (HPSC) 2026 examination cycle.',
  category: 'exam',
  subCategory: 'State Public Service Commission',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // 3.5 cm at 300 DPI (3.5 / 2.54 * 300 = 413.38)
      height: 531, // 4.5 cm at 300 DPI (4.5 / 2.54 * 300 = 531.49)
      minKb: 10,
      maxKb: 100,
      rules: {
        minPixels: '132 x 170 px',
        maxPixels: '160 x 204 px',
        dpi: 200,
        allowedFormats: ['JPG', 'JPEG', 'PNG'],
        backgroundColor: 'White or light background',
        colorMode: 'Color',
        headVisibility: 'Head, neck, and face must be clearly visible',
        facePosition: 'Centered and clearly visible',
        shadowAllowed: false,
        glassesAllowed: true,
        glassesRule: 'No flash reflection; safer to remove',
        validity: 'Photograph must not be older than 3 months.',
        dimensionRestrictions: 'Strictly enforced by the portal (Photo: 132-160px width by 170-204px height).',
        rejectionReasons: [
          'Uploading a photo taken on WhatsApp or saved from social media with incorrect compression',
          'Incorrect pixel dimensions (highly strict portal)',
          'Uploading blurry images',
          'Presence of shadows',
          'Flash reflection on glasses'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 140, // Provided directly in pixels, using max range value
      height: 60, // Provided directly in pixels, using max range value
      minKb: 10,
      maxKb: 50,
      rules: {
        widthRangePx: '138 px to 140 px',
        heightRangePx: '59 px to 60 px',
        allowedFormats: ['JPG', 'JPEG', 'PNG']
      }
    }
  ]
};