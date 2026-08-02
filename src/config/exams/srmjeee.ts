import { FormatConfig } from '../formats';

export const srmjeeeConfig: FormatConfig = {
  id: 'srmjeee',
  title: 'SRMJEEE 2026',
  description: 'Properly size and format your application photograph and signature to meet the official SRMJEEE 2026 guidelines.',
  category: 'exam',
  subCategory: 'Engineering Entrance Exam',
  documents: [
    {
      id: 'photo',
      name: 'Photograph',
      width: 413,
      height: 531,
      minKb: 10,
      maxKb: 200,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPEG', 'JPG'],
        allowedFormatsNote: 'Recommended'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413,
      height: 177,
      minKb: 10,
      maxKb: 200
    }
  ]
};