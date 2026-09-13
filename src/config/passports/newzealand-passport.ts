import { VisaPassportConfig } from '../visas/types';

export const newzealandPassportConfig: VisaPassportConfig = {
    id: "new-zealand-passport",
    title: "New Zealand Passport Photo Requirements",
    country: "New Zealand",
    countryCode: "NZ",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 300,
        paperFinish: "glossy",
        copiesRequired: 2,
        printSheetSize: "4x6",
        backSideRequired: true,
        backSideInstructions: "Write full name and date on the back of 1 photo (for standard applications); a witness must write on the back of one photo for applications requiring a witness declaration."
    },
    digital: {
        minWidthPx: 900,
        minHeightPx: 1200,
        maxWidthPx: 4500,
        maxHeightPx: 6000,
        minKb: 250,
        maxKb: 5120,
        allowedFormats: ["JPEG", "JPG"]
    },
    background: {
        requiredHex: "#E6E6E6",
        label: "Plain, light-coloured background (but not white). Pale greys and blues are recommended."
    },
    biometrics: {
        headRatioMin: 0.80,
        headRatioMax: 0.80,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Babies can be laid on a plain, light-coloured sheet and photographed from above. The baby's entire face must be visible with eyes open. No other people, objects, or support hands should be visible."
    },
    sourceVerification: {
        authority: "Department of Internal Affairs",
        officialUrl: "https://www.passports.govt.nz/passport-photos",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "New Zealand Passport Photo Requirements & Dimensions",
        metaDescription: "Official New Zealand passport photo guidelines. Ensure your photo meets the exact 35x45 mm (1.38 x 1.77 inches) physical print and digital upload size requirements.",
        keywords: [
            "new zealand passport photo",
            "nz passport photo requirements",
            "new zealand passport photo size",
            "35x45 mm passport photo",
            "nz digital passport photo",
            "department of internal affairs passport photo"
        ]
    }
};