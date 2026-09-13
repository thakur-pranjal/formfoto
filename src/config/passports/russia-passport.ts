import { VisaPassportConfig } from '../visas/types';

export const russiaPassportConfig: VisaPassportConfig = {
    id: "russia-passport",
    title: "Russia Passport Photo",
    country: "Russia",
    countryCode: "RU",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 600,
        paperFinish: "matte",
        copiesRequired: 3,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    digital: {
        minWidthPx: 413,
        minHeightPx: 531,
        minKb: 10,
        maxKb: 5120,
        allowedFormats: ["JPEG", "JPG", "PNG", "BMP"]
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Plain White or Light Gray"
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
        relaxedConstraints: "Children must be photographed alone with no hands, parents, or toys visible. For infants, photos can be taken lying down on a white sheet. Pacifiers (dummies) are prohibited."
    },
    sourceVerification: {
        authority: "Ministry of Internal Affairs (МВД России) / Gosuslugi (Госуслуги)",
        officialUrl: "https://www.gosuslugi.ru",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Russia Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Russia passport photo specifications. Ensure your Gosuslugi photo is exactly 35x45 mm (1.38x1.77 inches) on a plain white background with dark, contrasting clothing.",
        keywords: [
            "Russia passport photo",
            "Russian passport photo size",
            "Gosuslugi photo requirements",
            "35x45mm passport photo",
            "Russian passport picture"
        ]
    }
};