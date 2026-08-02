import { FormatConfig } from '../formats';

export const afcatConfig: FormatConfig = {
  id: 'afcat',
  title: 'AFCAT 02/2026',
  description: 'Complete image upload specifications, including photo, signature, and thumb impression guidelines, for the Air Force Common Admission Test (AFCAT) 02/2026.',
  category: 'exam',
  subCategory: 'Defence',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photo',
      width: 0,
      height: 0,
      minKb: 100,
      maxKb: 200,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Light / Plain White',
        colorMode: 'Colour',
        facePosition: 'Full face frontal view',
        shadowAllowed: false,
        glassesAllowed: 'No dark glasses / sunglasses',
        smileAllowed: 'Natural expression (no grinning)',
        headwearAllowed: 'No (except for customary religious practices)',
        nameAndDateStampRequired: false,
        liveWebcamCaptureMandatory: true,
        rejectionReasons: [
          'Blurred images',
          'Dark background',
          'Wearing spectacles with glare or sunglasses',
          'Failing the live webcam capture verification'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 0,
      height: 0,
      minKb: 80,
      maxKb: 150,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ink',
        backgroundColor: 'Plain white paper',
        allCapitalLettersAllowed: false,
        rejectionReasons: [
          'Blurred images',
          'Signature in all capital letters'
        ]
      }
    },
    {
      id: 'thumb_impression',
      name: 'Thumb Impression',
      width: 0,
      height: 0,
      minKb: 50,
      maxKb: 100,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        colorRequirements: 'Created by pressing on ink stamp pad',
        maleRequirement: 'Left thumb',
        femaleRequirement: 'Right thumb',
        rejectionReasons: [
          'Blurred images',
          'Uploading wrong thumb impression (e.g., male uploading right thumb)'
        ]
      }
    }
  ]
};