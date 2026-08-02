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

export const ojeeConfig: FormatConfig = {
  id: 'ojee',
  title: 'OJEE 2026',
  description: 'Official document formatting guidelines and requirements for the Odisha Joint Entrance Examination (OJEE) 2026 application.',
  category: 'exam',
  subCategory: 'Entrance Exam',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG'],
        colorMode: 'Color',
        glassesAllowed: 'Spectacles allowed (Goggles not allowed)',
        headwearAllowed: 'No (Without cap)',
        namingConvention: 'File name should not contain any numeric value or special characters',
        specialCharactersAllowed: false,
        autoCropByPortal: 'Yes (Cropping, zooming, and preview options provided for Live Photograph)',
        mandatoryLivePhoto: 'Live Photograph upload via webcam or mobile device (QR Code Based) is now mandatory.',
        commonRejectionReasons: [
          'Polaroid photos',
          'Unclear photograph',
          'De-shaped, hand-made or computer-made fabricated photographs'
        ],
        validUntil: 'End of admission and counselling cycle'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG'],
        namingConvention: 'File name should not contain any numeric value or special characters',
        specialCharactersAllowed: false
      }
    }
  ]
};