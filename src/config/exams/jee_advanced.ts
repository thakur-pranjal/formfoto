import { FormatConfig } from '../formats';

export const jee_advancedConfig: FormatConfig = {
  id: 'jee_advanced',
  title: 'JEE Advanced 2026',
  description: 'Strictly format your photograph and signature to meet the official JEE Advanced 2026 upload constraints.',
  category: 'exam',
  subCategory: 'Engineering Entrance Exam',
  documents: [
    {
      id: 'photo',
      name: 'Photograph',
      width: 0, 
      height: 0, 
      minKb: 4,
      maxKb: 100,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG'],
        uploadPortalConstraints: {
          onlyJpgAllowed: true
        }
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 1,
      maxKb: 30,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG'],
        uploadPortalConstraints: {
          onlyJpgAllowed: true
        }
      }
    }
  ]
};