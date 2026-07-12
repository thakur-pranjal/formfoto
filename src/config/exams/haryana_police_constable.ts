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

export const haryana_police_constableConfig: FormatConfig = {
  id: 'haryana_police_constable',
  title: 'Haryana Police Constable (HSSC) 2026',
  description: 'Strict format guidelines and requirements for the Haryana Police Constable 2026 examination, including mandatory name and date stamps on photos.',
  category: 'exam',
  subCategory: 'Police',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 413, // 3.5 cm calculated at 300 DPI (3.5 / 2.54 * 300)
      height: 531, // 4.5 cm calculated at 300 DPI (4.5 / 2.54 * 300)
      minKb: 20,
      maxKb: 50,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light-colored background',
        colorMode: 'Color',
        headSizePercentage: 'Head, neck, and face clearly visible',
        facePosition: 'Front-facing',
        shadowAllowed: false,
        glassesAllowed: 'Corrective glasses allowed if no reflections and eyes are clearly visible',
        headwearAllowed: false,
        nameAndDateStampRequired: true,
        stampPosition: 'Bottom of the photograph',
        stampFormat: "Candidate's Name and Date of Taking Photograph",
        onlyJpgAllowed: true,
        pngAllowed: false,
        compressionRestrictions: 'Must strictly fall within KB limits to bypass portal validation errors',
        validUntil: 'Photograph must be recent, typically taken within 3 months of the application date.',
        commonRejectionReasons: [
          'Uploading a photograph without the candidate\'s name and photo capture date printed on it.',
          'Uploading a photograph with a dark or patterned background.',
          'File size exceeding 50 KB for the photo.'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413, // 3.5 cm calculated at 300 DPI (3.5 / 2.54 * 300)
      height: 177, // 1.5 cm calculated at 300 DPI (1.5 / 2.54 * 300)
      minKb: 10,
      maxKb: 20,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue ink',
        backgroundColor: 'White paper',
        onlyJpgAllowed: true,
        pngAllowed: false,
        compressionRestrictions: 'Must strictly fall within KB limits to bypass portal validation errors',
        commonRejectionReasons: [
          'File size exceeding 20 KB for the signature.',
          'Uploading a blurry signature or a signature written in capital letters.'
        ]
      }
    }
  ]
};