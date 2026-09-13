import { VisaPassportConfig } from '../visas/types';

export const southAfricaPassportConfig: VisaPassportConfig = {
    id: "south-africa-passport",
    title: "South Africa Passport",
    country: "South Africa",
    countryCode: "ZA",
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
    background: {
        requiredHex: "#FFFFFF",
        label: "Plain White or Light Grey"
    },
    biometrics: {
        headRatioMin: 0.70,
        headRatioMax: 0.80,
        shouldersVisible: true,
        glassesAllowed: false,
        smileAllowed: false,
        contrastWarning: false
    },
    sourceVerification: {
        authority: "Department of Home Affairs (DHA)",
        officialUrl: "https://www.dha.gov.za/ / https://ehome.dha.gov.za/",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "South Africa Passport Photo Size, Specifications & Guidelines",
        metaDescription: "Official South Africa passport photo guidelines. Physical print dimensions must be exactly 35mm by 45mm (1.38 x 1.77 inches) on a plain white or light grey background.",
        keywords: [
            "South Africa passport photo",
            "South African passport photo size",
            "ZA passport guidelines",
            "DHA passport photo rules",
            "Department of Home Affairs passport"
        ]
    }
};