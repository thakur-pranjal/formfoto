import { VisaPassportConfig } from '../visas/types';

export const saudiArabiaPassportConfig: VisaPassportConfig = {
    id: "saudi-arabia-passport",
    title: "Saudi Arabia Passport",
    country: "Saudi Arabia",
    countryCode: "SA",
    type: "passport",
    channel: "both",
    aspectRatio: 0.6667,
    physical: {
        widthMm: 40,
        heightMm: 60,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    digital: {
        minWidthPx: 472,
        minHeightPx: 709,
        maxKb: 1024,
        allowedFormats: ["JPEG"]
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "White"
    },
    biometrics: {
        headRatioMin: 0.70,
        headRatioMax: 0.80,
        shouldersVisible: false,
        glassesAllowed: false,
        smileAllowed: false,
        contrastWarning: false
    },
    sourceVerification: {
        authority: "General Directorate of Passports (Jawazat) / Ministry of Interior (Absher)",
        officialUrl: "N/A",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Saudi Arabia Passport Photo Size, Specifications & Guidelines",
        metaDescription: "Official Saudi Arabia passport photo guidelines. Physical print dimensions must be exactly 40mm by 60mm (1.57 x 2.36 inches). Digital dimensions must maintain a 2:3 ratio with a pure white background.",
        keywords: [
            "Saudi Arabia passport photo",
            "Saudi passport photo size",
            "SA passport guidelines",
            "Jawazat passport photo rules",
            "Absher digital passport photo"
        ]
    }
};