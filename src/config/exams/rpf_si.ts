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

export const rpf_siConfig: FormatConfig = {
  id: 'rpf_si',
  title: 'RPF Sub-Inspector (SI) 2024',
  description: 'Official image formatting requirements for the Railway Protection Force Sub-Inspector CEN RPF 01/2024 application.',
  category: 'exam',
  subCategory: 'Railway',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // Standard passport 35mm calculated at 300 DPI
      height: 531, // Standard passport 45mm calculated at 300 DPI
      minKb: 30,
      maxKb: 70,
    stampRequired: false,
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
          'Wearing spectacles, reading glasses, sunglasses, caps, or masks in the uploaded photo',
          'Photo taken against a dark, colored, or patterned background instead of plain white',
          'Photos showing only one side of the face, group photos, selfies, or morphed photos',
          'Failure to properly capture the Live Photo via webcam/mobile during the unified portal application process'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413, // 35mm scan box calculated at 300 DPI
      height: 236, // 20mm scan box calculated at 300 DPI
      minKb: 30,
      maxKb: 70,
    stampRequired: false,
      rules: {
        minPixelWidth: 140,
        minPixelHeight: 60,
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ink pen only',
        backgroundColor: 'White paper',
        compressionRestrictions: 'Must strictly be within the 30 KB to 70 KB limit',
        rejectionReasons: [
          'Uploading blurry, unclear, or low-resolution signatures',
          'Signature written in BLOCK, CAPITAL, or disjointed letters (must be running handwriting)'
        ]
      }
    }
  ]
};