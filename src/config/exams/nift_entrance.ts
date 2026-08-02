import { FormatConfig } from '../formats';

export const nift_entranceConfig: FormatConfig = {
  id: 'nift_entrance',
  title: 'NIFTEE 2026',
  description: 'Official document formatting configuration for the National Institute of Fashion Technology Entrance Examination 2026 application cycle.',
  category: 'exam',
  subCategory: 'Design/Fashion Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // Standard 3.5cm width at 300 DPI fallback
      height: 531, // Standard 4.5cm height at 300 DPI fallback
      minKb: 10,
      maxKb: 200,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light-coloured',
        colorMode: 'Colour or Black & White',
        minHeadSizePercent: 80,
        eyePositionRule: 'Both eyes must be clearly visible',
        facePosition: 'Forehead, chin, both eyes, lips, cheeks, and nose should be clearly visible',
        shadowAllowed: false,
        glassesAllowed: 'Spectacles or glare-on glasses not allowed',
        headwearAllowed: 'No (Hair or cloth covering the face is not allowed)',
        mandatoryLivePhotoCapture: true,
        eKycMethod: 'Aadhaar-based e-KYC',
        compressionRestrictions: 'Must be clear',
        rejectionReasons: [
          'Wearing spectacles/glare-on glasses in the photo',
          'Face occupying less than 80% of the image',
          'Shadow on the face',
          'Features covered by hair/cloth',
          'Blurred/unidentifiable scanned files'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 256, // Standard signature width fallback
      height: 64, // Standard signature height fallback
      minKb: 4,
      maxKb: 30,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue ink (must be in running hand)',
        backgroundColor: 'White paper',
        compressionRestrictions: 'Must be clear; mobile phone photographs of signatures are strictly not acceptable',
        rejectionReasons: [
          'Uploading mobile phone photographs of signatures',
          'Blurred/unidentifiable scanned files'
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
    stampRequired: false,
      rules: {
        status: 'Explicitly mentioned but specifications currently omitted from official notification.'
      }
    }
  ]
};