import { CountryVisaConfig } from './types';

export const omanVisaConfig: CountryVisaConfig = {
    id: "oman-visa",
    country: "Oman",
    countryCode: "OM",
    defaultProfileId: "oman-evisa-photo-specifications",
    profiles: [
        {
            id: "oman-evisa-photo-specifications",
            title: "Oman eVisa Photo Specifications",
            country: "Oman",
            countryCode: "OM",
            type: "visa",
            channel: "digital_upload",
            applicableCategories: [
                "Tourist Visit Visa 10D (26A)",
                "Tourist Visit Visa 30D (26B)",
                "Tourist Visit Visa 1 Year Multiple Entry (36B)",
                "GCC Resident Tourist Visa (29A)",
                "Express Visa",
                "Business Visa",
                "Student Visa",
                "Employment Visa (21A)",
                "Employment Contracting Visa",
                "Temporary Work Visa",
                "Transit Visa (23A)",
                "Family Visit Visa",
                "Family Joining Visa",
                "Investor Visa",
                "Scientific Research Visa",
                "Medical Treatment Visa",
                "eVisa (Unsponsored and Sponsored tracks)"
            ],
            aspectRatio: 0.6667,
            physical: {
                widthMm: 40,
                heightMm: 60,
                targetDpi: 300,
                paperFinish: "matte",
                copiesRequired: 1,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 472,
                minHeightPx: 709,
                maxWidthPx: 944,
                maxHeightPx: 1417,
                minKb: 50,
                maxKb: 512,
                allowedFormats: ["JPEG", "PNG", "PDF"],
                colorSpace: "24-bit RGB",
                fileNameTemplate: "Alphanumeric only, max 35 chars, no spaces"
            },
            signature: {
                required: false
            },
            passportScan: {
                required: true,
                maxKb: 512,
                allowedFormats: ["PDF", "JPEG", "PNG"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Clear background (Plain White, Light Gray, or Solid Blue accepted depending on visa class)"
            },
            biometrics: {
                headRatioMin: 0.70,
                headRatioMax: 0.80,
                eyeLinePercentFromBottom: 55,
                shouldersVisible: true,
                glassesAllowed: false,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "The child must be the only person in the photo; no parent's hands or arms visible; child's eyes must be open"
            },
            sourceVerification: {
                authority: "Royal Oman Police (ROP) / eVisa Portal",
                officialUrl: "https://evisa.rop.gov.om/eVisaSponsoredUnsponsored/help/en/Attach_Document_Guide/attachment_guide_en.htm",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Oman eVisa Photo Requirements & Dimensions",
                metaDescription: "Official Oman eVisa photo specifications. Ensure your digital upload meets the exact 40x60 mm (1.57x2.36 inches) dimensions, 512KB max size, and clear background requirements.",
                keywords: [
                    "Oman eVisa photo size",
                    "Oman visa photo requirements",
                    "Tourist Visit Visa photo",
                    "Oman digital visa photo",
                    "40x60mm visa photo",
                    "Oman eVisa upload"
                ]
            }
        },
        {
            id: "oman-consular-visa-photo-specifications",
            title: "Oman Consular Visa Photo Specifications (Diplomatic & Special Purpose)",
            country: "Oman",
            countryCode: "OM",
            type: "visa",
            channel: "physical_print",
            applicableCategories: [
                "Exceptional paper visas",
                "Trade Delegations",
                "Specialized Consular Business Visas",
                "Government-sponsored Exchange Scholar Visas",
                "Special Government Contracting Visas",
                "Seafarer Visa",
                "Complex Family Joining Visas",
                "Consular returning resident stamps",
                "High-net-worth individual manual processing",
                "Diplomatic Visa",
                "Official / Service Visa",
                "Journalist Visa"
            ],
            aspectRatio: 0.6667,
            physical: {
                widthMm: 40,
                heightMm: 60,
                targetDpi: 600,
                paperFinish: "matte",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 472,
                minHeightPx: 709,
                maxWidthPx: 944,
                maxHeightPx: 1417,
                minKb: 50,
                maxKb: 512,
                allowedFormats: ["JPEG", "PNG"],
                colorSpace: "24-bit RGB",
                fileNameTemplate: "Alphanumeric only, max 35 chars, no spaces"
            },
            signature: {
                required: false
            },
            passportScan: {
                required: true,
                maxKb: 512,
                allowedFormats: ["PDF", "JPEG", "PNG"]
            },
            background: {
                requiredHex: "#0000FF",
                label: "Plain Blue (Solid Blue)"
            },
            biometrics: {
                headRatioMin: 0.70,
                headRatioMax: 0.80,
                eyeLinePercentFromBottom: 55,
                shouldersVisible: true,
                glassesAllowed: false,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "The child must be the only person in the photo. No parent's hands, arms, or toys may be visible. The child's eyes must be fully open."
            },
            sourceVerification: {
                authority: "Ministry of Foreign Affairs (FM.gov.om) / Royal Oman Police (ROP) Consular Services",
                officialUrl: "https://www.fm.gov.om/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Oman Consular & Diplomatic Visa Photo Size & Requirements",
                metaDescription: "Official photo specifications for Oman consular, diplomatic, and special purpose visas. Exact dimensions 40x60 mm (1.57x2.36 inches) with a solid blue background.",
                keywords: [
                    "Oman consular visa photo",
                    "Oman diplomatic visa photo size",
                    "Oman seafarer visa photo",
                    "40x60 mm blue background photo",
                    "Oman paper visa requirements"
                ]
            }
        }
    ]
};