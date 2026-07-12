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

export const bihar_police_constableConfig: FormatConfig = {
  id: 'bihar_police_constable',
  title: 'Bihar Police Constable (CSBC) 2026',
  description: 'Official photo and signature upload requirements for the Bihar Police Constable CSBC 2026 examination.',
  category: 'exam',
  subCategory: 'Police',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 413, // 3.5 cm at 300 DPI (3.5 / 2.54 * 300)
      height: 531, // 4.5 cm at 300 DPI (4.5 / 2.54 * 300)
      minKb: 10,
      maxKb: 25,
      rules: {
        allowedFormats: ['JPG', 'JPEG', 'PNG'],
        backgroundColor: 'White background',
        colorMode: 'Color',
        facePosition: 'Front-facing, well-lit',
        shadowAllowed: false,
        glassesAllowed: false,
        headwearAllowed: false,
        nameAndDateStampRequired: false,
        onlyJpgAllowed: false,
        pngAllowed: true,
        compressionRestrictions: 'Must be strictly under 25 KB',
        dimensionRestrictions: 'Must match the standard 3.5 cm x 4.5 cm proportions',
        validUntil: 'Photograph must be a recent passport-sized color photo (usually taken within the last 3-6 months)',
        commonRejectionReasons: [
          'Uploading selfies instead of formal passport photos.',
          'Wearing spectacles, sunglasses, caps, or any accessories in the photograph.',
          'Uploading blurred or unclear photographs.',
          'Photograph taken with a dark or patterned background.'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature (English and Hindi)',
      width: 827, // 7.0 cm at 300 DPI (7.0 / 2.54 * 300)
      height: 236, // 2.0 cm at 300 DPI (2.0 / 2.54 * 300)
      minKb: 10,
      maxKb: 25,
      rules: {
        allowedFormats: ['JPG', 'JPEG', 'PNG'],
        inkColor: 'Black or Blue ink',
        backgroundColor: 'White unruled paper',
        uploadRequirement: 'Candidates are required to separately upload both English and Hindi (Devanagari) signatures',
        onlyJpgAllowed: false,
        pngAllowed: true,
        compressionRestrictions: 'Must be strictly under 25 KB',
        commonRejectionReasons: [
          'Signatures written on ruled paper or failing to upload both Hindi and English signatures in their respective slots.'
        ]
      }
    }
  ]
};