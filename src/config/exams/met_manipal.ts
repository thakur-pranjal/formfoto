import { FormatConfig } from '../formats';

export const met_manipalConfig: FormatConfig = {
  id: 'met_manipal',
  title: 'MET Manipal 2026',
  description: 'Easily format and resize your application photograph and signature to meet the official Manipal Entrance Test (MET) 2026 upload constraints.',
  category: 'exam',
  subCategory: 'Engineering Entrance Exam',
  documents: [
    {
      id: 'photo',
      name: 'Photograph',
      width: 413,
      height: 531,
      minKb: 10,
      maxKb: 2048,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light background',
        colorMode: 'Color',
        facePosition: 'Clear front-facing',
        shadowAllowed: false,
        nameAndDateStampRequired: false,
        maxFileSizeNote: '2 MB (Some portals limit to 100 KB depending on compression step)',
        validity: 'Recent photograph (Typically taken within the last 6 months)',
        uploadPortalConstraints: {
          onlyJpgAllowed: true,
          pngAllowed: false
        },
        commonRejectionReasons: [
          'Unclear or blurry photographs',
          'Dark backgrounds',
          'Incorrect file formats'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 2048,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue pen',
        backgroundColor: 'White paper',
        maxFileSizeNote: '2 MB (Some portals limit to 100 KB)',
        dimensionNote: 'Proportional to 350x500 pixels depending on orientation',
        uploadPortalConstraints: {
          onlyJpgAllowed: true,
          pngAllowed: false
        },
        commonRejectionReasons: [
          'Unclear or blurry photographs',
          'Signatures not on white paper',
          'Incorrect file formats'
        ]
      }
    }
  ]
};