import { VisaPassportConfig } from '../visas/types';

export const portugalPassportConfig: VisaPassportConfig = {
    id: "portugal-passport",
    title: "Portugal Passport",
    country: "Portugal",
    countryCode: "PT",
    type: "passport",
    channel: "physical_print",
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
        requiredHex: "#FFFFFF",
        label: "Neutral, light, and plain background"
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
        relaxedConstraints: "Must be taken facing the camera from a distance of 60 to 80 cm, centered, sharp, with a plain neutral background."
    },
    sourceVerification: {
        authority: "Instituto dos Registos e do Notariado (IRN) / Ministério dos Negócios Estrangeiros (MNE)",
        officialUrl: "https://justica.gov.pt/Registos/Identificacao/Passaporte-eletronico",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Portugal Passport Photo Size, Specifications & Guidelines",
        metaDescription: "Official Portugal passport (Passaporte Eletrónico) photo guidelines. For infant exceptions, physical print dimensions must be exactly 35mm by 45mm (1.38 x 1.77 inches) with dark clothing against a light neutral background.",
        keywords: [
            "Portugal passport photo",
            "Portuguese passport photo size",
            "PT passport guidelines",
            "Passaporte Eletrónico Português",
            "IRN passport rules"
        ]
    }
};