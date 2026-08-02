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

export const reetConfig: FormatConfig = {
  id: 'reet',
  title: 'REET 2025/2026',
  description: 'Official document formatting and upload requirements for the Rajasthan Eligibility Examination for Teachers (REET) 2025/2026 cycle.',
  category: 'exam',
  subCategory: 'Teaching / Eligibility',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413,  // 3.5 cm at 300 DPI
      height: 531, // 4.5 cm at 300 DPI
      minKb: 50,
      maxKb: 100,
    stampRequired: false,
      rules: {
        minPixels: '240 x 320',
        maxPixels: '480 x 640',
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'White or light colored',
        colorMode: 'Color',
        headSizePercentage: 'At least 50%',
        eyePositionRule: 'Eyes, nose, and chin should appear clearly',
        facePosition: 'Frontal view, face and head should not be covered by fabric or hair',
        shadowAllowed: false,
        glassesAllowed: 'Clear glasses allowed (flash/reflections should not be present). Black glasses or sunglasses are strictly prohibited.',
        onlyJpgAllowed: true,
        dimensionRestrictions: 'Images must fall strictly between the minimum and maximum pixel bounds.',
        commonRejectionReasons: [
          'Mismatch of applicant photo/signature during exam verification',
          'Wearing dark sunglasses',
          'Photo older than 6 months',
          'Uploading a mobile selfie'
        ],
        expiryRecommendation: 'Valid Until: End of application/correction window (Note: Photo and signature fields cannot be edited during the correction window).'
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 827,  // 7 cm at 300 DPI
      height: 236, // 2 cm at 300 DPI
      minKb: 20,
      maxKb: 50,
    stampRequired: false,
      rules: {
        minPixels: '280 x 80',
        maxPixels: '560 x 160',
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black or Dark Blue pen',
        backgroundColor: 'White paper',
        onlyJpgAllowed: true,
        dimensionRestrictions: 'Images must fall strictly between the minimum and maximum pixel bounds.',
        commonRejectionReasons: [
          'Mismatch of applicant photo/signature during exam verification',
          'Using someone else\'s signature'
        ],
        expiryRecommendation: 'Valid Until: End of application/correction window (Note: Photo and signature fields cannot be edited during the correction window).'
      }
    }
  ]
};