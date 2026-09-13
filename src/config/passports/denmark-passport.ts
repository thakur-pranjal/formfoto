import { VisaPassportConfig } from '../visas/types';

export const denmarkPassportConfig: VisaPassportConfig = {
    id: "denmark-passport",
    title: "Denmark Passport Photo",
    country: "Denmark",
    countryCode: "DK",
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
    background: {
        requiredHex: "#E5E7EB",
        label: "Light Blue, Light Grey, or White"
    },
    biometrics: {
        headRatioMin: 0.666,
        headRatioMax: 0.80,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "There must be only one person in the picture. Parents, hands, or toys must not be visible. All standard rules apply to children."
    },
    sourceVerification: {
        authority: "Danish Police (Politi) / Borgerservice",
        officialUrl: "https://www.borger.dk",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Denmark Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Denmark passport photo specifications. Ensure your Borgerservice passport photo is exactly 35x45 mm (1.38x1.77 inches) on a light-colored background.",
        keywords: [
            "Denmark passport photo",
            "Denmark passport photo size",
            "Borgerservice photo guidelines",
            "35x45mm passport photo",
            "Danish passport picture"
        ]
    }
};