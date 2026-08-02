import { FormatConfig } from '../formats';

export const kpsc_keralaConfig: FormatConfig = {
  id: 'kpsc_kerala',
  title: 'Kerala PSC OTR 2026',
  description: 'Official document formatting requirements for the Kerala Public Service Commission (KPSC) 2026 OTR cycle.',
  category: 'exam',
  subCategory: 'State Public Service Commission',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 413, // 3.5 cm at 300 DPI (3.5 / 2.54 * 300 = 413.38)
      height: 531, // 4.5 cm at 300 DPI (4.5 / 2.54 * 300 = 531.49)
      minKb: 10,
      maxKb: 30,
      stampRequired: false,
      rules: {
        exactPortalWidthPx: 150,
        exactPortalHeightPx: 200,
        allowedFormats: ['JPG'],
        backgroundColor: 'Light shade or white background',
        colorMode: 'Color or Black and White',
        headSizePercentage: 'Face and shoulders should be clear',
        eyePositionRule: 'Eyes open and vivid',
        facePosition: 'Front facial pose, face centrally focused',
        stampRequired: true,
        stampPosition: 'Bottom portion of the photograph',
        stampFormat: 'Name of the candidate and the date of taking the photograph printed in two lines in black text on a white rectangular background.',
        validity: 'A photograph once uploaded meeting all requirements shall be valid for 10 years from the date of uploading.',
        dimensionRestrictions: 'Strictly enforced by portal (150W x 200H px for photo)',
        autoCropByPortal: 'Portal provides a "RESIZE PHOTOGRAPH/SIGNATURE" tool with selection rectangles for positioning the face',
        rejectionReasons: [
          'Face not at the central portion (triggers a portal error)',
          "Missing the candidate's name and date at the bottom",
          'Uploading an unclear or side-profile photo',
          'Using a photograph taken before 31.12.2010.'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 150, // Provided explicitly in pixels
      height: 100, // Provided explicitly in pixels
      minKb: 10,
      maxKb: 30,
      stampRequired: false,
      rules: {
        allowedFormats: ['JPG'],
        inkColor: 'Blue or black ink',
        backgroundColor: 'Good quality white paper',
        dimensionRestrictions: 'Strictly enforced by portal (150W x 100H px for signature)',
        autoCropByPortal: 'Portal provides a "RESIZE PHOTOGRAPH/SIGNATURE" tool with selection rectangles for positioning the face'
      }
    }
  ]
};