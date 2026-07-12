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

export const xatConfig: FormatConfig = {
  id: 'xat',
  title: 'Xavier Aptitude Test (XAT)',
  description: 'Official photo and signature formatting requirements for the Xavier Aptitude Test (XAT) 2026 application.',
  category: 'exam',
  subCategory: 'Management Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 200,
      height: 230,
      minKb: 20,
      maxKb: 50,
      rules: {
        allowedFormats: ['.jpg', '.jpeg'],
        backgroundColor: 'Light-colored, preferably white',
        colorMode: 'Color',
        minDpi: 200,
        eyePositionRule: 'Clearly visible, no red-eye, no reflections on glasses',
        facePosition: 'Look straight at the camera with a relaxed face',
        shadowAllowed: false,
        glassesAllowed: 'Yes, but no dark glasses and no reflections',
        headwearAllowed: 'No caps or hats. Religious headwear permitted if it does not cover the face',
        autoCropByPortal: 'Use the upload editor to adjust image to the final size',
        validityRequirement: 'Recent photograph required',
        commonRejectionReasons: ['Unclear photograph']
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 140,
      height: 60,
      minKb: 10,
      maxKb: 20,
      rules: {
        allowedFormats: ['.jpg', '.jpeg'],
        inkColor: 'Black',
        backgroundColor: 'White',
        commonRejectionReasons: ['Unclear signature', 'Mismatched signature during exam attendance']
      }
    }
  ]
};