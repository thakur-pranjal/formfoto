import { VisaPassportConfig } from '../visas/types';

export const netherlandsPassportConfig: VisaPassportConfig = {
    id: "netherlands-passport",
    title: "Photo Specification Guidelines 2020 (Fotomatrix)",
    country: "Netherlands",
    countryCode: "NL",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 400,
        paperFinish: "any",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    background: {
        requiredHex: "#E6E6E6",
        label: "Light grey, light blue, or white"
    },
    biometrics: {
        headRatioMin: 0.58,
        headRatioMax: 0.67,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: false
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Children under 6: Exempt from keeping eyes horizontally aligned, head not tilted, shoulders straight, neutral expression, and mouth closed. Any hands supporting the child must not be visible in the photo."
    },
    sourceVerification: {
        authority: "Rijksdienst voor Identiteitsgegevens (RvIG) / Government of the Netherlands",
        officialUrl: "https://www.government.nl/themes/justice-security-and-defence/identification-documents/requirements-for-photos",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Netherlands Passport Photo Requirements & Dimensions",
        metaDescription: "Official Netherlands passport photo guidelines (Fotomatrix). Ensure your photo meets the exact 35x45 mm (1.38 x 1.77 inches) physical print requirements for RvIG applications.",
        keywords: [
            "netherlands passport photo",
            "dutch passport photo requirements",
            "fotomatrix",
            "35x45 mm passport photo",
            "rvig passport photo",
            "netherlands digital passport photo"
        ]
    }
};