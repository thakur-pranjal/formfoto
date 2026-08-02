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

export const indian_airforce_agniveervayuConfig: FormatConfig = {
  id: 'indian_airforce_agniveervayu',
  title: 'Indian Air Force Agniveervayu Intake 02/2027',
  description: 'Upload specifications for the Indian Air Force Agniveervayu 02/2027 intake, including mandatory black slate photo and live webcam verification rules.',
  category: 'exam',
  subCategory: 'Defence',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 0,
      height: 0,
      minKb: 100,
      maxKb: 200,
      stampRequired: true,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        colorMode: 'Colour',
        facePosition: 'Front portrait',
        headwearAllowed: 'No (except for Sikhs)',
        nameAndDateStampRequired: true,
        stampPosition: 'Candidate holding black slate in front of his/her chest',
        stampFormat: 'Name and date of photograph taken clearly written on the black slate with white chalk in capital letters',
        liveWebcamVerification: 'Live image of the candidate will be captured during online registration via web camera and matched against the uploaded photo.',
        rejectionReasons: [
          'Failing to hold the black slate',
          'Writing on the slate in running handwriting instead of capital letters',
          'Wearing headgear (except Sikhs)',
          'Facial features not matching during the mandatory live webcam capture step'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 80,
      maxKb: 150,
      stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Plain white paper',
        additionalRequirement: "Parents' Signature (Required if candidate is under 18 years of age) - Size: 80 KB to 150 KB, Format: JPG / JPEG"
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression',
      width: 0,
      height: 0,
      minKb: 50,
      maxKb: 100,
      stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        colorRequirements: 'Inked by placing on stamp pad',
        handRequirement: 'Left hand thumb impression'
      }
    }
  ]
};