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

export const bitsatConfig: FormatConfig = {
  id: 'bitsat',
  title: 'BITSAT 2026',
  description: 'Easily format and resize your application photograph and signature to meet the official BITSAT 2026 upload guidelines.',
  category: 'exam',
  subCategory: 'Engineering Entrance Exam',
  documents: [
    {
      id: 'photo',
      name: 'Photograph',
      width: 413,
      height: 531,
      minKb: 50,
      maxKb: 100,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Plain or white color',
        colorMode: 'Color',
        headSizePercentage: 'Head and shoulders should occupy most of the space',
        eyePositionRule: 'Eyes must be clearly visible',
        facePosition: 'Face must be clearly visible',
        shadowAllowed: false,
        glassesAllowed: 'No sunglasses allowed',
        headwearAllowed: 'No hats allowed',
        nameAndDateStampRequired: false,
        validity: 'Must be a recent passport-sized photograph',
        uploadPortalConstraints: {
          onlyJpgAllowed: true,
          pngAllowed: false
        },
        commonRejectionReasons: [
          'Blurry/unclear images',
          'Wrong file format (PNG instead of JPG/JPEG)',
          'File size outside the allowed KB limits',
          'Dark or colored background in the photograph',
          'Wearing sunglasses or a hat'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413,
      height: 177,
      minKb: 10,
      maxKb: 100,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or blue ink',
        backgroundColor: 'Plain white paper',
        uploadPortalConstraints: {
          onlyJpgAllowed: true,
          pngAllowed: false
        },
        commonRejectionReasons: [
          'Blurry/unclear images',
          'Wrong file format (PNG instead of JPG/JPEG)',
          'File size outside the allowed KB limits',
          'Uploading a signature that is not in running handwriting'
        ]
      }
    }
  ]
};