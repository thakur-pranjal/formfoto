import { VisaPassportConfig } from '../visas/types';

export const malaysiaPassportConfig: VisaPassportConfig = {
    id: "malaysia-passport",
    title: "Malaysia Passport",
    country: "Malaysia",
    countryCode: "MY",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7,
    physical: {
        widthMm: 35,
        heightMm: 50,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 2,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Pure White"
    },
    biometrics: {
        headRatioMin: 0.60,
        headRatioMax: 0.70,
        shouldersVisible: true,
        glassesAllowed: false,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Below 4 years old: Must submit physical photos as live image capture at the counter is not suitable. Photo must have a white background without shadows."
    },
    sourceVerification: {
        authority: "Jabatan Imigresen Malaysia (Immigration Department of Malaysia)",
        officialUrl: "https://www.kln.gov.my/media/01M0RY7EYZFRZV59WTKFKVY7BR",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Malaysia Passport Photo Size, Specifications & Guidelines",
        metaDescription: "Official Malaysia passport photo guidelines. Physical print dimensions must be exactly 35mm by 50mm (1.38 x 1.97 inches). Applicants must wear dark clothing against a pure white background.",
        keywords: [
            "Malaysia passport photo",
            "Malaysian passport photo size",
            "MY passport guidelines",
            "Jabatan Imigresen Malaysia passport rules"
        ]
    }
};