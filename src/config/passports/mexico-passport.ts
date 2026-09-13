import { VisaPassportConfig } from '../visas/types';

export const mexicoPassportConfig: VisaPassportConfig = {
    id: "mexico-passport",
    title: "Mexico Passport Photo",
    country: "Mexico",
    countryCode: "MX",
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
        label: "Plain White"
    },
    biometrics: {
        headRatioMin: 0.70,
        headRatioMax: 0.80,
        shouldersVisible: false,
        glassesAllowed: false,
        smileAllowed: false,
        contrastWarning: false
    },
    sourceVerification: {
        authority: "Secretaría de Relaciones Exteriores (SRE)",
        officialUrl: "https://www.gob.mx/sre",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Mexico Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Mexico passport photo specifications. Ensure your SRE physical passport photo is exactly 35x45 mm (1.38x1.77 inches) on a plain white background with no glasses.",
        keywords: [
            "Mexico passport photo",
            "Mexico passport photo size",
            "SRE passport photo guidelines",
            "35x45mm passport photo",
            "Mexican passport picture"
        ]
    }
};