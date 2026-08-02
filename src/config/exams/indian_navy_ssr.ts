export interface FormatDocument {
  id: string;
  name: string;
  width: number;
  height: number;
  minKb: number;
  maxKb: number;
  stampRequired?: boolean;
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

export const indian_navy_ssrConfig: FormatConfig = {
  id: 'indian_navy_ssr',
  title: 'Indian Navy Agniveer SSR 2027',
  description: 'Document upload specifications for the Indian Navy Agniveer Senior Secondary Recruit (SSR) 01/2027 and 02/2027 batches, including specific mandatory photo and signature guidelines.',
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
      stampRequired: true,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Light / Plain White',
        colorMode: 'Colour',
        facePosition: 'Front portrait, facing the camera',
        shadowAllowed: false,
        glassesAllowed: 'No (Spectacles/tinted glasses are prohibited)',
        smileAllowed: 'Natural expression required',
        headwearAllowed: 'No (except for customary religious practices i.e., Sikh candidates)',
        nameAndDateStampRequired: true,
        stampPosition: 'Candidate must hold a black slate in front of their chest',
        stampFormat: "Candidate's Name and Date of Photograph (DOP) clearly written in capital letters with white chalk on the black slate",
        rejectionReasons: [
          'Failure to hold the black slate with Name and Date of Photograph',
          'Writing on the slate in running handwriting instead of capital letters',
          'Wearing a cap or spectacles',
          'Blurred image',
          'Significant change in appearance (like growing a beard) compared to the uploaded photograph during physical verification'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 10,
      maxKb: 50,
      stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Blue / Black ink',
        backgroundColor: 'Plain white paper',
        rejectionReasons: [
          'Blurred signature',
          'Signature completely in capital block letters'
        ]
      }
    }
  ]
};