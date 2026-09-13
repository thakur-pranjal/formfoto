import { VisaPassportConfig } from '../visas/types';

export const uaePassportConfig: VisaPassportConfig = {
    id: "uae-passport",
    title: "UAE Passport Photo Specifications (ICAO)",
    country: "United Arab Emirates",
    countryCode: "AE",
    type: "passport",
    channel: "both",
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
        label: "Plain light-coloured background (White background is specified for renewals abroad)"
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
        applicable: true,
        relaxedConstraints: "The photograph must show the applicant alone (no chair backs, toys, or other people visible)."
    },
    sourceVerification: {
        authority: "Federal Authority for Identity, Citizenship, Customs & Port Security (ICP)",
        officialUrl: "https://smartservices.icp.gov.ae/echannels/web/client/manual/icao/icao_english.pdf",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "UAE Passport Photo Requirements & Dimensions",
        metaDescription: "Official United Arab Emirates passport photo guidelines. Ensure your photo meets the exact 35x45 mm (1.38 x 1.77 inches) physical print requirements for ICP applications.",
        keywords: [
            "uae passport photo",
            "united arab emirates passport photo requirements",
            "uae passport photo size",
            "35x45 mm passport photo",
            "icp passport photo"
        ]
    }
};