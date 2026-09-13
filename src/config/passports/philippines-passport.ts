import { VisaPassportConfig } from '../visas/types';

export const philippinesPassportConfig: VisaPassportConfig = {
    id: "philippines-passport",
    title: "Philippines Passport Photo",
    country: "Philippines",
    countryCode: "PH",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 600,
        paperFinish: "any",
        copiesRequired: 2,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    digital: {
        minWidthPx: 413,
        minHeightPx: 531,
        maxKb: 2048,
        allowedFormats: ["JPEG", "JPG"]
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
        authority: "Department of Foreign Affairs (DFA)",
        officialUrl: "https://passport.gov.ph",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Philippines Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Philippines passport photo specifications. Ensure your DFA photo is exactly 35x45 mm (1.38x1.77 inches) on a plain white background with no glasses or jewelry.",
        keywords: [
            "Philippines passport photo",
            "PH passport photo size",
            "DFA passport photo guidelines",
            "35x45mm passport photo",
            "Philippines digital passport picture"
        ]
    }
};