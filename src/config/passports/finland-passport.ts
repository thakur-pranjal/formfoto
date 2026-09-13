import { VisaPassportConfig } from '../visas/types';

export const finlandPassportConfig: VisaPassportConfig = {
    id: "finland-passport",
    title: "Finland Passport Photo",
    country: "Finland",
    countryCode: "FI",
    type: "passport",
    channel: "both",
    aspectRatio: 0.766,
    physical: {
        widthMm: 36,
        heightMm: 47,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    digital: {
        minWidthPx: 500,
        minHeightPx: 653,
        maxWidthPx: 500,
        maxHeightPx: 653,
        maxKb: 250,
        allowedFormats: ["JPEG"]
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "White or Light Grey"
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
        relaxedConstraints: "Very young babies may have their mouths slightly open. All children, regardless of age, must have their eyes open. No parents or supporting hands may be visible in the frame."
    },
    sourceVerification: {
        authority: "Finnish Police (Poliisi)",
        officialUrl: "https://poliisi.fi",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Finland Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Finland passport photo specifications. Ensure your Poliisi passport photo is exactly 36x47 mm (1.42x1.85 inches) or precisely 500x653 pixels on a light background.",
        keywords: [
            "Finland passport photo",
            "Finland passport photo size",
            "Poliisi passport photo guidelines",
            "36x47mm passport photo",
            "500x653 pixels photo"
        ]
    }
};