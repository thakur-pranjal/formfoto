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

export const up_police_constableConfig: FormatConfig = {
  id: 'up_police_constable',
  title: 'UP Police Constable / UP Police (OTR) 2024-2025',
  description: 'Strict photo and signature specifications for the UP Police Constable One-Time Registration (OTR) profile application process.',
  category: 'exam',
  subCategory: 'Police',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 180,
      height: 225,
      minKb: 20,
      maxKb: 50,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light-gray preferred',
        colorMode: 'Color',
        headSizePercentage: 'Face and shoulders must be clearly visible',
        facePosition: 'Full frontal view',
        shadowAllowed: false,
        glassesAllowed: 'No dark glasses allowed (Spectacles allowed if no glare)',
        smileAllowed: 'Must be natural and unedited',
        headwearAllowed: false,
        nameAndDateStampRequired: false,
        onlyJpgAllowed: true,
        pngAllowed: false,
        compressionRestrictions: 'Must strictly adhere to file size limits',
        dimensionRestrictions: 'Image dimensions must exactly match specifications (180x225 px for photo)',
        validUntil: 'Photo must be taken within the last 6 months from the application date',
        changeFromPreviousYear: 'Implementation of a mandatory One-Time Registration (OTR) profile requirement where photo and signature parameters must strictly match standardized OTR dimensions before application submission',
        commonRejectionReasons: [
          'Wearing a cap, headgear, or dark glasses in the photograph.',
          'Shadows visible on the face or background.',
          'Use of filters, beauty apps, or scanned pre-existing printed photographs.'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 200,
      height: 80,
      minKb: 5,
      maxKb: 20,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ink',
        backgroundColor: 'White paper',
        onlyJpgAllowed: true,
        pngAllowed: false,
        compressionRestrictions: 'Must strictly adhere to file size limits',
        dimensionRestrictions: 'Image dimensions must exactly match specifications (200x80 px for signature)',
        commonRejectionReasons: [
          'Signature in block letters (must be running handwriting).'
        ]
      }
    }
  ]
};