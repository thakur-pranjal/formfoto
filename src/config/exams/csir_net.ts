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

export const csir_netConfig: FormatConfig = {
  id: 'csir_net',
  title: 'Joint CSIR-UGC NET June 2026',
  description: 'Official document formatting configuration for the Joint CSIR-UGC NET June 2026 application cycle.',
  category: 'exam',
  subCategory: 'Eligibility Test & Junior Research Fellowship',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // Standard 3.5cm width at 300 DPI fallback
      height: 531, // Standard 4.5cm height at 300 DPI fallback
      minKb: 10,
      maxKb: 200,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White background',
        colorMode: 'Colour or Black & White',
        minHeadSizePercent: 80,
        eyePositionRule: 'Look straight at the camera',
        facePosition: 'Centred',
        shadowAllowed: false,
        glassesAllowed: 'Spectacles allowed only if used regularly (no glare); Sunglasses not allowed',
        headwearAllowed: 'No mask, cap, or hat (religious headwear permitted but face must be fully visible)',
        compressionRestrictions: 'Must be clearly legible/identifiable; blurred images will lead to rejection',
        rejectionReasons: [
          'Blurred photograph',
          'Incorrect file size',
          'Colored or dark background',
          'Wearing a mask, cap, or sunglasses'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 256, // Standard signature width fallback
      height: 64, // Standard signature height fallback
      minKb: 4,
      maxKb: 30,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue ink',
        backgroundColor: 'White paper',
        compressionRestrictions: 'Must be clearly legible/identifiable; blurred images will lead to rejection',
        rejectionReasons: [
          'Blurred signature',
          'Incorrect file size',
          'Signature in all capital letters',
          'Smudged signature'
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
        status: 'Explicitly mentioned but specifications currently omitted from official notification.',
        compressionRestrictions: 'Must be clearly legible/identifiable; blurred images will lead to rejection'
      }
    }
  ]
};