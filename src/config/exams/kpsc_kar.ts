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

export const kpsc_karConfig: FormatConfig = {
  id: 'kpsc_kar',
  title: 'KPSC OTR 2025 - 2026',
  description: 'Official document formatting requirements for the Karnataka Public Service Commission (KPSC) 2025-2026 OTR cycle.',
  category: 'exam',
  subCategory: 'State Public Service Commission',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // 3.5 cm at 300 DPI (3.5 / 2.54 * 300 = 413.38)
      height: 531, // 4.5 cm at 300 DPI (4.5 / 2.54 * 300 = 531.49)
      minKb: 10,
      maxKb: 200,
    stampRequired: false,
      rules: {
        dpiPreferred: 200,
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Light-colored, preferably white background',
        colorMode: 'Color',
        eyePositionRule: 'Eyes must be clearly seen without squinting',
        facePosition: 'Look straight at the camera with a relaxed face',
        shadowAllowed: 'No harsh shadows',
        glassesAllowed: true,
        glassesRule: 'No flash reflections; dark glasses/sunglasses are strictly prohibited',
        smileAllowed: 'Relaxed face',
        headwearAllowed: false,
        headwearRule: 'Caps and hats are not acceptable. Religious headwear is allowed but it must not cover the face.',
        validity: 'Photograph must be a recent passport-style picture.',
        dimensionRestrictions: 'Not strictly blocked by the portal, but standard passport proportions are expected.',
        rejectionReasons: [
          'Uploading the photograph in the signature field or vice-versa',
          'Wearing dark glasses or caps',
          'Uploading an illegible/smudged image',
          'Flash reflection (red-eye) on the face or glasses'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 70,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or dark blue ink pen',
        backgroundColor: 'White paper',
        rejectionReasons: [
          'Uploading the photograph in the signature field or vice-versa',
          'Signature in block/capital letters (strictly not accepted)',
          'Uploading an illegible/smudged image'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression',
      width: 354, // 3 cm at 300 DPI (3 / 2.54 * 300 = 354.33)
      height: 354, // 3 cm at 300 DPI (3 / 2.54 * 300 = 354.33)
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        colorRequirements: 'Black or blue ink',
        rejectionReasons: [
          'Uploading an illegible/smudged image'
        ]
      }
    }
  ]
};