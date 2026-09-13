import { VisaPassportConfig } from '../visas/types';

export const austriaPassportConfig: VisaPassportConfig = {
    id: "austria-passport",
    title: "Austria Passport Photo",
    country: "Austria",
    countryCode: "AT",
    type: "passport",
    channel: "physical_print",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 600,
        paperFinish: "glossy",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    background: {
        requiredHex: "#E5E7EB",
        label: "Plain Light Grey or White"
    },
    biometrics: {
        headRatioMin: 0.71,
        headRatioMax: 0.80,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Children must be photographed alone with no parents, supporting hands, or toys visible. Infants must have their eyes open."
    },
    sourceVerification: {
        authority: "Bundesministerium für Inneres (BMI) / Passbehörden",
        officialUrl: "https://www.oesterreich.gv.at/de/lexicon/P/Seite.991253",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Austria Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Austria passport photo specifications. Ensure your BMI physical passport photo is exactly 35x45 mm (1.38x1.77 inches) on a plain light grey or white background with dark clothing.",
        keywords: [
            "Austria passport photo",
            "Austria passport photo size",
            "BMI passport photo guidelines",
            "35x45mm passport photo",
            "Austrian passport picture"
        ]
    }
};