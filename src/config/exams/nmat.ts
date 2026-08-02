export interface FormatDocument {
  id: 'photo' | 'signature' | 'thumb_impression';
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

export const nmatConfig: FormatConfig = {
  id: 'nmat',
  title: 'NMAT by GMAC',
  description: 'Official photograph formatting and upload requirements for the NMAT by GMAC registration portal.',
  category: 'exam',
  subCategory: 'Management Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 413,
      height: 531,
      minKb: 10,
      maxKb: 1024,
    stampRequired: false,
      rules: {
        allowedFormats: ['.jpg', '.jpeg', '.png', '.gif'],
        backgroundColor: 'White or lightly colored background',
        colorMode: 'Color (no dark backgrounds permitted)',
        eyePositionRule: 'Eyes should be open and clearly visible',
        facePosition: 'Distinctly visible, facing straight, and centered. Shoulder tops must also be clearly visible.',
        dimensionRestrictions: 'Landscaped or rotated pictures are strictly not allowed.',
        validityRequirement: 'Photograph should not be more than 6 months old.',
        commonRejectionReasons: [
          'Facebook photos or casual social media photos',
          'Photos not adhering to the size limit',
          "Photos where the test administration staff cannot sufficiently authenticate the candidate's identity",
          'Photos with a dark color background',
          'Landscaped or rotated pictures'
        ]
      }
    }
  ]
};