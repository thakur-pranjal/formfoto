import { VisaPassportConfig } from '../visas/types';

export const pakistanPassportConfig: VisaPassportConfig = {
    id: "pakistan-passport",
    title: "Pakistan Passport Photo",
    country: "Pakistan",
    countryCode: "PK",
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
        minWidthPx: 350,
        minHeightPx: 467,
        maxKb: 3072,
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
        authority: "Directorate General of Immigration & Passports (DGI&P)",
        officialUrl: "https://onlinemrp.dgip.gov.pk/photo-requirements/",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Pakistan Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Pakistan passport photo specifications. Ensure your Online MRP photo is exactly 35x45 mm (1.38x1.77 inches) on a plain white background with contrasting clothing.",
        keywords: [
            "Pakistan passport photo",
            "Pakistan passport photo size",
            "DGIP photo requirements",
            "Online MRP photo",
            "35x45mm passport photo"
        ]
    }
};