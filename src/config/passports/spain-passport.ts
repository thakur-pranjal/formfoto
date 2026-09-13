import { VisaPassportConfig } from '../visas/types';

export const spainPassportConfig: VisaPassportConfig = {
    id: "spain-passport",
    title: "Requisitos de Fotografía para Pasaporte Español",
    country: "Spain",
    countryCode: "ES",
    type: "passport",
    channel: "physical_print",
    aspectRatio: 0.8125,
    physical: {
        widthMm: 26,
        heightMm: 32,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Uniform and plain white (fondo uniforme, blanco y liso)"
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
        applicable: false
    },
    sourceVerification: {
        authority: "Policía Nacional / Ministerio del Interior",
        officialUrl: "https://www.dnielectronico.es/portaldnie/PRF1_Cons02.action?pag=REF_1084",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Spanish Passport Photo Requirements & Dimensions",
        metaDescription: "Official Spanish passport photo guidelines. Ensure your photo meets the exact 26x32 mm (1.02 x 1.26 inches) physical print requirements for applications.",
        keywords: [
            "spain passport photo",
            "spanish passport photo requirements",
            "spain passport photo size",
            "26x32 mm passport photo",
            "policia nacional passport photo"
        ]
    }
};