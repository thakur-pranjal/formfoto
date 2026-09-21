import { CountryVisaConfig } from './types';

export const qatarVisaConfig: CountryVisaConfig = {
    id: "qatar-visa",
    country: "Qatar",
    countryCode: "QA",
    defaultProfileId: "qatar-hayya-visa",
    profiles: [
        {
            id: "qatar-hayya-visa",
            title: "Qatar Hayya e-Visa Photo",
            country: "Qatar",
            countryCode: "QA",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Hayya Tourist Visa (A1)",
                "Pre-Approved Transit Visa",
                "Event Visa",
                "Entry Visa for Companion of GCC Citizens (A4)",
                "Hayya With Me (C)",
                "ETA Visa (A3)",
                "GCC Resident Visa (A2)"
            ],
            aspectRatio: 0.75,
            physical: {
                widthMm: 30,
                heightMm: 40,
                targetDpi: 300,
                paperFinish: "matte",
                copiesRequired: 1,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 540,
                minHeightPx: 720,
                maxKb: 2048,
                allowedFormats: ["JPEG", "JPG"],
                colorSpace: "24-bit sRGB"
            },
            passportScan: {
                required: true,
                maxKb: 2048,
                allowedFormats: ["PDF", "JPEG", "JPG"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain white or light grey"
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
                relaxedConstraints: "Relaxed constraints (Infants can be photographed from above lying on a plain white sheet; hands/supports must not be visible)"
            },
            sourceVerification: {
                authority: "Ministry of Interior (Qatar) / Hayya Portal",
                officialUrl: "https://hayya.qa",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Qatar Hayya e-Visa Photo Requirements & Size (30x40mm)",
                metaDescription: "Ensure your Qatar Hayya e-Visa photo meets the strict 30x40mm (1.18x1.57 inches) size, 3:4 aspect ratio, and 2MB file limit rules for guaranteed acceptance.",
                keywords: [
                    "Qatar Hayya e-Visa photo size",
                    "Qatar visa photo requirements",
                    "Hayya portal photo 30x40",
                    "Qatar ETA photo guidelines",
                    "Hayya Tourist Visa A1 photo"
                ]
            }
        },
        {
            id: "qatar-visa-moi",
            title: "Qatar Visa (MOI & Consular Standard)",
            country: "Qatar",
            countryCode: "QA",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Family Visit Visa",
                "Business Visit Visa (A2)",
                "Student Visa",
                "Work Visa (for nationalities exempt from QVC)",
                "Domestic Worker Visa (non-QVC)",
                "Seafarer Visa",
                "Air Crew Visa",
                "Family Residence Visa",
                "Permanent Residence Permit",
                "10-Year Residence Permit for Executives",
                "Investor Visa",
                "Medical Treatment Visa"
            ],
            aspectRatio: 0.7917,
            physical: {
                widthMm: 38,
                heightMm: 48,
                targetDpi: 600,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 898,
                minHeightPx: 1134,
                maxKb: 10240,
                allowedFormats: ["JPEG", "JPG", "PNG", "PDF"],
                colorSpace: "24-bit sRGB"
            },
            passportScan: {
                required: true,
                maxKb: 10240,
                allowedFormats: ["PDF", "JPEG", "JPG"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain White or Light Grey"
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
                relaxedConstraints: "Relaxed constraints (Infants not required to maintain neutral expression; overhead capture permitted; parents' hands/supports must not be visible)"
            },
            sourceVerification: {
                authority: "Ministry of Interior (Qatar) / Qatar Consular Missions",
                officialUrl: "https://portal.moi.gov.qa",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Qatar Visa & Consular Photo Size (38x48mm)",
                metaDescription: "Complete Qatar MOI visa photo specifications. Ensure your submission matches the mandatory 38x48mm (1.5x1.89 inches) size, plain white background, and 600 DPI requirements.",
                keywords: [
                    "Qatar MOI visa photo size",
                    "Qatar consular photo requirements",
                    "Qatar residence permit photo 38x48",
                    "Qatar family visit visa photo",
                    "Qatar business visa picture specifications"
                ]
            }
        }
    ]
};