import { VisaPassportConfig } from '../visas/types';

export const japanPassportConfig: VisaPassportConfig = {
    id: "japan-passport",
    title: "Japanese Passport Photo Requirements (パスポート申請用写真の規格)",
    country: "Japan",
    countryCode: "JP",
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
        backSideRequired: true,
        backSideInstructions: "Applicant's name must be written on the back (Caution: Do not press too hard so the ink bleeds or the writing embosses the front of the photo)"
    },
    digital: {
        minWidthPx: 600,
        minHeightPx: 771,
        minKb: 20,
        maxKb: 2048,
        allowedFormats: ["JPG", "JPEG", "BMP", "PNG"],
        colorSpace: "RGB"
    },
    signature: {
        required: true,
        minWidthPx: 788,
        minHeightPx: 284,
        maxKb: 2048,
        inkColor: "Black or dark blue ink on a plain white background without dirt/stains or lines"
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Plain, light background (White is officially recommended by MOFA)"
    },
    biometrics: {
        headRatioMin: 0.71,
        headRatioMax: 0.80,
        shouldersVisible: false,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: false
    },
    infantRules: {
        applicable: false
    },
    sourceVerification: {
        authority: "Ministry of Foreign Affairs of Japan (MOFA)",
        officialUrl: "https://www.mofa.go.jp/mofaj/toko/passport/ic_photo.html",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Japanese Passport Photo Requirements & Dimensions",
        metaDescription: "Official Japanese passport photo guidelines. Ensure your photo meets the exact 35x45 mm (1.38 x 1.77 inches) physical print and digital upload size requirements.",
        keywords: [
            "japan passport photo",
            "japanese passport photo requirements",
            "japan passport photo size",
            "35x45 mm passport photo",
            "mofa passport photo",
            "japan digital passport photo"
        ]
    }
};