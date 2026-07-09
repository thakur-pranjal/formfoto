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

export const upsc_cseConfig: FormatConfig = {
  id: 'upsc_cse',
  title: 'UPSC Civil Services Examination (CSE) 2026',
  description: 'Official document formatting guidelines for the UPSC Civil Services Examination (CSE) 2026 application, including mandatory live photograph and triple-signature requirements.',
  category: 'exam',
  subCategory: 'Civil Services',
  documents: [
    {
      id: 'photo',
      name: 'Photograph',
      width: 350,
      height: 350,
      minKb: 20,
      maxKb: 200,
      rules: {
        allowedFormats: ['JPG'],
        backgroundColor: 'Plain white',
        colorMode: 'Color',
        headSizePercentage: 75,
        eyePositionRule: 'Eyes must be open, looking directly at the camera, edges of face clearly visible',
        facePosition: 'Frontal view, head in the centre, both ears visible',
        shadowAllowed: false,
        glassesAllowed: true,
        glassesRestrictions: 'No glare on eyeglasses; coloured or dark glasses are not accepted',
        smileAllowed: false,
        expressionRules: 'Expression must be natural; no grinning, frowning, or raised eyebrows',
        headwearRestrictions: 'Uniform is not accepted and eyes must not be covered by hair',
        mandatoryLiveCapture: true,
        liveCaptureMethod: 'Webcam or mobile via QR code',
        namingConvention: 'photo',
        spacesAllowed: false,
        specialCharactersAllowed: false,
        caseRequirement: 'lowercase',
        commonRejectionReasons: [
          'Face coverage less than 3/4th',
          'Face misaligned',
          'Not looking directly at camera',
          'Blurred photo',
          'Face too close to camera/out of frame',
          'Ear lobes not visible',
          'Dark background',
          'Wearing uniform',
          'Eyes hidden under coloured/dark glasses',
          'Shadows on face/background',
          'Glares on eyeglasses',
          'Photograph is signed'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 350,
      height: 350,
      minKb: 20,
      maxKb: 100,
      rules: {
        allowedFormats: ['JPG'],
        dimensionRange: '350 - 500 pixels',
        inkColor: 'Black ink',
        backgroundColor: 'Plain white paper (no lines or colours)',
        specialLayoutRule: 'Candidates must sign three times vertically (one below the other) in a single scanned image file',
        namingConvention: 'signature',
        spacesAllowed: false,
        specialCharactersAllowed: false,
        caseRequirement: 'lowercase',
        commonRejectionReasons: [
          'Not exactly three signatures',
          'Signatures not arranged vertically (one below the other)',
          'Rotated/upside down',
          'On lined/coloured paper'
        ]
      }
    }
  ]
};