import { VisaPassportConfig } from '../visas/types';

export const ukPassportConfig: VisaPassportConfig = {
    id: "uk-passport",
    title: "UK Passport",
    country: "United Kingdom",
    countryCode: "GB",
    type: "passport",
    channel: "both",
    applicableCategories: ["passport", "passport_renewal"],
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 2,
        printSheetSize: "4x6",
        backSideRequired: false,
        backSideInstructions: "Unmarked on both sides (unless a photo needs to be countersigned)",
    },
    digital: {
        minWidthPx: 600,
        minHeightPx: 750,
        minKb: 50,
        maxKb: 10000,
        allowedFormats: ["jpg", "jpeg"],
    },
    background: {
        requiredHex: "#E6E6E3",
        label: "Plain cream or light grey",
    },
    biometrics: {
        headRatioMin: 0.6444,
        headRatioMax: 0.7556,
        shouldersVisible: true,
        glassesAllowed: false,
        smileAllowed: false,
        contrastWarning: true,
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Children under 6 do not need a plain expression or to look directly at the camera. Children under 1 do not need eyes open. Support hands must not be visible. No toys or dummies.",
    },
    sourceVerification: {
        authority: "HM Passport Office",
        officialUrl: "https://www.gov.uk/photos-for-passports",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority.",
    },
    seo: {
        metaTitle: "UK Passport Photo Requirements, Dimensions & Size Details",
        metaDescription: "Get complete UK passport photo guidelines. Ensure your physical (35x45 mm / 1.38x1.77 inches) or digital photo meets HM Passport Office compliance standards.",
        keywords: [
            "UK passport photo size",
            "GB passport picture requirements",
            "HM Passport Office digital photo",
            "35x45mm passport photo UK",
            "UK digital passport upload"
        ],
    },
};