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

export const ugc_netConfig: FormatConfig = {
  id: 'ugc_net',
  title: 'UGC NET June 2026',
  description: 'Official document formatting configuration for the University Grants Commission National Eligibility Test (UGC NET) June 2026 application cycle.',
  category: 'exam',
  subCategory: 'Eligibility Test',
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
        colorMode: 'Colour or Black & White (both accepted)',
        minHeadSizePercent: 80,
        eyePositionRule: 'Look straight at the camera',
        facePosition: 'Centred',
        shadowAllowed: false,
        glassesAllowed: 'Spectacles allowed only if used regularly (Sunglasses not allowed)',
        headwearAllowed: false,
        namingConvention: 'Photograph',
        mandatoryLivePhotoCapture: true,
        compressionRestrictions: 'Images must be clearly legible; unclear, fabricated, or de-shaped images will be rejected',
        rejectionReasons: [
          'Unclear or fabricated photographs (hand-made, computer-made)',
          'Dark background',
          'Mask on face',
          'Wearing a cap or goggles',
          'Shadows on face',
          'Failure to complete the mandatory Live Photo capture'
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
        namingConvention: 'Signature',
        compressionRestrictions: 'Images must be clearly legible; unclear, fabricated, or de-shaped images will be rejected',
        rejectionReasons: [
          'Unclear signature',
          'Fabricated or de-shaped image'
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
        compressionRestrictions: 'Images must be clearly legible; unclear, fabricated, or de-shaped images will be rejected'
      }
    }
  ]
};