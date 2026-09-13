import { VisaPassportConfig } from '../visas/types';

export const qatarPassportConfig: VisaPassportConfig = {
    id: "qatar-passport",
    title: "Qatar Passport",
    country: "Qatar",
    countryCode: "QA",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7917,
    physical: {
        widthMm: 38,
        heightMm: 48,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 2,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "White or Light Grey"
    },
    biometrics: {
        headRatioMin: 0.70,
        headRatioMax: 0.80,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: false
    },
    sourceVerification: {
        authority: "Ministry of Interior (MOI) - Nationality and Travel Documents Department",
        officialUrl: "https://portal.moi.gov.qa/wps/portal/MOIInternet/departmentcommittees/nationalitytraveldocuments/",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Qatar Passport Photo Size, Specifications & Guidelines",
        metaDescription: "Official Qatar passport photo guidelines. Physical print dimensions must typically be 38mm by 48mm (1.50 x 1.89 inches). Follow standard ICAO biometric requirements.",
        keywords: [
            "Qatar passport photo",
            "Qatari passport photo size",
            "QA passport guidelines",
            "MOI Qatar passport rules",
            "Qatar passport photo requirements"
        ]
    }
};