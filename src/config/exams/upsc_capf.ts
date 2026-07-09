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

export const upsc_capfConfig: FormatConfig = {
  id: 'upsc_capf',
  title: 'UPSC Central Armed Police Forces (CAPF) 2026',
  description: 'Official document formatting guidelines for the UPSC Central Armed Police Forces (CAPF) 2026 application, including mandatory live photograph and triple-signature requirements.',
  category: 'exam',
  subCategory: 'Defence / Police',
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
        eyePositionRule: 'Eyes must be open & edges of face must be clearly visible',
        facePosition: 'Frontal view of the full face should be visible, head in the centre and both ears should be visible',
        shadowAllowed: false,
        glassesAllowed: true,
        glassesRestrictions: 'Glares on eyeglasses should be avoided; coloured or dark glasses will not be accepted',
        smileAllowed: false,
        expressionRules: 'Expression of the face should be natural; no grinning, frowning, or raised eyebrows',
        headwearRestrictions: 'Uniform not accepted, eyes must not be covered by hair',
        mandatoryLiveCapture: true,
        liveCaptureMethod: 'Webcam or mobile via QR code',
        namingConvention: 'photo',
        spacesAllowed: false,
        specialCharactersAllowed: false,
        caseRequirement: 'lowercase',
        commonRejectionReasons: [
          'Face coverage less than 3/4th of the photo',
          'Incorrect face alignment',
          'Blurred photo',
          'Face misaligned',
          'Face too close to the camera, out of frame and ear lobes not visible',
          'Shadows on the face or background',
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
        specialLayoutRule: 'Must sign three times vertically, one below the other in a single scanned image file',
        backgroundColor: 'Plain white paper (no lines or colours)',
        namingConvention: 'signature',
        spacesAllowed: false,
        specialCharactersAllowed: false,
        caseRequirement: 'lowercase',
        commonRejectionReasons: [
          'Not exactly three signatures',
          'Signatures not arranged vertically (one below the other)',
          'Rotated or upside down',
          'On lined or coloured paper'
        ]
      }
    }
  ]
};