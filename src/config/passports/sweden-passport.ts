import { VisaPassportConfig } from '../visas/types';

export const swedenPassportConfig: VisaPassportConfig = {
    id: "sweden-passport",
    title: "Sweden Passport Photo",
    country: "Sweden",
    countryCode: "SE",
    type: "passport",
    channel: "physical_print",
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
    background: {
        requiredHex: "#FFFFFF",
        label: "Plain White, Light Grey, or Cream"
    },
    biometrics: {
        headRatioMin: 0.70,
        headRatioMax: 0.80,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: false
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Infants must be photographed alone (no parents, hands, or toys visible), preferably lying on a plain white blanket. The child's eyes must be open (unless sleeping/newborn)."
    },
    sourceVerification: {
        authority: "Swedish Police Authority (Polismyndigheten) / Ministry for Foreign Affairs (Sweden Abroad)",
        officialUrl: "https://polisen.se",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Sweden Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Sweden passport photo specifications. Ensure your physical passport photo is exactly 35x45 mm (1.38x1.77 inches) on a plain white, light grey, or cream background.",
        keywords: [
            "Sweden passport photo",
            "Swedish passport photo size",
            "Polismyndigheten passport photo guidelines",
            "35x45mm passport photo",
            "Sweden provisional passport picture"
        ]
    }
};