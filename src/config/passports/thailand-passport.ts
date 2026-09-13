import { VisaPassportConfig } from '../visas/types';

export const thailandPassportConfig: VisaPassportConfig = {
    id: "thailand-passport",
    title: "Thailand Passport",
    country: "Thailand",
    countryCode: "TH",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7778,
    physical: {
        widthMm: 35,
        heightMm: 45,
        targetDpi: 1200,
        paperFinish: "any",
        copiesRequired: 2,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Pure White or Off-White"
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
        relaxedConstraints: "Children under 6 do not need a neutral expression or to look directly at the camera. Children under 1 do not need to have their eyes open. No hands, toys, pacifiers, or supporting parents may be visible in the frame."
    },
    sourceVerification: {
        authority: "Department of Consular Affairs, Ministry of Foreign Affairs (MFA)",
        officialUrl: "https://consular.mfa.go.th/",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Thailand Passport Photo Size, Specifications & Guidelines",
        metaDescription: "Official Thailand passport photo guidelines. Physical print dimensions must be exactly 35mm by 45mm (1.38 x 1.77 inches). Requires a pure white or off-white background with contrasting clothing.",
        keywords: [
            "Thailand passport photo",
            "Thai passport photo size",
            "TH passport guidelines",
            "MFA Thailand passport rules",
            "Thailand biometric passport photo"
        ]
    }
};