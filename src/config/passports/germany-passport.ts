import { VisaPassportConfig } from '../visas/types';

export const germanyPassportConfig: VisaPassportConfig = {
    id: "germany-passport",
    title: "German Biometric Passport Photo Guidelines (Fotomustertafel)",
    country: "Germany",
    countryCode: "DE",
    type: "passport",
    channel: "both",
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
        requiredHex: "#E6E6E6",
        label: "Plain light-colored background (light grey is explicitly recommended)"
    },
    biometrics: {
        headRatioMin: 0.70,
        headRatioMax: 0.80,
        shouldersVisible: false,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Children under 6 years: Head height may range from 17 mm to 40 mm. Deviations in head posture, facial expression, and line of sight are permitted. Infants under 1 year: Eyes closed and open mouth are permitted. No support hands may be visible."
    },
    sourceVerification: {
        authority: "Federal Ministry of the Interior and Community (BMI) / Federal Foreign Office",
        officialUrl: "https://www.bmi.bund.de/SharedDocs/downloads/DE/veroeffentlichungen/themen/moderne-verwaltung/ausweise/fotomustertafel.html",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "German Passport Photo Requirements & Dimensions",
        metaDescription: "Official German biometric passport photo guidelines (Fotomustertafel). Ensure your photo meets the exact 35x45 mm (1.38 x 1.77 inches) physical print requirements for applications.",
        keywords: [
            "germany passport photo",
            "german biometric passport photo guidelines",
            "fotomustertafel",
            "germany passport photo size",
            "35x45 mm passport photo"
        ]
    }
};