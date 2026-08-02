import { FormatConfig } from '../formats';

export const hp_police_constableConfig: FormatConfig = {
  id: 'hp_police_constable',
  title: 'Himachal Pradesh Police Constable (HPPSC) 2024-2025',
  description: 'Strict format guidelines and exact pixel specifications for the HPPSC ORA portal for Himachal Pradesh Police Constable applications.',
  category: 'exam',
  subCategory: 'Police',
  documents: [
    {
      id: 'photo',
      name: 'Passport Photograph',
      width: 110,
      height: 140,
      minKb: 10,
      maxKb: 40,
    stampRequired: false,
      rules: {
        minPixels: '110 x 140 px',
        allowedFormats: ['JPG', 'JPEG'],
        backgroundColor: 'Not specified (White or light color preferred)',
        colorMode: 'Color / Black & White (Both acceptable per HPPSC guidelines)',
        facePosition: 'Frontal view',
        shadowAllowed: false,
        glassesAllowed: 'Normal spectacles are allowed; Dark glasses and goggles are strictly prohibited',
        headwearAllowed: 'No (Caps are strictly prohibited)',
        nameAndDateStampRequired: false,
        onlyJpgAllowed: true,
        pngAllowed: false,
        compressionRestrictions: 'Files must not exceed the strict 40 KB limit.',
        dimensionRestrictions: 'HPPSC portal strictly checks pixel dimensions (Photo: 110 px width by 140 px height).',
        autoCropByPortal: 'Not specified (Candidates are advised to use MS Paint or similar tools to crop manually before uploading).',
        changeFromPreviousYear: 'The recruitment process for Himachal Pradesh Police Constables has been handed over to the Himachal Pradesh Public Service Commission (HPPSC), meaning candidates must now adhere to the standardized HPPSC ORA (Online Recruitment Application) portal specifications rather than the older HP Police standalone portal rules.',
        validUntil: 'Photograph must be a recent passport-style picture.',
        commonRejectionReasons: [
          'Failing to meet the strict pixel dimension requirements (110x140 px), causing the ORA portal to reject the upload.',
          'Uploading images larger than 40 KB.',
          'Wearing a cap or dark goggles in the uploaded photograph.'
        ]
      }
    },
    {
      id: 'signature',
      name: 'Signature',
      width: 140,
      height: 110,
      minKb: 10,
      maxKb: 40,
    stampRequired: false,
      rules: {
        allowedFormats: ['JPG', 'JPEG'],
        inkColor: 'Black ink pen ONLY',
        backgroundColor: 'White paper',
        onlyJpgAllowed: true,
        pngAllowed: false,
        compressionRestrictions: 'Files must not exceed the strict 40 KB limit.',
        dimensionRestrictions: 'HPPSC portal strictly checks pixel dimensions (Signature: 140 px width by 110 px height).',
        commonRejectionReasons: [
          'Failing to meet the strict pixel dimension requirements (140x110 px), causing the ORA portal to reject the upload.',
          'Uploading images larger than 40 KB.',
          'Signing with a blue pen instead of the mandated black ink.'
        ]
      }
    }
  ]
};