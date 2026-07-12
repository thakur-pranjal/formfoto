export interface FormatDocument {
  id: string;        // Must be 'photo', 'signature', or 'thumb_impression'
  name: string;      // E.g., 'Passport Photo', 'Signature'
  width: number;     // Integer values only. (If payload gives cm/mm, calculate pixel equivalents at 300 DPI).
  height: number;    // Integer values only.
  minKb: number;     // Integer only. Default to 10 if missing.
  maxKb: number;     // Integer only. Default to 50 if missing.
  rules?: Record<string, any>; // MAP ALL EXTRA COMPLIANCE DATA HERE (e.g., backgroundColor, glassesAllowed, stampRequired, inkColor)
}

export interface FormatConfig {
  id: string;        // Use the exact EXAM_ID from the payload.
  title: string;     // Clean display title (e.g., 'SBI PO 2026')
  description: string; // Generate a short 1-sentence SEO-friendly description.
  category: 'exam' | 'passport' | 'visa'; // Must strictly be 'exam'.
  subCategory: string; // Map based on exam type (e.g., 'Banking', 'Medical', 'UPSC', 'Defence').
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
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Plain white paper',
        additionalRequirement: 'Parents\' Signature (Required if candidate is under 18 years of age) - Size: 80 KB to 150 KB, Format: JPG / JPEG'
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression',
      width: 0,
      height: 0,
      minKb: 50,
      maxKb: 100,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        colorRequirements: 'Inked by placing on stamp pad',
        handRequirement: 'Left hand thumb impression'
      }
    }
  ]
};