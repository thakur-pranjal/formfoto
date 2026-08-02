import { FormatConfig } from '../formats';

export const mpscConfig: FormatConfig = {
  id: 'mpsc',
  title: 'MPSC OTR 2026',
  description: 'Official document formatting requirements for the Maharashtra Public Service Commission (MPSC) 2026 OTR cycle.',
  category: 'exam',
  subCategory: 'State Public Service Commission',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // 3.5 cm at 300 DPI (3.5 / 2.54 * 300 = 413.38)
      height: 531, // 4.5 cm at 300 DPI (4.5 / 2.54 * 300 = 531.49)
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Solid color (preferably Blue, Green, Red)',
        colorMode: 'Color',
        eyePositionRule: 'No red eyes allowed',
        facePosition: 'Full face view directly facing the camera',
        shadowAllowed: false,
        validity: 'Recent passport size photograph required',
        namingConvention: 'File name must be a maximum of 10 characters',
        rejectionReasons: [
          'Uploading a photo or signature with watermarks, stamps, or mobile app scanning logos',
          'Shadows on the face or background',
          '"Red eye" caused by flashes',
          'File names exceeding 10 characters'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 413, // 3.5 cm at 300 DPI (3.5 / 2.54 * 300 = 413.38)
      height: 177, // 1.5 cm at 300 DPI (1.5 / 2.54 * 300 = 177.16)
      minKb: 10,
      maxKb: 50,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ink only',
        backgroundColor: 'Blank white plain paper',
        namingConvention: 'File name must be a maximum of 10 characters',
        rejectionReasons: [
          'Uploading a photo or signature with watermarks, stamps, or mobile app scanning logos',
          'Signature not scribed by the applicant',
          'File names exceeding 10 characters'
        ]
      }
    }
  ]
};