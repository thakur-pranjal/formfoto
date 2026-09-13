import { VisaPassportConfig } from '../visas/types';

export const switzerlandPassportConfig: VisaPassportConfig = {
    id: "switzerland-passport",
    title: "Kriterien für die Annahme von Fotos für Pässe und Identitätskarten (Fotomustertafel)",
    country: "Switzerland",
    countryCode: "CH",
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
        requiredHex: "#E6E6E6",
        label: "Neutral background (A background that lacks contrast or is too bright is strictly prohibited)"
    },
    biometrics: {
        headRatioMin: 0.64,
        headRatioMax: 0.76,
        shouldersVisible: false,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Children under 11 years: The minimum head height from the chin to the crown is reduced to 23 mm."
    },
    sourceVerification: {
        authority: "Federal Office of Police (fedpol)",
        officialUrl: "https://www.fedpol.admin.ch/dam/de/sd-web/ZA--3ny9zRWt/fotomustertafel.pdf",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Swiss Passport Photo Requirements & Dimensions",
        metaDescription: "Official Switzerland passport photo guidelines (fedpol). Ensure your photo meets the exact 35x45 mm (1.38 x 1.77 inches) physical print requirements.",
        keywords: [
            "switzerland passport photo",
            "swiss passport photo requirements",
            "fedpol passport photo guidelines",
            "35x45 mm passport photo",
            "switzerland passport photo size"
        ]
    }
};