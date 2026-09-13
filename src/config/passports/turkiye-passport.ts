import { VisaPassportConfig } from '../visas/types';

export const turkiyePassportConfig: VisaPassportConfig = {
    id: "turkiye-passport",
    title: "Türkiye Passport Photo",
    country: "Türkiye",
    countryCode: "TR",
    type: "passport",
    channel: "physical_print",
    aspectRatio: 0.8333,
    physical: {
        widthMm: 50,
        heightMm: 60,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    digital: {
        minWidthPx: 591,
        minHeightPx: 709,
        allowedFormats: ["JPEG", "JPG"]
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Pure White"
    },
    biometrics: {
        headRatioMin: 0.53,
        headRatioMax: 0.60,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Infants must be photographed alone with no parents, hands, or toys visible in the frame. Eyes must be open and looking at the camera."
    },
    sourceVerification: {
        authority: "Nüfus ve Vatandaşlık İşleri Genel Müdürlüğü (NVİ) / Ministry of Interior",
        officialUrl: "https://nvi.gov.tr",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Türkiye Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Türkiye (Turkey) passport photo specifications. Ensure your NVİ biometric photo is exactly 50x60 mm (1.97x2.36 inches) on a pure white background with dark clothing.",
        keywords: [
            "Türkiye passport photo",
            "Turkey passport photo size",
            "NVİ biometric photo guidelines",
            "50x60mm passport photo",
            "Turkish passport picture"
        ]
    }
};