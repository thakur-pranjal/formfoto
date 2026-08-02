import { FormatConfig } from '../formats';

export const rajasthan_policeConfig: FormatConfig = {
  id: 'rajasthan_police',
  title: 'Rajasthan Police (Constable / Sub Inspector) 2025-2026',
  description: 'Official photo and signature upload requirements for the Rajasthan Single Sign-On (SSO) Recruitment Portal.',
  category: 'exam',
  subCategory: 'Police',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 413, // 3.5 cm calculated at 300 DPI (3.5 / 2.54 * 300)
      height: 531, // 4.5 cm calculated at 300 DPI (4.5 / 2.54 * 300)
      minKb: 50,
      maxKb: 100,
    stampRequired: false,
      rules: {
        minPixels: '240 x 320 px',
        maxPixels: '480 x 640 px (0.3 megapixels)',
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light-colored background',
        colorMode: 'Color',
        headSizePercentage: 'Face must take up at least 50% of the photograph',
        eyePositionRule: 'Eyes, nose, and chin should appear clearly',
        facePosition: 'Frontal view',
        shadowAllowed: false,
        glassesAllowed: 'Permitted only if there is no flash reflection on the lenses. Black glasses or sunglasses are strictly prohibited.',
        headwearAllowed: false,
        onlyJpgAllowed: true,
        pngAllowed: false,
        dimensionRestrictions: 'Portal enforces minimum and maximum pixel boundaries (Photo: 240x320 to 480x640 px)',
        validUntil: 'Photograph must not be older than 6 months from the date of application.',
        commonRejectionReasons: [
          'Uploading a photo or signature captured directly from a mobile phone camera or self-composed selfie.',
          'Face and head covered by hair, fabric, or headgear.',
          'Flash reflection visible on spectacles.',
          'Photo older than 6 months.'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 827, // 7.0 cm calculated at 300 DPI (7.0 / 2.54 * 300)
      height: 236, // 2.0 cm calculated at 300 DPI (2.0 / 2.54 * 300)
      minKb: 20,
      maxKb: 50,
    stampRequired: false,
      rules: {
        minPixels: '280x80 px',
        maxPixels: '560x160 px',
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or dark blue pen',
        backgroundColor: 'White paper (A4 size)',
        onlyJpgAllowed: true,
        pngAllowed: false,
        dimensionRestrictions: 'Portal enforces minimum and maximum pixel boundaries (Signature: 280x80 to 560x160 px)',
        commonRejectionReasons: [
          'Uploading a photo or signature captured directly from a mobile phone camera or self-composed selfie.',
          'Uploading someone else\'s signature.'
        ]
      }
    }
  ]
};