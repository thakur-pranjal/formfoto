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

export const rrb_ntpcConfig: FormatConfig = {
  id: 'rrb_ntpc',
  title: 'RRB NTPC 2025-2026',
  description: 'Official image formatting requirements for the Railway Recruitment Board NTPC CEN 06/2025 and 07/2025 application cycle.',
  category: 'exam',
  subCategory: 'Railway',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413,
      height: 531,
      minKb: 30,
      maxKb: 70,
    stampRequired: false,
      rules: {
        minimumDpi: 100,
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Plain White',
        colorMode: 'Color',
        headSizePercent: 'Face must be fully and clearly visible',
        eyePosition: 'Looking straight at the camera',
        facePosition: 'Centered',
        shadowAllowed: false,
        glassesAllowed: false,
        smileAllowed: false,
        headwearAllowed: false,
        nameAndDateStampRequired: false,
        livePhotoCapturingMandatory: true,
        compressionRestrictions: 'Must strictly be within the 30 KB to 70 KB limit',
        rejectionReasons: [
          'Uploading blurry, unclear, or low-resolution photographs',
          'Wearing spectacles, sunglasses, caps, or masks in the photo',
          'Photo taken against a dark or patterned background instead of plain white',
          'Photo not matching the candidate\'s appearance during CBT/Document Verification'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413,
      height: 236,
      minKb: 30,
      maxKb: 70,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ink pen only',
        backgroundColor: 'White paper',
        minPixelWidth: 140,
        minPixelHeight: 60,
        scanBoxWidthMm: 35,
        scanBoxHeightMm: 20,
        compressionRestrictions: 'Must strictly be within the 30 KB to 70 KB limit',
        rejectionReasons: [
          'Uploading blurry, unclear, or low-resolution signatures',
          'Signature written in BLOCK, CAPITAL, or disjointed letters (must be running handwriting)'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression',
      width: 413,
      height: 236,
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        eligibility: 'Only permitted for specific PwBD candidates unable to sign',
        rejectionReasons: [
          'Uploading a thumb impression instead of a signature (except for eligible PwBD candidates)'
        ]
      }
    }
  ]
};