import { VisaPassportConfig } from '../visas/types';

export const brazilPassportConfig: VisaPassportConfig = {
    id: "brazil-passport",
    title: "Brazil Passport",
    country: "Brazil",
    countryCode: "BR",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7143,
    physical: {
        widthMm: 50,
        heightMm: 70,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false,
        backSideInstructions: "No printed dates or stamps (sem data)"
    },
    digital: {
        minWidthPx: 428,
        minHeightPx: 600,
        maxKb: 5120,
        allowedFormats: ["JPEG", "JPG", "PNG"]
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Pure White (Fundo branco)"
    },
    biometrics: {
        headRatioMin: 0.70,
        headRatioMax: 0.80,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Under 5 years old: A physical 5x7 cm photo is mandatory in Brazil. The photo must be on a white background, colored, recent, without a date, and without toys, pacifiers, or supporting hands/parents visible."
    },
    sourceVerification: {
        authority: "Polícia Federal (PF) / Ministério das Relações Exteriores (MRE - Itamaraty)",
        officialUrl: "https://www.gov.br/pf/pt-br/assuntos/passaporte/ajuda/duvidas_/atendimento/atendimento-posso-levar-uma-fotografia",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Brazil Passport Photo Size, Specifications & Guidelines",
        metaDescription: "Official Brazil passport photo guidelines. Physical prints (mandatory for children under 5) must be 50mm by 70mm (1.97 x 2.75 inches). Digital uploads must be under 5 MB with a pure white background.",
        keywords: [
            "Brazil passport photo",
            "Brazilian passport photo size",
            "BR passport guidelines",
            "5x7 cm passport photo",
            "Polícia Federal passport requirements",
            "e-consular photo upload"
        ]
    }
};