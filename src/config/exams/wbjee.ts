import { FormatConfig } from '../formats';

export const wbjeeConfig: FormatConfig = {
  id: 'wbjee',
  title: 'WBJEE 2026',
  description: 'Easily format and resize your application photograph and signature to meet the official WBJEE 2026 upload guidelines.',
  category: 'exam',
  subCategory: 'Engineering Entrance Exam',
  documents: [
    {
      id: 'photo',
      name: 'Photograph',
      width: 413,
      height: 531,
      minKb: 10,
      maxKb: 200,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White background preferred',
        colorMode: 'Color',
        headPosition: 'Head should be in the center of the frame',
        eyePositionRule: 'Facing the camera directly',
        facePosition: 'Frontal view',
        shadowAllowed: false,
        nameAndDateStampRequired: false,
        validity: 'Recent photograph',
        uploadPortalConstraints: {
          onlyJpgAllowed: true,
          pngAllowed: false
        },
        commonRejectionReasons: [
          'Illegible or unclear images',
          'Hair falling over the face in the photograph'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413,
      height: 177,
      minKb: 4,
      maxKb: 30,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or blue pen',
        backgroundColor: 'White paper',
        uploadPortalConstraints: {
          onlyJpgAllowed: true,
          pngAllowed: false
        },
        commonRejectionReasons: [
          'Illegible or unclear images'
        ]
      }
    }
  ]
};