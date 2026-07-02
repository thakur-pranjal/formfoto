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

export const ssc_cglConfig: FormatConfig = {
  id: 'ssc_cgl',
  title: 'SSC CGL 2026',
  description: 'Official digital document and live capture requirements for the Staff Selection Commission Combined Graduate Level (SSC CGL) 2026 application.',
  category: 'exam',
  subCategory: 'Government Jobs',
  documents: [
    {
      id: 'photo',
      name: 'Live Photograph',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 50,
      rules: {
        captureMethod: 'Live capture via webcam or official mobile app',
        uploadAllowed: false,
        backgroundColor: 'Plain light-colored or white background',
        colorMode: 'Color',
        headSizePercent: 'Face must fill the delineated camera frame',
        eyePositionRule: 'Camera at eye level, looking straight ahead',
        facePosition: 'Centered directly in front of the camera, fully inside the prescribed area',
        shadowAllowed: false,
        glassesAllowed: false,
        headwearAllowed: false,
        stampRequired: false,
        rejectionReasons: [
          'Capturing a photo of a pre-existing photograph instead of a live face',
          'Poor lighting or shadows in the live photo',
          'Wearing a cap, mask, or spectacles during live capture'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 472, // 4.0 cm converted to pixels at 300 DPI
      height: 236, // 2.0 cm converted to pixels at 300 DPI
      minKb: 10,
      maxKb: 20,
      rules: {
        allowedFormats: ['JPEG', 'JPG'],
        inkColor: 'Black or Blue',
        backgroundColor: 'White',
        noCapitalLetters: true,
        rejectionReasons: [
          'Blurred, miniature, slanted, or unreadable signature',
          'Signature done in entirely capital letters',
          'Uploading in formats other than JPEG/JPG'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression (PwD/VH)',
      width: 0, 
      height: 0,
      minKb: 10,
      maxKb: 20,
      rules: {
        allowedFormats: ['JPEG', 'JPG'],
        applicableFor: 'PwD/VH candidates'
      }
    }
  ]
};