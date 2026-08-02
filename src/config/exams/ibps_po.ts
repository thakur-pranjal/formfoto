import { FormatConfig } from '../formats';

export const ibps_poConfig: FormatConfig = {
  id: 'ibps_po',
  title: 'IBPS PO 2026',
  description: 'Strict format and compliance specifications for uploading digital documents to the IBPS PO 2026 banking recruitment portal.',
  category: 'exam',
  subCategory: 'Banking',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 531, // Calculated from 4.5 cm at 300 DPI
      height: 413, // Calculated from 3.5 cm at 300 DPI
      minKb: 20,
      maxKb: 50,
    stampRequired: false,
      rules: {
        preferredPixels: { width: 200, height: 230 },
        minimumDpi: 200,
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Light-coloured, preferably white',
        colorMode: 'True Colour',
        eyePositionRule: 'Eyes must be clearly visible',
        facePosition: 'Look straight at the camera with a relaxed face, both ears visible',
        shadowAllowed: false,
        glassesAllowed: 'Prescription glasses allowed (without reflections). Coloured glasses or sunglasses are not allowed.',
        smileAllowed: 'Relaxed face (No extreme facial expressions)',
        headwearAllowed: 'Caps and hats are not allowed. Religious headwear is allowed but it must not cover the face.',
        liveCaptureRequired: true,
        validUntil: 'Must be a recent photograph',
        autoCropByPortal: true
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 140, // Provided pixel exact
      height: 60, // Provided pixel exact
      minKb: 10,
      maxKb: 20,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ink only',
        capitalLettersAllowed: false,
        backgroundColor: 'White paper',
        autoCropByPortal: true
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression',
      width: 354, // Calculated from 3 cm at 300 DPI
      height: 354, // Calculated from 3 cm at 300 DPI
      minKb: 20,
      maxKb: 50,
    stampRequired: false,
      rules: {
        preferredPixels: { width: 240, height: 240 },
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or blue ink',
        backgroundColor: 'White paper',
        autoCropByPortal: true
      }
    }
  ]
};