import { FormatConfig } from '../formats';

export const comedk_ugetConfig: FormatConfig = {
  id: 'comedk_uget',
  title: 'COMEDK UGET 2026',
  description: 'Easily format and resize your application photograph and signature to meet the official COMEDK UGET 2026 upload guidelines.',
  category: 'exam',
  subCategory: 'Engineering Entrance Exam',
  documents: [
    {
      id: 'photo',
      name: 'Photograph',
      width: 354, // 30 mm at 300 DPI
      height: 531, // 45 mm at 300 DPI
      minKb: 10,
      maxKb: 80,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPEG', 'JPG'],
        backgroundColor: 'Light background',
        colorMode: 'Color',
        headSizeRule: 'Forehead, eyes, nose, and chin must be clearly visible',
        eyePositionRule: 'Looking into the camera directly',
        facePosition: 'Full-face view',
        shadowAllowed: false,
        headwearAllowed: 'Main features of the face must not be covered by any cloth',
        nameAndDateStampRequired: false,
        validity: 'Photograph must not be older than 3 months',
        uploadPortalConstraints: {
          onlyJpgAllowed: true,
          pngAllowed: false
        },
        commonRejectionReasons: [
          'Main features of the face covered by hair, cloth, or shadow',
          'Uploading the image in a horizontal position instead of vertical',
          'Blurry or unclear images'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 945, // 80 mm at 300 DPI
      height: 413, // 35 mm at 300 DPI
      minKb: 10,
      maxKb: 80,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPEG', 'JPG'],
        inkColor: 'Black or blue pen',
        backgroundColor: 'White paper',
        uploadPortalConstraints: {
          onlyJpgAllowed: true,
          pngAllowed: false
        }
      }
    }
  ]
};