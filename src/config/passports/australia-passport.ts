import { VisaPassportConfig } from '../visas/types';

export const australiaPassportConfig: VisaPassportConfig = {
    id: "australia-passport",
    title: "Australian Passport Photo Guidelines",
    country: "Australia",
    countryCode: "AU",
    type: "passport",
    channel: "physical_print",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 300,
        paperFinish: "glossy",
        copiesRequired: 2,
        printSheetSize: "4x6",
        backSideRequired: true,
        backSideInstructions: "For new passport applications, a guarantor must sign the back of one photo using a black pen and write, \"This is a true photo of [applicant's full name]\"."
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Plain white or light grey"
    },
    biometrics: {
        headRatioMin: 0.71,
        headRatioMax: 0.80,
        shouldersVisible: false,
        glassesAllowed: false,
        smileAllowed: false,
        contrastWarning: false
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Children under 3 years: A photo with an open mouth is acceptable. No other person or object (including support hands) should be visible in the photo."
    },
    sourceVerification: {
        authority: "Australian Passport Office",
        officialUrl: "https://www.passports.gov.au/help/passport-photos",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Australian Passport Photo Requirements & Dimensions",
        metaDescription: "Official Australian passport photo guidelines. Ensure your physical print photo meets the required 35x45 mm (1.38 x 1.77 inches) to 40x50 mm dimensions.",
        keywords: [
            "australia passport photo",
            "australian passport photo guidelines",
            "australia passport photo size",
            "35x45 mm passport photo",
            "australian passport photo requirements"
        ]
    }
};