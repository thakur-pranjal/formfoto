import { FormatConfig } from '../formats';

export const htetConfig: FormatConfig = {
  id: 'htet',
  title: 'HTET 2025',
  description: 'Official document formatting and upload requirements for the Haryana Teacher Eligibility Test (HTET) 2025 cycle.',
  category: 'exam',
  subCategory: 'Teaching / Eligibility',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413,  // Calculated for 3.5 cm at 300 DPI
      height: 531, // Calculated for 4.5 cm at 300 DPI
      minKb: 20,
      maxKb: 50,
    stampRequired: false,
      rules: {
        dpiRequired: 200, // Explicitly listed in payload as 200 dpi
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light-coloured',
        colorMode: 'Color',
        headSizePercentage: 'At least 60% visibility',
        eyePositionRule: 'Look straight at the camera; eyes can be clearly seen if wearing glasses without reflections.',
        facePosition: 'Relaxed face, looking straight',
        shadowAllowed: false,
        glassesAllowed: 'Clear glasses allowed (no reflections). Dark glasses prohibited.',
        smileAllowed: 'Relaxed face required',
        headwearAllowed: 'Caps and hats prohibited. Religious headwear allowed but must not cover the face.',
        namingConvention: 'Use only alphabets and numbers (e.g., image01.jpg)',
        spacesAllowed: false,
        specialCharactersAllowed: false,
        onlyJpgAllowed: true,
        commonRejectionReasons: [
          'Unclear or smudged photograph',
          'Face not prominently visible',
          'Wearing dark glasses or caps'
        ],
        certificateRequirements: {
          format: 'PDF',
          minKb: 50,
          maxKb: 200,
    stampRequired: false,
          commonRejectionReasons: ['Blurred certificate PDFs']
        },
        expiryRecommendation: 'Valid Until: End of application and correction window (January 2026).'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,  // Not specified in official payload
      height: 0, // Not specified in official payload
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue ink pen',
        backgroundColor: 'White paper',
        namingConvention: 'Use only alphabets and numbers (e.g., image01.jpg)',
        spacesAllowed: false,
        specialCharactersAllowed: false,
        onlyJpgAllowed: true,
        commonRejectionReasons: [
          'Unclear or smudged signature',
          'Signature in capital letters'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression',
      width: 0,  // Not specified in official payload
      height: 0, // Not specified in official payload
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        colorRequirements: 'Blue or Black stamp pad on white paper (Left Hand Thumb Impression)',
        namingConvention: 'Use only alphabets and numbers (e.g., image01.jpg)',
        spacesAllowed: false,
        specialCharactersAllowed: false,
        onlyJpgAllowed: true,
        commonRejectionReasons: [
          'Unclear or smudged thumb impression'
        ]
      }
    }
  ]
};