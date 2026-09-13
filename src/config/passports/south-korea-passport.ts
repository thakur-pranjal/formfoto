import { VisaPassportConfig } from '../visas/types';

export const southKoreaPassportConfig: VisaPassportConfig = {
    id: "south-korea-passport",
    title: "South Korea Passport",
    country: "South Korea",
    countryCode: "KR",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    digital: {
        minWidthPx: 395,
        minHeightPx: 507,
        maxWidthPx: 431,
        maxHeightPx: 550,
        maxKb: 500,
        allowedFormats: ["JPG", "JPEG"]
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Pure White"
    },
    biometrics: {
        headRatioMin: 0.711,
        headRatioMax: 0.80,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Infants under 36 months are permitted to have their mouths slightly open. Toys, pacifiers, or supporting hands/parents must not be visible."
    },
    sourceVerification: {
        authority: "Ministry of Foreign Affairs (MOFA)",
        officialUrl: "https://www.passport.go.kr/home/kor/contents.do?menuPos=32",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "South Korea Passport Photo Size, Specifications & Guidelines",
        metaDescription: "Official South Korea passport photo guidelines. Physical print dimensions must be exactly 35mm by 45mm (1.38 x 1.77 inches). Digital dimensions must range from 395x507 to 431x550 pixels with a pure white background.",
        keywords: [
            "South Korea passport photo",
            "Korean passport photo size",
            "KR passport guidelines",
            "South Korea digital passport photo",
            "Ministry of Foreign Affairs passport rules"
        ]
    }
};