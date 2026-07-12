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

export const snapConfig: FormatConfig = {
  id: 'snap',
  title: 'Symbiosis National Aptitude Test (SNAP)',
  description: 'Official photograph formatting and upload requirements for the Symbiosis National Aptitude Test (SNAP) registration portal.',
  category: 'exam',
  subCategory: 'Management Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 413, 
      height: 531, 
      minKb: 10,
      maxKb: 5120,
      rules: {
        allowedFormats: ['.jpg', '.jpeg', '.png', '.gif'],
        backgroundColor: 'White preferred',
        colorMode: 'Color',
        eyePositionRule: 'Clearly visible (no sunglasses allowed)',
        glassesAllowed: 'No sunglasses allowed (regular spectacles not explicitly restricted)',
        headwearAllowed: 'No caps or headgear allowed',
        autoCompression: 'The portal automatically resizes/compresses photos larger than 100 KB',
        validityRequirement: 'Photograph must not be older than 6 months from the date of application',
        commonRejectionReasons: [
          'Black and white photograph uploaded',
          'Wearing caps/sunglasses/headgear',
          'Photograph older than 6 months'
        ]
      }
    }
  ]
};