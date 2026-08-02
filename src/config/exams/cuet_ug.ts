import { FormatConfig } from '../formats';

export const cuet_ugConfig: FormatConfig = {
  id: 'cuet_ug',
  title: 'CUET UG 2026',
  description: 'Official document formatting configuration for the Common University Entrance Test (Undergraduate) 2026 application cycle.',
  category: 'exam',
  subCategory: 'Undergraduate Entrance',
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
        dpi: 200,
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or very light-coloured',
        colorMode: 'Black & White or Colour',
        minHeadSizePercent: 80,
        facePosition: 'Centred',
        shadowAllowed: false,
        sunglassesAllowed: false,
        headwearAllowed: false,
        namingConvention: 'Photo',
        livePhotoMatchRequired: true,
        compressionRestrictions: 'Must be clearly legible/identifiable; blurred images fail automatic validation',
        rejectionReasons: [
          'Blurred or unidentifiable photograph',
          'Incorrect file size',
          'Dark or shadowed background',
          'Face covering less than 80% of the image',
          'Wearing a mask, cap, or sunglasses',
          'Mismatch between uploaded photograph and live captured photograph/physical identity proof'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 256, // Standard signature width fallback
      height: 64, // Standard signature height fallback
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue ink',
        backgroundColor: 'White paper',
        namingConvention: '_Signature',
        compressionRestrictions: 'Must be clearly legible/identifiable; blurred images fail automatic validation',
        rejectionReasons: [
          'Signature in capital letters',
          'Smudged signature',
          'Blurred or unidentifiable signature',
          'Incorrect file size'
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
        status: 'Explicitly mentioned but specifications currently omitted from official notification.',
        compressionRestrictions: 'Must be clearly legible/identifiable; blurred images fail automatic validation'
      }
    }
  ]
};