import { VisaPassportConfig } from '../visas/types';

export const chinaPassportConfig: VisaPassportConfig = {
    id: "china-passport",
    title: "China Passport",
    country: "China",
    countryCode: "CN",
    type: "passport",
    channel: "both",
    aspectRatio: 0.6875,
    physical: {
        widthMm: 33,
        heightMm: 48,
        targetDpi: 300,
        paperFinish: "glossy",
        copiesRequired: 2,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    digital: {
        minWidthPx: 354,
        minHeightPx: 472,
        maxWidthPx: 480,
        maxHeightPx: 640,
        minKb: 20,
        maxKb: 80,
        allowedFormats: ["JPEG", "JPG"],
        colorSpace: "24-bit RGB true color"
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Uniform Pure White, Light Grey, or Light Blue"
    },
    biometrics: {
        headRatioMin: 0.583,
        headRatioMax: 0.687,
        shouldersVisible: true,
        glassesAllowed: false,
        smileAllowed: false,
        contrastWarning: true
    },
    sourceVerification: {
        authority: "National Immigration Administration (NIA) / Ministry of Foreign Affairs (MFA)",
        officialUrl: "https://s.nia.gov.cn/mps/bszy/qcwbzpzy/zpzy/202405/t20240528_1001.html",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "China Passport Photo Size, Specifications & Guidelines",
        metaDescription: "Official China passport photo guidelines. Physical print dimensions must be exactly 33mm by 48mm (1.30 x 1.89 inches). Digital dimensions must range from 354x472 to 480x640 pixels with a maximum file size of 80 KB.",
        keywords: [
            "China passport photo",
            "Chinese passport photo size",
            "CN passport guidelines",
            "NIA passport photo rules",
            "China digital passport photo"
        ]
    }
};