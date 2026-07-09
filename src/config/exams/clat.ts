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

export const clatConfig: FormatConfig = {
  id: 'clat',
  title: 'CLAT 2027',
  description: 'Official document formatting configuration for the Common Law Admission Test (CLAT) 2027 application cycle.',
  category: 'exam',
  subCategory: 'Law Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 200,
      height: 230,
      minKb: 20,
      maxKb: 50,
      rules: {
        minDpi: 200,
        allowedFormats: ['JPG', 'JPEG'],
        pngAllowed: false,
        backgroundColor: 'White or light-coloured (plain white preferred)',
        colorMode: 'True colour',
        facePosition: 'Front-facing, clear and visible',
        shadowAllowed: false,
        glassesAllowed: 'Clear glasses only (No tinted/dark glasses; no reflections)',
        headwearAllowed: 'No caps or hats',
        nameAndDateStampRequired: true,
        stampDetails: 'Name and date mentioned on it',
        compressionRestrictions: 'Must be clear and properly cropped; smartphone photographs (selfies) are not allowed.',
        rejectionReasons: [
          'Uploading a selfie/smartphone photograph',
          'Dark or patterned background',
          'Wearing tinted glasses/caps',
          'Red-eye in the photograph',
          'Uploading in unsupported formats like PNG'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 140,
      height: 60,
      minKb: 10,
      maxKb: 20,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        pngAllowed: false,
        inkColor: 'Black ink pen',
        backgroundColor: 'Plain white paper',
        compressionRestrictions: 'Must be clear and properly cropped; smartphone photographs (selfies) are not allowed.',
        rejectionReasons: [
          'Signature in all capital letters',
          'Signature not matching the one used on exam day',
          'Uploading in unsupported formats like PNG'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression',
      width: 256, // Standard thumb impression width fallback
      height: 256, // Standard thumb impression height fallback
      minKb: 10,
      maxKb: 50,
      rules: {
        status: 'Explicitly mentioned but specifications currently omitted from official notification.'
      }
    }
  ]
};