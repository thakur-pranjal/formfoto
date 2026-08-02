import { FormatConfig } from '../formats';

export const indian_army_agniveerConfig: FormatConfig = {
  id: 'indian_army_agniveer',
  title: 'Indian Army Agniveer 2026-2027',
  description: 'Comprehensive image upload requirements for the Indian Army Agniveer recruitment cycle, including strict photo and signature guidelines.',
  category: 'exam',
  subCategory: 'Defence',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Light / Plain White',
        colorMode: 'Colour',
        facePosition: 'Frontal view, face clearly visible',
        shadowAllowed: false,
        headwearAllowed: 'Not specified (Sikh candidates are generally allowed customary headwear)',
        nameAndDateStampRequired: false,
        rejectionReasons: [
          'Uploading blurred or distorted photographs',
          'Photographs not matching the candidate\'s face during Phase 1 (Online CEE) verification'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 20,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue ink (running handwriting)',
        backgroundColor: 'Plain white paper',
        rejectionReasons: [
          'Signatures written in full capital/block letters',
          'Uploading illegible scans'
        ]
      }
    }
  ]
};