import { VisaPassportConfig } from '../visas/types';

export const nepalPassportConfig: VisaPassportConfig = {
    id: "nepal-passport",
    title: "Nepal Passport Photo",
    country: "Nepal",
    countryCode: "NP",
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
        maxKb: 300,
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
    infantRules: {
        applicable: true,
        relaxedConstraints: "No other person, hands, toys, or objects may be visible in the photo."
    },
    sourceVerification: {
        authority: "Department of Passports, Ministry of Foreign Affairs",
        officialUrl: "https://nepalpassport.gov.np",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Nepal Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Nepal passport photo specifications. Ensure your e-passport photo is exactly 35x45 mm (1.38x1.77 inches) on a plain white background with contrasting clothing.",
        keywords: [
            "Nepal passport photo",
            "Nepal passport photo size",
            "Nepal e-passport photo requirements",
            "35x45mm passport photo",
            "Nepali passport picture"
        ]
    }
};