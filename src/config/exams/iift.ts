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

export const iiftConfig: FormatConfig = {
  id: 'iift',
  title: 'Indian Institute of Foreign Trade (IIFT) MBA Admission',
  description: 'Official photo and signature formatting requirements for the Indian Institute of Foreign Trade (IIFT) MBA Admission registration portal.',
  category: 'exam',
  subCategory: 'Management Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 413,
      height: 531,
      minKb: 10,
      maxKb: 100,
      rules: {
        allowedFormats: ['.jpg', '.jpeg'],
        backgroundColor: 'Light-colored, preferably white',
        colorMode: 'Color',
        eyePositionRule: 'Eyes must be clearly seen (if wearing glasses, there must be no reflections)',
        facePosition: 'Both ears must be visible',
        shadowAllowed: false,
        glassesAllowed: 'Yes, but no reflections and no dark glasses allowed',
        headwearAllowed: 'Caps and hats are not acceptable. Religious headwear is allowed but it must not cover the face.',
        validityRequirement: 'Must be a recent photograph.',
        commonRejectionReasons: [
          'Caps, goggles',
          'Dark background',
          'Mobile-clicked photos with improper backgrounds',
          'Incorrect file formats'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 945,
      height: 413,
      minKb: 10,
      maxKb: 100,
      rules: {
        allowedFormats: ['.jpg', '.jpeg'],
        inkColor: 'Black ink',
        backgroundColor: 'White paper'
      }
    }
  ]
};