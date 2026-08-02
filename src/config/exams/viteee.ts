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

export const viteeeConfig: FormatConfig = {
  id: 'viteee',
  title: 'VITEEE 2026',
  description: 'Easily format and resize your application photograph and signature to meet the official VITEEE 2026 upload constraints.',
  category: 'exam',
  subCategory: 'Engineering Entrance Exam',
  documents: [
    {
      id: 'photo',
      name: 'Photograph',
      width: 350,
      height: 475,
      minKb: 20,
      maxKb: 300,
    stampRequired: false,
      rules: {
        minWidthPixels: 300,
        maxWidthPixels: 400,
        minHeightPixels: 400,
        maxHeightPixels: 550,
        allowedFormats: ['JPEG'],
        backgroundColor: 'Light background (White or off-white preferred)',
        colorMode: 'Color',
        headSizePercentage: 'Full frontal view required with both ears visible',
        eyePositionRule: 'Open eyes',
        facePosition: 'Full-frontal view without tilting of the face',
        shadowAllowed: 'Optimum exposure required; not too dark or too bright',
        glassesAllowed: 'Yes, but with no glare on spectacles',
        smileAllowed: 'No (Neutral expression required)',
        nameAndDateStampRequired: false,
        validity: 'Professionally taken recent studio photograph recommended',
        uploadPortalConstraints: {
          onlyJpgAllowed: true,
          pngAllowed: false,
          dimensionRestrictions: 'Must strictly fall within 300-400px (Width) and 400-550px (Height) for the photo.'
        },
        commonRejectionReasons: [
          'Blur in focus',
          'Glare on spectacles',
          'Tilting of face',
          'Ears not visible',
          'Incorrect file size or dimensions',
          'Multiple faces in the photograph'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413,
      height: 177,
      minKb: 5,
      maxKb: 150,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPEG'],
        inkColor: 'Dark blue or black pen',
        backgroundColor: 'White paper',
        uploadPortalConstraints: {
          onlyJpgAllowed: true,
          pngAllowed: false
        }
      }
    }
  ]
};