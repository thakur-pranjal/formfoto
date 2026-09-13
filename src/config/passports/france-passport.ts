import { VisaPassportConfig } from '../visas/types';

export const francePassportConfig: VisaPassportConfig = {
    id: "france-passport",
    title: "French Passport Photo Guidelines (Norme ISO/IEC 19794-5:2005)",
    country: "France",
    countryCode: "FR",
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
        label: "Plain light color (e.g., light blue, light grey). Pure white is strictly prohibited."
    },
    biometrics: {
        headRatioMin: 0.70,
        headRatioMax: 0.80,
        shouldersVisible: false,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: false
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "No other body part or person (such as support hands) must be visible in the photo."
    },
    sourceVerification: {
        authority: "Agence Nationale des Titres Sécurisés (ANTS) / Ministère de l'Intérieur",
        officialUrl: "https://passeport.ants.gouv.fr/tout-savoir/la-photographie-d-identite",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "French Passport Photo Requirements & Dimensions",
        metaDescription: "Official French passport photo guidelines (Norme ISO/IEC 19794-5:2005). Ensure your photo meets the exact 35x45 mm (1.38 x 1.77 inches) physical print requirements for ANTS.",
        keywords: [
            "france passport photo",
            "french passport photo requirements",
            "ants passport photo guidelines",
            "35x45 mm passport photo",
            "france passport photo size"
        ]
    }
};