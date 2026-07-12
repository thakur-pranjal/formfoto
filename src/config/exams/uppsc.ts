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

export const uppscConfig: FormatConfig = {
  id: 'uppsc',
  title: 'UPPSC OTR 2026',
  description: 'Official photo and signature formatting requirements for the Uttar Pradesh Public Service Commission (UPPSC) 2026 OTR cycle.',
  category: 'exam',
  subCategory: 'State PSC',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 591, // 5 cm at 300 DPI (5 / 2.54 * 300 = 590.55)
      height: 709, // 6 cm at 300 DPI (6 / 2.54 * 300 = 708.66)
      minKb: 10,
      maxKb: 50,
      rules: {
        aspectRatio: '5:6',
        dpiRequirement: 200, 
        allowedFormats: ['JPG', 'JPEG', 'JPE'],
        backgroundColor: 'Plain white',
        colorMode: 'True Colour',
        coverage: 'Photo should cover up to the chest',
        facePosition: 'Frontal view',
        validity: 'Photograph should be recent, taken within three months'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 709, // 6 cm at 300 DPI (6 / 2.54 * 300 = 708.66)
      height: 354, // 3 cm at 300 DPI (3 / 2.54 * 300 = 354.33)
      minKb: 10,
      maxKb: 30,
      rules: {
        allowedFormats: ['JPG', 'JPEG', 'JPE'],
        inkColor: 'Black ink only',
        backgroundColor: 'White paper',
        rejectionReasons: [
          'Signature in capital letters (not permitted)',
          'Initials only (not sufficient)',
          'Signature by another person',
          'Mismatch of signature on Hall Ticket',
          'Dimensions or file size exceeding limits'
        ]
      }
    }
  ]
};