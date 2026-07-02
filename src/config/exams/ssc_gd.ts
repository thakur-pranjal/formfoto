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

export const ssc_gdConfig: FormatConfig = {
  id: 'ssc_gd',
  title: 'SSC GD 2026',
  description: 'Official digital document and live capture requirements for the Staff Selection Commission General Duty Constable (SSC GD) 2026 application.',
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
        captureMethod: 'Captured directly via live photo module (webcam/mobile application)',
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
        changeFromPreviousYear: 'Since the transition to the new ssc.gov.in portal, candidates can no longer upload pre-scanned photograph files. A live photograph must be captured using a webcam or the official My SSC mobile application during the application process.',
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
      width: 472, // 4.0 cm converted to pixels at 300 DPI (4 / 2.54 * 300)
      height: 236, // 2.0 cm converted to pixels at 300 DPI (2 / 2.54 * 300)
      minKb: 10,
      maxKb: 20,
      rules: {
        allowedFormats: ['JPEG', 'JPG'],
        inkColor: 'Black or Blue',
        backgroundColor: 'White',
        widthAlternativeCm: 6.0, // Portal may alternatively prompt for 6.0 cm width
        dimensionRestrictions: 'Signature must fit within the specified dimensional ratio',
        noCapitalLetters: true,
        rejectionReasons: [
          'Blurred, miniature, slanted, or unreadable signature',
          'Signature done in entirely capital letters',
          'Uploading in formats other than JPEG/JPG'
        ]
      }
    }
  ]
};