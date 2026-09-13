import { VisaPassportConfig } from '../visas/types';

export const canadaPassportConfig: VisaPassportConfig = {
    id: "canada-passport",
    title: "Canadian Passport Photo Requirements",
    country: "Canada",
    countryCode: "CA",
    type: "passport",
    channel: "both",
    aspectRatio: 0.7143,
    physical: {
        widthMm: 50,
        heightMm: 70,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 2,
        printSheetSize: "4x6",
        backSideRequired: true,
        backSideInstructions: "Photographer must write or stamp the date the photo was taken, studio name, and complete address on the back of one photo. A guarantor must certify and sign one photo for a first-time adult or child application."
    },
    digital: {
        minWidthPx: 1200,
        minHeightPx: 1800,
        maxWidthPx: 3000,
        maxHeightPx: 4500,
        minKb: 200,
        maxKb: 5120,
        allowedFormats: ["JPEG", "JPG"]
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Plain white or light-coloured"
    },
    biometrics: {
        headRatioMin: 0.45,
        headRatioMax: 0.50,
        shouldersVisible: true,
        glassesAllowed: true,
        smileAllowed: false,
        contrastWarning: true
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Newborns are allowed flexibility in facial expression. A newborn may be photographed in a car seat if a white blanket is placed behind the head and there are no shadows. No parent's or child's hands may appear in the image."
    },
    sourceVerification: {
        authority: "Immigration, Refugees and Citizenship Canada (IRCC)",
        officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/canadian-passports/photos.html",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "Canadian Passport Photo Requirements & Dimensions",
        metaDescription: "Official Canadian passport photo guidelines. Ensure your photo meets the exact 50x70 mm (2 x 2 3/4 inches) physical print and digital upload size requirements.",
        keywords: [
            "canada passport photo",
            "canadian passport photo requirements",
            "canada passport photo size",
            "50x70 mm passport photo",
            "canada digital passport photo",
            "IRCC passport photo"
        ]
    }
};