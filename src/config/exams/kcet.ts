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

export const kcetConfig: FormatConfig = {
  id: 'kcet',
  title: 'Karnataka Common Entrance Test (KCET) 2026',
  description: 'Official document formatting guidelines and requirements for the Karnataka Common Entrance Test (KCET) 2026 application.',
  category: 'exam',
  subCategory: 'Engineering and Pharmacy',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413,  // 3.5 cm at 300 DPI
      height: 531, // 4.5 cm at 300 DPI
      minKb: 5,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White background',
        colorMode: 'Color',
        facePosition: 'Clear front-facing',
        shadowAllowed: false,
        glassesAllowed: false, // Strict enforcement: no spectacles
        nameDateStampRequired: false,
        validity: 'Recent photograph (Typically taken within the last 3 to 6 months)',
        namingConvention: 'Simple names without special characters recommended (e.g., "Photo.jpg")',
        dimensionRestrictions: 'Must strictly fall within the requested physical dimensions (3.5 cm x 4.5 cm for photo)',
        specialNote: 'Strict enforcement of white backgrounds and no spectacles in the uploaded photograph.',
        commonRejectionReasons: [
          'Wearing spectacles/glasses in the photograph',
          'Non-white background',
          'Uploading documents outside the 5-50 KB file size limit'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413,  // 3.5 cm at 300 DPI
      height: 177, // 1.5 cm at 300 DPI
      minKb: 5,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ballpoint pen',
        backgroundColor: 'White paper',
        namingConvention: 'Simple names without special characters recommended',
        commonRejectionReasons: [
          'Using blue ink for signature which fades during scanning',
          'Uploading documents outside the 5-50 KB file size limit'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Left-Hand Thumb Impression',
      width: 413,  // 3.5 cm at 300 DPI
      height: 177, // 1.5 cm at 300 DPI
      minKb: 5,    // Inferred from global 5-50KB limits
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        impressionDetails: 'Left-hand thumb impression using a stamp pad or ink',
        backgroundColor: 'White paper',
        namingConvention: 'Simple names without special characters recommended',
        commonRejectionReasons: [
          'Uploading documents outside the 5-50 KB file size limit'
        ]
      }
    }
  ]
};