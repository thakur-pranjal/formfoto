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

export const ap_eapcetConfig: FormatConfig = {
  id: 'ap_eapcet',
  title: 'AP EAPCET 2026',
  description: 'Official document formatting guidelines and requirements for the Andhra Pradesh Engineering, Agriculture and Pharmacy Common Entrance Test (AP EAPCET) 2026.',
  category: 'exam',
  subCategory: 'Engineering and Agriculture',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 50,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light background',
        colorMode: 'Color',
        headSize: 'Clear frontal view required',
        facePosition: 'Frontal view',
        nameDateStampRequired: false,
        validity: 'Recent photograph (Typically taken within the last 6 months)',
        specialNote: 'For regular Intermediate students, photos and signatures are auto-populated from the Board database and frozen. Only non-regular candidates or those from other boards must upload them manually.',
        commonRejectionReasons: [
          'Blurry or poorly lit photograph',
          'Incorrect file size (exceeding 50 KB)',
          'Wrong file format (PNG or PDF)'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 30,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Blue typically preferred',
        backgroundColor: 'White paper',
        specialNote: 'For regular Intermediate students, photos and signatures are auto-populated from the Board database and frozen. Only non-regular candidates or those from other boards must upload them manually.',
        commonRejectionReasons: [
          'Signature not legible',
          'Incorrect file size (exceeding 30 KB)',
          'Wrong file format'
        ]
      }
    }
  ]
};