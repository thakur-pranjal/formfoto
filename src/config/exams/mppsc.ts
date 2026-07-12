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

export const mppscConfig: FormatConfig = {
  id: 'mppsc',
  title: 'MPPSC 2025 - 2026',
  description: 'Official photograph and signature format requirements for the Madhya Pradesh Public Service Commission (MPPSC) 2025-2026 exams.',
  category: 'exam',
  subCategory: 'State Public Service Commission',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 0,
      height: 0,
      minKb: 25,
      maxKb: 200,
      rules: {
        sizeNote: 'Standard passport size',
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light-colored background',
        colorMode: 'Color',
        facePosition: 'Frontal view',
        glassesAllowed: false,
        glassesNote: 'Dark glasses are strictly prohibited',
        headwearAllowed: false,
        headwearNote: 'Hats/caps are not acceptable',
        stampRequired: true,
        stampPosition: 'Bottom of the photograph',
        stampFormat: "Candidate's name and the date of taking the photograph must be printed.",
        validity: 'Photograph must not be older than 3 months from the date of application.',
        dimensionRestrictions: 'Not strictly enforced by portal, but must remain clear and not pixelated when resized.',
        rejectionReasons: [
          'Uploading a blurry or old photograph (older than 3 months)',
          'Missing name and date printed on the photograph',
          'Wearing hats or dark glasses in the photo',
          'Uploading outside the 25-200 KB size limit'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 25,
      maxKb: 200,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue ink is universally accepted',
        dimensionRestrictions: 'Not strictly enforced by portal, but must remain clear and not pixelated when resized.',
        rejectionReasons: [
          'Uploading outside the 25-200 KB size limit'
        ]
      }
    }
  ]
};