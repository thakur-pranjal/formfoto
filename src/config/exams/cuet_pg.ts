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

export const cuet_pgConfig: FormatConfig = {
  id: 'cuet_pg',
  title: 'CUET PG 2026',
  description: 'Official document formatting configuration for the Common University Entrance Test (Postgraduate) 2026 application cycle.',
  category: 'exam',
  subCategory: 'Postgraduate Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // Standard 3.5cm width at 300 DPI fallback
      height: 531, // Standard 4.5cm height at 300 DPI fallback
      minKb: 10,
      maxKb: 200,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or very light-coloured',
        colorMode: 'Black & White or Colour',
        minHeadSizePercent: 80,
        facePosition: 'Centred',
        shadowAllowed: false,
        sunglassesAllowed: false,
        headwearAllowed: false,
        compressionRestrictions: 'Must be clearly legible/identifiable; blurred images fail validation',
        rejectionReasons: [
          'Blurred or unidentifiable photograph',
          'Incorrect file size',
          'Dark or shadowed background',
          'Face covering less than 80% of the image',
          'Wearing a mask, cap, or sunglasses'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 256, // Standard signature width fallback
      height: 64, // Standard signature height fallback
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or dark blue ink',
        backgroundColor: 'White paper',
        compressionRestrictions: 'Must be clearly legible/identifiable; blurred images fail validation',
        rejectionReasons: [
          'Signature in capital letters',
          'Smudged signature',
          'Blurred or unidentifiable signature',
          'Incorrect file size'
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
    stampRequired: false,
      rules: {
        status: 'Explicitly mentioned but specifications currently omitted from official notification.',
        compressionRestrictions: 'Must be clearly legible/identifiable; blurred images fail validation'
      }
    }
  ]
};