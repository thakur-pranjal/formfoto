import { VisaPassportConfig } from '../visas/types';

export const sriLankaPassportConfig: VisaPassportConfig = {
    id: "sri-lanka-passport",
    title: "Sri Lanka Passport Photo",
    country: "Sri Lanka",
    countryCode: "LK",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 3,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Plain White"
    },
    biometrics: {
        headRatioMin: 0.70,
        headRatioMax: 0.80,
        shouldersVisible: true,
        glassesAllowed: false,
        smileAllowed: false,
        contrastWarning: true
    },
    sourceVerification: {
        authority: "Department of Immigration and Emigration (DIE)",
        officialUrl: "https://www.immigration.gov.lk",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Sri Lanka Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Sri Lanka passport photo specifications. Ensure your DIE passport photo is exactly 35x45 mm (1.38x1.77 inches) on a plain white background with no glasses.",
        keywords: [
            "Sri Lanka passport photo",
            "Sri Lanka passport photo size",
            "DIE passport photo guidelines",
            "35x45mm passport photo",
            "Sri Lankan passport picture"
        ]
    }
};