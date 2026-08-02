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

export const delhi_police_constableConfig: FormatConfig = {
  id: 'delhi_police_constable',
  title: 'Delhi Police Constable (Executive) 2025',
  description: 'Strict format guidelines and live photo requirements for the SSC Delhi Police Constable Executive 2025 examination.',
  category: 'exam',
  subCategory: 'Police',
  documents: [
    {
      id: 'photo',
      name: 'Live Photograph',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['Live Photo'],
        backgroundColor: 'Plain / Light background',
        colorMode: 'Color',
        headSizePercentage: 'Face must fully occupy the red rectangular area delineated by the camera',
        eyePositionRule: 'Eye level, looking straight ahead into the camera',
        facePosition: 'Full-frontal view, positioned directly in front of the camera',
        shadowAllowed: false,
        glassesAllowed: false,
        smileAllowed: 'Natural expression recommended',
        headwearAllowed: false,
        nameAndDateStampRequired: false,
        captureMethod: 'Live Photograph using a computer webcam or the official SSC mobile app',
        autoCropByPortal: 'Application module provides a red rectangular area for live face alignment',
        commonRejectionReasons: [
          'Capturing a photograph of a pre-existing printed photograph instead of a live person.',
          'Wearing spectacles, a cap, or a mask during live photo capture.',
          'Photograph taken in poor lighting or without a plain background.'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 709, // 6.0 cm calculated at 300 DPI (6.0 / 2.54 * 300)
      height: 236, // 2.0 cm calculated at 300 DPI (2.0 / 2.54 * 300)
      minKb: 10,
      maxKb: 20,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPEG', 'JPG'],
        inkColor: 'Black or Blue ink',
        backgroundColor: 'White paper',
        onlyJpgAllowed: true,
        pngAllowed: false,
        dimensionRestrictions: 'Signature must not be miniature and must occupy at least 80% of the box',
        compressionRestrictions: 'Signature must be strictly between 10 KB and 20 KB',
        commonRejectionReasons: [
          'Miniature signature (signature taking up less than 80% of the provided space).',
          'Signature that is blurred, cropped too tightly, or illegible.'
        ]
      }
    }
  ]
};