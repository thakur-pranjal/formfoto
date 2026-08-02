import { FormatConfig } from '../formats';

export const bpscConfig: FormatConfig = {
  id: 'bpsc',
  title: 'BPSC 70th CCE',
  description: 'Official document formatting requirements for the Bihar Public Service Commission (BPSC) 70th CCE examination.',
  category: 'exam',
  subCategory: 'State Public Service Commission',
  documents: [
    {
      id: 'photo',
      name: 'Live Webcam Photo',
      width: 0,
      height: 0,
      minKb: 15,
      maxKb: 25,
    stampRequired: false,
      rules: {
        captureMethod: 'Live webcam capture is the primary requirement',
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Plain white or light-colored background',
        colorMode: 'Color',
        eyePositionRule: 'Eyes open, looking straight at the webcam',
        facePosition: 'Centered and strictly frontal',
        shadowAllowed: false,
        glassesAllowed: false,
        headwearAllowed: false,
        prohibitedAccessories: ['caps', 'masks', 'mufflers'],
        rejectionReasons: [
          'Unclear, unreadable, or blank photo uploads',
          'Presence of shadows on the face or background',
          'Wearing glasses, caps, masks, or mufflers during live webcam capture'
        ],
        strictEnforcement: 'Strict enforcement of live webcam photo capture with clear instructions against wearing accessories like glasses or masks'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 220,
      height: 100,
      minKb: 10,
      maxKb: 15,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ink',
        backgroundColor: 'White paper',
        signatureRequirement: 'Both English and Hindi signatures required',
        dimensionRestrictions: 'Signature must be strictly 220x100 px',
        rejectionReasons: [
          'Unclear, unreadable, or blank signature uploads'
        ]
      }
    }
  ]
};