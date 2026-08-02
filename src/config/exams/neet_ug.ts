import { FormatConfig } from '../formats';

export const neet_ugConfig: FormatConfig = {
  id: 'neet_ug',
  title: 'NEET UG 2026',
  description: 'Official document formatting specifications and compliance rules for the NEET UG 2026 medical entrance examination.',
  category: 'exam',
  subCategory: 'Medical',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413,  // 3.5 cm calculated at 300 DPI
      height: 531, // 4.5 cm calculated at 300 DPI
      minKb: 10,
      maxKb: 200,
      stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Plain White',
        colorMode: 'Color',
        headSizePercentage: 80,
        earsVisible: true,
        eyePosition: 'Eyes open, looking straight at the camera',
        facePosition: 'Frontal view',
        shadowAllowed: false,
        glassesAllowed: 'Allowed only if used regularly (no reflection or glare; tinted glasses/goggles not allowed)',
        smileAllowed: false,
        headwearAllowed: 'Allowed only for religious/cultural reasons (must not obscure the face); caps/hats not allowed',
        stampRequired: true,
        stampPosition: 'Bottom of the photograph',
        stampFormat: 'Candidate Name and Date of taking the photograph',
        validity: 'Taken on or after January 1, 2026',
        livePhotoCapture: 'Mandatory live photo capture during the registration process, cross-verified with Aadhaar records for identity authentication',
        postcardSizeAlternative: {
          width: 1200, // 4 inches at 300 DPI
          height: 1800 // 6 inches at 300 DPI
        },
        rejectionCriteria: [
          'Blurred or pixelated images',
          'Colored, patterned, or dark backgrounds',
          'Face covering less than 80% of the image frame',
          'Wearing caps, masks, or dark goggles'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 50,
      stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black',
        backgroundColor: 'White plain paper',
        handwritingStyle: 'Running handwriting',
        rejectionCriteria: [
          'Signature uploaded in block/capital letters',
          'Signature uploaded as just initials',
          'Blurred or illegible images'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Left and Right Hand Fingers and Thumb Impressions',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 200,
      stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: ['Blue', 'Black'],
        backgroundColor: 'White paper',
        coverage: 'Left and Right Hand Fingers and Thumb Impressions',
        rejectionCriteria: [
          'Unclear, smudged, or improperly scanned finger/thumb impressions',
          'Blurred images'
        ]
      }
    }
  ]
};