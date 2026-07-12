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

export const mp_police_constableConfig: FormatConfig = {
  id: 'mp_police_constable',
  title: 'MP Police Constable (MP ESB) 2026',
  description: 'Format specifications for the mandatory unified MP ESB Predefined Template, integrating photograph, signature, and declaration.',
  category: 'exam',
  subCategory: 'Police',
  documents: [
    {
      id: 'photo',
      name: 'Photograph (MP ESB Template)',
      width: 472, // 4.0 cm calculated at 300 DPI (4.0 / 2.54 * 300)
      height: 591, // 5.0 cm calculated at 300 DPI (5.0 / 2.54 * 300)
      minKb: 30,
      maxKb: 200,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White',
        colorMode: 'Color',
        dpi: '100 - 300 DPI (For the combined template scan)',
        facePosition: 'Front-facing',
        glassesAllowed: 'Normal reading glasses allowed; Dark glasses/sunglasses strictly prohibited',
        nameAndDateStampRequired: true,
        stampPosition: 'Front lower part of the photograph',
        stampFormat: 'Candidate Name and Date of Photo Capture',
        onlyJpgAllowed: true,
        pngAllowed: false,
        compressionRestrictions: 'The finalized single template image (containing Photo, Signature, and Declaration) must strictly be between 30 KB and 200 KB.',
        dimensionRestrictions: 'Portal accepts template image with Width between 120px - 200px and Height between 200px - 300px.',
        autoCropByPortal: 'Application module provides a specific crop tool (ClientSideCropVyp) to align the template.',
        validUntil: 'Photograph must not be older than 3 months from the application submission date.',
        commonRejectionReasons: [
          'Uploading individual photo and signature instead of the mandatory unified MP ESB Predefined Template.',
          'Missing Name and Capture Date printed on the bottom of the photograph.',
          'Photograph older than 3 months from the date of application.',
          'Using a Polaroid photograph.'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature (MP ESB Template)',
      width: 0,
      height: 0,
      minKb: 30,
      maxKb: 200,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White paper template',
        dimensionRestrictions: 'Must fit completely within Box-2 of the MP ESB Template',
        commonRejectionReasons: [
          'Signature done in CAPITAL LETTERS or multiple/short signatures used.',
          'Uploading individual photo and signature instead of the mandatory unified MP ESB Predefined Template.'
        ]
      }
    }
  ]
};