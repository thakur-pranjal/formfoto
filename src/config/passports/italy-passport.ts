import { VisaPassportConfig } from '../visas/types';

export const italyPassportConfig: VisaPassportConfig = {
    id: "italy-passport",
    title: "Caratteristiche Fotografie Passaporto (Polizia di Stato / ICAO)",
    country: "Italy",
    countryCode: "IT",
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
        label: "Plain light color (White is standard practice)"
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
        applicable: false
    },
    sourceVerification: {
        authority: "Polizia di Stato / Ministero dell'Interno",
        officialUrl: "https://www.poliziadistato.it/statics/10/fotografia_passaporto_web.pdf",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Italian Passport Photo Requirements & Dimensions",
        metaDescription: "Official Italian passport photo guidelines (Polizia di Stato). Ensure your photo meets the exact 35x45 mm (1.38 x 1.77 inches) physical print size requirements.",
        keywords: [
            "italy passport photo",
            "italian passport photo requirements",
            "italy passport photo size",
            "35x45 mm passport photo",
            "polizia di stato passport photo"
        ]
    }
};