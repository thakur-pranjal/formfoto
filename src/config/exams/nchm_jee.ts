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

export const nchm_jeeConfig: FormatConfig = {
  id: 'nchm_jee',
  title: 'NCHM JEE 2026',
  description: 'Official document formatting configuration for the National Council for Hotel Management Joint Entrance Examination 2026 application cycle.',
  category: 'exam',
  subCategory: 'Hospitality & Hotel Administration',
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
        backgroundColor: 'White background',
        colorMode: 'Colour or Black & White',
        minHeadSizePercent: 80,
        headwearAllowed: 'Without mask',
        compressionRestrictions: "Must be clear; uploading someone else's or blurred image is treated as Unfair Means (UFM)",
        rejectionReasons: [
          'Blurred photograph',
          'Incorrect file size',
          'Face covering less than 80% of the image',
          'Wearing a mask',
          "Uploading someone else's photograph"
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
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        compressionRestrictions: "Must be clear; uploading someone else's or blurred image is treated as Unfair Means (UFM)",
        rejectionReasons: [
          'Blurred signature',
          'Incorrect file size',
          "Uploading someone else's signature"
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
        compressionRestrictions: "Must be clear; uploading someone else's or blurred image is treated as Unfair Means (UFM)"
      }
    }
  ]
};