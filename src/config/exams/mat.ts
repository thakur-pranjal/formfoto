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

export const matConfig: FormatConfig = {
  id: 'mat',
  title: 'Management Aptitude Test (MAT)',
  description: 'Official photo and signature formatting requirements for the Management Aptitude Test (MAT) registration portal.',
  category: 'exam',
  subCategory: 'Management Entrance',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 413,
      height: 531,
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['.jpg', '.jpeg'],
        backgroundColor: 'Light colored, preferably white',
        colorMode: 'Color',
        eyePositionRule: 'Eyes clearly seen (if wearing glasses, there must be no reflections)',
        facePosition: 'Both ears must be visible',
        shadowAllowed: false,
        glassesAllowed: 'Yes, but no reflections and no dark glasses',
        headwearAllowed: 'Caps and hats are not acceptable. Religious headwear is allowed but it must not cover the face',
        validityRequirement: 'Photograph must be a recent passport size photo.',
        uploadPortalConstraints: 'Only .jpg or .jpeg format permitted'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 945,
      height: 413,
      minKb: 5,
      maxKb: 20,
    stampRequired: false,
      rules: {
        allowedFormats: ['.jpg', '.jpeg'],
        inkColor: 'Black',
        backgroundColor: 'White',
        commonRejectionReasons: [
          'Mismatched signature (Signature uploaded must match the signature on the answer sheet at the time of the test and interview, otherwise candidature will be cancelled).'
        ]
      }
    }
  ]
};