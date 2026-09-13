import { VisaPassportConfig } from '../visas/types';

export const bangladeshPassportConfig: VisaPassportConfig = {
    id: "bangladesh-passport",
    title: "Bangladesh Passport Photo",
    country: "Bangladesh",
    countryCode: "BD",
    type: "passport",
    channel: "physical_print",
    aspectRatio: 0.8182,
    physical: {
        widthMm: 45,
        heightMm: 55,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Plain White (MRP) or Plain Grey (e-Passport under 6)"
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
        relaxedConstraints: "Applicants under 6 years of age require a printed 3R (89x127mm) lab-printed photo with a Plain Grey background. The child must be alone in the frame."
    },
    sourceVerification: {
        authority: "Department of Immigration and Passports (DIP)",
        officialUrl: "https://epassport.gov.bd",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Bangladesh Passport Photo Requirements & Size Guidelines",
        metaDescription: "Official Bangladesh passport photo specifications. Ensure your standard MRP photo is exactly 45x55 mm (1.77x2.17 inches) on a plain white background, or 3R size on grey for infants.",
        keywords: [
            "Bangladesh passport photo",
            "Bangladesh MRP photo size",
            "BD e-passport infant photo",
            "45x55mm passport photo",
            "Bangladesh passport photo requirements"
        ]
    }
};