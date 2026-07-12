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

export const tnpscConfig: FormatConfig = {
  id: 'tnpsc',
  title: 'TNPSC OTR 2026',
  description: 'Official document formatting requirements for the Tamil Nadu Public Service Commission (TNPSC) 2026 OTR cycle.',
  category: 'exam',
  subCategory: 'State Public Service Commission',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // 3.5 cm at 300 DPI (3.5 / 2.54 * 300 = 413.38)
      height: 531, // 4.5 cm at 300 DPI (4.5 / 2.54 * 300 = 531.49)
      minKb: 20,
      maxKb: 50,
      rules: {
        dpiRequirement: 200,
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Plain white or very light-colored background',
        colorMode: 'Color',
        headSizePercentage: 'Face should occupy about 50% of the area',
        eyePositionRule: 'Eyes must be open and clearly visible',
        facePosition: 'Full-face view looking directly into the camera',
        shadowAllowed: false,
        glassesAllowed: true,
        glassesRule: 'Only clear glasses permitted; glare on glasses must be avoided; tinted/dark glasses are strictly prohibited',
        smileAllowed: 'Natural expression (no grinning, frowning, or raised eyebrows)',
        headwearAllowed: false,
        headwearRule: 'Main features must not be covered by any cloth or hair',
        stampRequired: true,
        stampPosition: 'Printed at the bottom of the photograph',
        stampFormat: "Candidate's Name and Date of taking the photograph",
        validity: 'Photograph must not be older than 3 months (recently taken).',
        rejectionReasons: [
          "Missing the candidate's name and date of photo printed at the bottom",
          'Uploading selfies or mobile phone photographs',
          'Wearing dark glasses or having glare on spectacles',
          'Photo not having a plain white/light background'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 20,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or dark blue ink',
        backgroundColor: 'White paper',
        rejectionReasons: [
          'Signatures photographed with a mobile phone instead of being properly scanned'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 20,
      rules: {
        allowedFormats: ['JPG', 'JPEG']
      }
    }
  ]
};