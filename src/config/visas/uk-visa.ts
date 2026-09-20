import { CountryVisaConfig } from './types';

export const ukVisaConfig: CountryVisaConfig = {
    id: "uk-visa",
    country: "United Kingdom",
    countryCode: "GB",
    defaultProfileId: "united-kingdom-electronic-travel-authorisation-eta",
    profiles: [
        {
            id: "united-kingdom-electronic-travel-authorisation-eta",
            title: "United Kingdom Electronic Travel Authorisation (ETA)",
            type: "visa",
            channel: "digital_upload",
            applicableCategories: [
                "UK ETA (Tourism)",
                "UK ETA (Business)",
                "UK ETA (Short-term study up to 6 months)",
                "UK ETA (Creative Worker concession)",
                "UK ETA (Transit)",
                "UK ETA (Medical treatment up to 6 months)",
                "UK Electronic Travel Authorisation (ETA)"
            ],
            aspectRatio: 0.7778,
            physical: {
                widthMm: 35,
                heightMm: 45,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 0,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 600,
                minHeightPx: 750,
                minKb: 50,
                maxKb: 10240,
                allowedFormats: ["JPEG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true
            },
            background: {
                requiredHex: "#EBEBE4",
                label: "Plain light-coloured (Cream or Light Grey)"
            },
            biometrics: {
                headRatioMin: 0.64,
                headRatioMax: 0.75,
                shouldersVisible: true,
                glassesAllowed: true,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Children under 6 do not need a plain expression or to look directly at the camera. Children under 1 do not need to have eyes open. Hands supporting a baby must not be visible. Toys or dummies are prohibited."
            },
            sourceVerification: {
                authority: "UK Visas and Immigration (UKVI) / Home Office",
                officialUrl: "https://www.gov.uk/eta/apply",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "UK ETA Digital Photo Requirements & Size 2026",
                metaDescription: "Ensure your UK ETA photo meets official 2026 guidelines. Requires a 35x45 mm (1.38x1.77 inches) equivalent digital upload, plain light background, and specific biometric sizing.",
                keywords: [
                    "UK ETA photo size",
                    "UK ETA photo requirements",
                    "UK Electronic Travel Authorisation digital photo",
                    "UK visa photo dimensions"
                ]
            }
        },
        {
            id: "united-kingdom-visa-consular-passports",
            title: "United Kingdom Visa & Consular Passports",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Paper-based Family Reunion (legacy fallback for complex cases)",
                "Right of Abode (ROA) Certificate of Entitlement",
                "Exempt Vignette (Diplomats, Government Officials, Armed Forces)",
                "eVisa manual photo upload (Only triggered if the UK ID Check App repeatedly fails to capture a valid selfie)"
            ],
            aspectRatio: 0.7778,
            physical: {
                widthMm: 35,
                heightMm: 45,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "10x15cm",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 600,
                minHeightPx: 750,
                minKb: 50,
                maxKb: 10240,
                allowedFormats: ["JPEG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: false
            },
            background: {
                requiredHex: "#EBEBE4",
                label: "Plain cream or light grey"
            },
            biometrics: {
                headRatioMin: 0.64,
                headRatioMax: 0.76,
                shouldersVisible: true,
                glassesAllowed: true,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Children under 6 do not need a plain expression or to look directly at the camera. Children under 1 do not need to have eyes open. Hands supporting a baby must not be visible. Toys or dummies are prohibited."
            },
            sourceVerification: {
                authority: "HM Passport Office (HMPO) / UK Visas and Immigration (UKVI) / GOV.UK",
                officialUrl: "https://www.gov.uk/photos-for-passports/photo-requirements",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "UK Visa & Consular Passport Photo Size and Guidelines 2026",
                metaDescription: "Official UK visa and passport photo requirements. Prepare standard 35x45 mm (1.38x1.77 inches) physical prints or digital uploads matching HMPO and UKVI biometrics.",
                keywords: [
                    "UK visa photo size",
                    "UK passport photo requirements",
                    "HMPO photo specifications",
                    "Paper-based Family Reunion photo requirements"
                ]
            }
        }
    ]
};