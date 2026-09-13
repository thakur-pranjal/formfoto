import { VisaPassportConfig } from '../visas/types';

export const israelPassportConfig: VisaPassportConfig = {
    id: "israel-passport",
    title: "Israel Passport Photo",
    country: "Israel",
    countryCode: "IL",
    type: "passport",
    channel: "physical_print",
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
        requiredHex: "#FFFFFF",
        label: "Plain White or Light Gray"
    },
    biometrics: {
        headRatioMin: 0.70,
        headRatioMax: 0.80,
        shouldersVisible: true,
        glassesAllowed: false,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Children under 6 years old do not need to look directly at the camera or maintain a perfectly neutral expression. The child must be photographed alone with no hands, parents, or objects visible."
    },
    sourceVerification: {
        authority: "Population and Immigration Authority (PIBA) / Ministry of Interior",
        officialUrl: "https://www.gov.il/he/pages/biometric_photo_guide",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Israel Passport Photo Requirements, Size & Guidelines",
        metaDescription: "Official Israel passport photo specifications. Ensure your PIBA passport photo is exactly 35x45 mm (1.38x1.77 inches) on a plain white or light gray background with contrasting clothing.",
        keywords: [
            "Israel passport photo",
            "Israel passport photo size",
            "PIBA photo guidelines",
            "35x45mm passport photo",
            "Israeli passport picture"
        ]
    }
};