import { VisaPassportConfig } from '../visas/types';

export const irelandPassportConfig: VisaPassportConfig = {
    id: "ireland-passport",
    title: "Ireland Passport",
    country: "Ireland",
    countryCode: "IE",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 4,
        printSheetSize: "4x6",
        backSideRequired: true,
        backSideInstructions: "Reverse of the photos must be white and unglazed"
    },
    digital: {
        minWidthPx: 715,
        minHeightPx: 951,
        maxKb: 9216,
        allowedFormats: ["JPEG"]
    },
    background: {
        requiredHex: "#E0E0E0",
        label: "Completely plain, light grey, white, or cream"
    },
    biometrics: {
        headRatioMin: 0.70,
        headRatioMax: 0.80,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Can be photographed lying down on a plain white surface. No hands, arms, or other persons can be visible supporting the child. Soothers/pacifiers are prohibited as they obscure facial features."
    },
    sourceVerification: {
        authority: "Department of Foreign Affairs / Passport Service",
        officialUrl: "https://www.ireland.ie/en/dfa/passports/photo-guidelines/",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Ireland Passport Photo Size, Specifications & Guidelines",
        metaDescription: "Official Ireland passport photo guidelines. Physical print dimensions must be 35mm to 38mm by 45mm to 50mm (1.38-1.50 x 1.77-1.97 inches). Digital dimensions must be at least 715x951 pixels.",
        keywords: [
            "Ireland passport photo",
            "Irish passport photo size",
            "IE passport guidelines",
            "Ireland digital passport photo",
            "Department of Foreign Affairs passport rules"
        ]
    }
};