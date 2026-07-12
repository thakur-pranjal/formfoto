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

export const cmatConfig: FormatConfig = {
  id: 'cmat',
  title: 'Common Management Admission Test (CMAT)',
  description: 'Official photo and signature formatting requirements for the Common Management Admission Test (CMAT) registration portal.',
  category: 'exam',
  subCategory: 'Management Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 413,
      height: 531,
      minKb: 10,
      maxKb: 200,
      rules: {
        allowedFormats: ['.jpg', '.jpeg'],
        backgroundColor: 'White',
        colorMode: 'Colour or Black & White',
        headSizePercentage: '80% face visible (including ears)',
        facePosition: 'Frontal view, clearly visible without mask',
        glassesAllowed: 'Spectacles allowed if used regularly (Goggles are not allowed)',
        headwearAllowed: 'Caps are not allowed',
        validityRequirement: 'Must be a "recent" photograph.',
        commonRejectionReasons: [
          'Blurred or unidentifiable photograph',
          'Photograph with cap/goggles/mask',
          "Uploading someone else's photograph",
          'Polaroid or computer-generated photographs'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 945,
      height: 413,
      minKb: 10,
      maxKb: 50,
      rules: {
        allowedFormats: ['.jpg', '.jpeg'],
        inkColor: 'Blue or Black ink',
        backgroundColor: 'White paper',
        commonRejectionReasons: [
          'Blurred or unidentifiable signature',
          "Uploading someone else's signature"
        ]
      }
    }
  ]
};