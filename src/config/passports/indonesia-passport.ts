import { VisaPassportConfig } from '../visas/types';

export const indonesiaPassportConfig: VisaPassportConfig = {
    id: "indonesia-passport",
    title: "Indonesia Passport Photo",
    country: "Indonesia",
    countryCode: "ID",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 2,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    digital: {
        minWidthPx: 413,
        minHeightPx: 531,
        allowedFormats: ["JPEG", "JPG", "PNG"]
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Pure White"
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
        authority: "Directorate General of Immigration (Ditjen Imigrasi) / Ministry of Foreign Affairs (Kemlu)",
        officialUrl: "https://www.imigrasi.go.id",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Indonesia Passport Photo Requirements & Size Guidelines",
        metaDescription: "Official Indonesia passport photo specifications. Ensure your passport photo is exactly 35x45 mm (1.38x1.77 inches) on a pure white background with dark, collared clothing.",
        keywords: [
            "Indonesia passport photo",
            "Indonesia passport photo size",
            "Ditjen Imigrasi photo guidelines",
            "Indonesian passport picture",
            "35x45mm passport photo"
        ]
    }
};