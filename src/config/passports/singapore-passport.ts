import { VisaPassportConfig } from '../visas/types';

export const singaporePassportConfig: VisaPassportConfig = {
    id: "singapore-passport",
    title: "Singapore Passport Photo Guidelines",
    country: "Singapore",
    countryCode: "SG",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 300,
        paperFinish: "matte",
        copiesRequired: 2,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    digital: {
        minWidthPx: 400,
        minHeightPx: 514,
        maxKb: 8192,
        allowedFormats: ["JPEG", "JPG", "PNG", "HEIC", "HEIF"]
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Plain white (or light grey if the applicant's hair is white)"
    },
    biometrics: {
        headRatioMin: 0.56,
        headRatioMax: 0.78,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: false
    },
    infantRules: {
        applicable: false
    },
    sourceVerification: {
        authority: "Immigration & Checkpoints Authority (ICA)",
        officialUrl: "https://www.ica.gov.sg/photo-guidelines",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Singapore Passport Photo Requirements & Dimensions",
        metaDescription: "Official Singapore passport photo guidelines (ICA). Ensure your physical photo meets the exact 35x45 mm (1.38 x 1.77 inches) size and 400x514 px digital requirements.",
        keywords: [
            "singapore passport photo",
            "singapore passport photo requirements",
            "ica passport photo",
            "35x45 mm passport photo",
            "singapore digital passport photo"
        ]
    }
};