import { VisaPassportConfig } from '../visas/types';

export const indiaPassportConfig: VisaPassportConfig = {
    id: "india-passport",
    title: "Indian Passport",
    country: "India",
    countryCode: "IN",
    type: "passport",
    channel: "both",
    applicableCategories: ["standard", "diplomatic", "official", "minor"],
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false,
        backSideInstructions: "Photograph is NOT to be signed"
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Plain white"
    },
    biometrics: {
        headRatioMin: 0.80,
        headRatioMax: 0.85,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Minors below 4 years must provide a 4.5 x 3.5 cm photo with white background where the face takes up 80-85% of the photo."
    },
    sourceVerification: {
        authority: "Ministry of External Affairs / Passport Seva",
        officialUrl: "https://www.passportindia.gov.in/AppOnlineProject/pdf/ApplicationformInstructionBooklet-V3.0.pdf",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Indian Passport Photo Size, Requirements & Guidelines",
        metaDescription: "Generate a compliant Indian passport photo. Exact physical dimensions required are 35x45 mm (1.38x1.77 inches) with a plain white background and dark clothing.",
        keywords: [
            "India passport photo",
            "Indian passport photo size",
            "35x45 mm passport photo",
            "Passport Seva photo guidelines",
            "Indian passport photo dimensions",
            "India passport picture requirements"
        ]
    }
};