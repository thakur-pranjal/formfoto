import { VisaPassportConfig } from '../visas/types';

export const usPassportConfig: VisaPassportConfig = {
    id: "us-passport",
    title: "U.S. Passport",
    country: "United States of America",
    countryCode: "US",
    type: "passport",
    channel: "both",
    aspectRatio: 1,
    physical: {
        widthMm: 51,
        heightMm: 51,
        targetDpi: 300,
        paperFinish: "any",
        copiesRequired: 1,
        printSheetSize: "4x6",
        backSideRequired: false
    },
    digital: {
        minWidthPx: 600,
        minHeightPx: 600,
        maxWidthPx: 1200,
        maxHeightPx: 1200,
        minKb: 54,
        maxKb: 10240,
        allowedFormats: ["JPEG"],
        colorSpace: "sRGB"
    },
    signature: {
        required: false
    },
    background: {
        requiredHex: "#FFFFFF",
        label: "Plain white or off-white"
    },
    biometrics: {
        headRatioMin: 0.50,
        headRatioMax: 0.69,
        shouldersVisible: false,
        glassesAllowed: false,
        smileAllowed: true,
        contrastWarning: false
    },
    infantRules: {
        applicable: true,
        relaxedConstraints: "Infants/Newborns: Acceptable if eyes are not entirely open or are closed. Hands or support mechanisms (including parents' hands) must not be visible. May use a plain white or off-white sheet over a car seat or lying flat."
    },
    sourceVerification: {
        authority: "U.S. Department of State",
        officialUrl: "https://travel.state.gov/content/travel/en/passports/how-apply/photos.html",
        lastVerifiedDate: "2026-09",
        disclaimer: "Prepared according to official national passport photo guidelines. Final acceptance rests with the issuing government authority."
    },
    seo: {
        metaTitle: "U.S. Passport Photo Size, Requirements & Guidelines",
        metaDescription: "Generate a compliant United States passport photo. Exact physical dimensions required are 51x51 mm (2x2 inches) with a plain white or off-white background.",
        keywords: [
            "US passport photo",
            "United States passport photo size",
            "51x51 mm passport photo",
            "2x2 inch passport photo",
            "US passport picture requirements",
            "US passport photo guidelines"
        ]
    }
};