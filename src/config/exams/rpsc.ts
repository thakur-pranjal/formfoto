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

export const rpscConfig: FormatConfig = {
  id: 'rpsc',
  title: 'RPSC OTR 2026',
  description: 'Official photograph and signature format requirements for the Rajasthan Public Service Commission (RPSC) 2026 OTR cycle.',
  category: 'exam',
  subCategory: 'State Public Service Commission',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // 3.5 cm at 300 DPI (3.5 / 2.54 * 300 = 413.38)
      height: 531, // 4.5 cm at 300 DPI (4.5 / 2.54 * 300 = 531.49)
      minKb: 50,
      maxKb: 100,
      rules: {
        minPixels: '240 x 320 px',
        maxPixels: '480 x 640 px',
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light-colored',
        colorMode: 'Color',
        headSizePercentage: 'Minimum 50%',
        eyePositionRule: 'Eyes must appear clearly',
        facePosition: 'Frontal view (head, eye, nose, and chin must be clearly visible)',
        glassesAllowed: true,
        glassesRule: 'No flash reflection; dark glasses or sunglasses are strictly prohibited',
        headwearAllowed: false,
        headwearRule: 'Face and head should not be covered by any fabric, shade, or hairs',
        validity: 'Photograph must be a maximum of 6 months old.',
        rejectionReasons: [
          'Uploading a mobile or self-composed (selfie) photo',
          'Face taking up less than 50% of the image',
          'Wearing dark/sunglasses',
          'Face covered by hair or fabric'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 827, // 7 cm at 300 DPI (7 / 2.54 * 300 = 826.77)
      height: 236, // 2 cm at 300 DPI (2 / 2.54 * 300 = 236.22)
      minKb: 10,
      maxKb: 50,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or dark blue ink',
        backgroundColor: 'White paper',
        dimensionRestrictions: '280x80 to 560x160 px',
        rejectionReasons: [
          'Uploading a mobile phone photo of the signature instead of a proper scan'
        ]
      }
    }
  ]
};