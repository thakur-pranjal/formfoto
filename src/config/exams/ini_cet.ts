import { FormatConfig } from '../formats';

export const ini_cetConfig: FormatConfig = {
  id: 'ini_cet',
  title: 'INI CET 2026',
  description: 'Official image upload guidelines and formatting specifications for the INI CET 2026 medical entrance examination.',
  category: 'exam',
  subCategory: 'Medical',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413,  // 3.5 cm calculated at 300 DPI
      height: 531, // 4.5 cm calculated at 300 DPI
      minKb: 50,
      maxKb: 100,
      stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG', 'GIF', 'PNG'],
        backgroundColor: 'White (Light-colored)',
        colorMode: 'Color',
        dpiRequirement: '200 dpi',
        headSizePercentage: '> 50% facial area',
        visibility: 'Full face, eyes, and ears must be clearly visible',
        eyePosition: 'Looking straight at the camera',
        facePosition: 'Frontal view',
        shadowAllowed: false,
        glassesAllowed: 'Allowed, but there must be no reflection/glare and eyes must be clearly seen. Dark/tinted glasses are prohibited.',
        smileAllowed: 'Relaxed face (neutral expression preferred)',
        headwearAllowed: 'Allowed only for religious reasons (must not cover the face). Caps and hats are not allowed.',
        stampRequired: false,
        validity: 'The uploaded scanned photograph must be recent',
        livePhotoCapture: 'Candidates are required to capture and upload a real-time live photograph via webcam or by scanning a QR code using a mobile phone during the online application process.',
        autoCropByPortal: true,
        compressionRestrictions: 'Images must not be blurred when enlarged',
        rejectionCriteria: [
          'Blurry images or poor digital resolution',
          'Colored background, improper lighting, or shadow on the face',
          'Facial area taking up less than 50% of the image',
          'Wearing dark/tinted spectacles, caps, or hair falling over the eyes',
          'Photograph taken via mobile phone camera with poor photographic skills (selfies rejected)'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 709,  // 6 cm calculated at 300 DPI
      height: 354, // 3 cm calculated at 300 DPI
      minKb: 20,
      maxKb: 100,
      stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG', 'GIF', 'PNG'],
        inkColor: 'Black or Blue ink pen (thick-tip ballpoint pen preferred)',
        backgroundColor: 'Plain white sheet',
        autoCropByPortal: true,
        compressionRestrictions: 'Images must not be blurred when enlarged',
        rejectionCriteria: [
          'Signature uploaded in CAPITAL letters or containing only initials'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Left Thumb Impression',
      width: 472,  // 4 cm calculated at 300 DPI
      height: 354, // 3 cm calculated at 300 DPI
      minKb: 10,   // Defaulted to 10 as missing in payload
      maxKb: 100,
      stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG', 'GIF', 'PNG'],
        inkColor: 'Blue or Black ink pad',
        backgroundColor: 'White sheet',
        specificRequirements: 'Left Thumb Impression Only',
        autoCropByPortal: true,
        compressionRestrictions: 'Images must not be blurred when enlarged',
        rejectionCriteria: [
          'Unclear lines of the thumb impression or smudged ink'
        ]
      }
    }
  ]
};