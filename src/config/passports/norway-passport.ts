import { VisaPassportConfig } from '../visas/types';

export const norwayPassportConfig: VisaPassportConfig = {
    id: "norway-passport",
    title: "Norway Passport Photo",
    country: "Norway",
    countryCode: "NO",
    type: "passport",
    channel: "physical_print",
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
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Babies can be photographed lying on a white sheet or held by a parent (the parent and their hands must not be visible). For newborns, eyes do not need to be completely open, but the face must be visible. Pacifiers (dummies) and toys are strictly forbidden."
    },
    sourceVerification: {
        authority: "Norwegian Police Service (Politiet)",
        officialUrl: "https://www.politiet.no",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Norway Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Norway passport photo specifications. Ensure your Politiet physical passport photo is exactly 35x45 mm (1.38x1.77 inches) on a plain white or light grey background.",
        keywords: [
            "Norway passport photo",
            "Norway passport photo size",
            "Politiet passport photo guidelines",
            "35x45mm passport photo",
            "Norwegian passport picture"
        ]
    }
};