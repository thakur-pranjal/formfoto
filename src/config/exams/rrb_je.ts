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

export const rrb_jeConfig: FormatConfig = {
  id: 'rrb_je',
  title: 'RRB JE 2025-2026',
  description: 'Official image formatting requirements for the Railway Recruitment Board Junior Engineer CEN 05/2025 application.',
  category: 'exam',
  subCategory: 'Railway',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // 35mm at 300 DPI
      height: 531, // 45mm at 300 DPI
      minKb: 30,
      maxKb: 70,
      rules: {
        minimumDpi: 100,
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Plain White',
        colorMode: 'Color',
        headSizePercent: 'Face must be fully and clearly visible',
        eyePositionRule: 'Looking straight at the camera',
        facePosition: 'Centered',
        shadowAllowed: false,
        glassesAllowed: false,
        smileAllowed: false,
        headwearAllowed: false,
        nameAndDateStampRequired: false,
        livePhotoMandatory: true,
        compressionRestrictions: 'Must strictly be within the 30 KB to 70 KB limit',
        rejectionReasons: [
          'Uploading blurry, unclear, or low-resolution photographs',
          'Wearing spectacles, reading glasses, sunglasses, caps, or masks in the photo',
          'Photo taken against a dark, colored, or patterned background instead of plain white',
          'Photos showing only one side of the face, group photos, selfies, or morphed photos',
          'Failure to properly capture the Live Photo via webcam/mobile during the application process'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 140, // Minimum specified in pixels
      height: 60, // Minimum specified in pixels
      minKb: 30,
      maxKb: 70,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ink pen only',
        backgroundColor: 'White paper',
        compressionRestrictions: 'Must strictly be within the 30 KB to 70 KB limit',
        rejectionReasons: [
          'Uploading blurry, unclear, or low-resolution signatures',
          'Signature written in BLOCK or CAPITAL letters (must be running handwriting)'
        ]
      }
    }
  ]
};