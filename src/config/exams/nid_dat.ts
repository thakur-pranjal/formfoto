import { FormatConfig } from '../formats';

export const nid_datConfig: FormatConfig = {
  id: 'nid_dat',
  title: 'NID DAT 2026-27',
  description: 'Official document formatting configuration for the National Institute of Design Design Aptitude Test (NID DAT) 2026-27 application cycle.',
  category: 'exam',
  subCategory: 'Design Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // Standard 3.5cm width at 300 DPI fallback
      height: 531, // Standard 4.5cm height at 300 DPI fallback
      minKb: 50,
      maxKb: 200,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        colorMode: 'Colour',
        compressionRestrictions: 'Must be a coloured photograph taken at a professional studio. Photographs with self-composed portraits (selfies) will not be accepted.',
        rejectionReasons: [
          'Uploading self-composed portraits (selfies) instead of professional studio photographs',
          'Incorrect file size or format'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 256, // Standard signature width fallback
      height: 64, // Standard signature height fallback
      minKb: 50,
      maxKb: 200,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        rejectionReasons: [
          'Blurred or illegible signature',
          'Incorrect file size or format'
        ]
      }
    }
  ]
};