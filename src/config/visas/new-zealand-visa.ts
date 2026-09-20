import { CountryVisaConfig } from './types';

export const newZealandVisaConfig: CountryVisaConfig = {
    id: "new-zealand-visa",
    country: "New Zealand",
    countryCode: "NZ",
    defaultProfileId: "new-zealand-visa-photo",
    profiles: [
        {
            id: "new-zealand-visa-photo",
            title: "New Zealand Visa Photo",
            country: "New Zealand",
            countryCode: "NZ",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Visitor Visa",
                "Group Visitor Visa",
                "Business Visitor Visa",
                "APEC Business Travel Card (ABTC)",
                "Fee Paying Student Visa",
                "Exchange Student Visa",
                "Pathway Student Visa",
                "MFAT-funded NZ Scholarship Student Visa",
                "Accredited Employer Work Visa (AEWV)",
                "Post Study Work Visa",
                "Specific Purpose Work Visa",
                "Recognised Seasonal Employer (RSE) Limited Visa",
                "Working Holiday Visa (WHV)",
                "Transit Visa",
                "Partner of a New Zealander Visitor/Work/Resident Visa",
                "Dependent Child Student/Visitor Visa",
                "Parent Resident Visa",
                "Parent Retirement Resident Visa",
                "Skilled Migrant Category Resident Visa (SMC)",
                "Straight to Residence Visa",
                "Work to Residence Visa",
                "Care Workforce Work to Residence Visa",
                "Transport Sector Work to Residence Visa",
                "Permanent Resident Visa (PRV)",
                "Second or Subsequent Resident Visa",
                "Active Investor Plus Visa",
                "Entrepreneur Work Visa",
                "Entrepreneur Resident Visa",
                "Medical Treatment Visitor Visa",
                "Religious Worker Work Visa",
                "Diplomatic or Official Visa",
                "Refugee Family Support Resident Visa"
            ],
            aspectRatio: 0.7778,
            physical: {
                widthMm: 35,
                heightMm: 45,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 900,
                minHeightPx: 1200,
                maxWidthPx: 2250,
                maxHeightPx: 3000,
                minKb: 500,
                maxKb: 3072,
                allowedFormats: ["JPG", "JPEG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true,
                allowedFormats: ["PDF", "JPEG"]
            },
            background: {
                requiredHex: "#E6E6E6",
                label: "Plain, light-colored (Not pure white, e.g., light grey or cream)"
            },
            biometrics: {
                headRatioMin: 0.75,
                headRatioMax: 0.75,
                shouldersVisible: true,
                glassesAllowed: false,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Babies under 12 months do not need to have their eyes open; no toys, pacifiers, or other people may be in the frame."
            },
            sourceVerification: {
                authority: "Immigration New Zealand (INZ)",
                officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/preparing-a-visa-application/character-and-identity/acceptable-photos",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "New Zealand Visa Photo Requirements & Size 2026",
                metaDescription: "Official New Zealand visa photo requirements: 35x45 mm (1.38x1.77 inches) physical print or 900x1200 pixels digital upload. Light colored background.",
                keywords: [
                    "New Zealand visa photo size",
                    "NZ visa picture requirements",
                    "Immigration New Zealand photo",
                    "New Zealand visa digital photo upload"
                ]
            }
        },
        {
            id: "new-zealand-visa-paper-photo",
            title: "New Zealand Visa Photo (Paper Application)",
            country: "New Zealand",
            countryCode: "NZ",
            type: "visa",
            channel: "physical_print",
            applicableCategories: [
                "Visitor Visa (Paper Form INZ 1017)",
                "Group Visitor Visa",
                "Business Visitor Visa (Paper submission)",
                "Student Visa (Paper Form INZ 1012)",
                "Specific Purpose Work Visa (Paper Form INZ 1015)",
                "Transit Visa (Paper Form INZ 1019)",
                "Partner of a New Zealander Visa (Paper forms)",
                "Permanent Resident Visa (Paper Form INZ 1175)",
                "Transfer of Visa to New Passport (Paper Form INZ 1023)",
                "Active Investor Plus Visa",
                "Diplomatic or Official Visa"
            ],
            aspectRatio: 0.7778,
            physical: {
                widthMm: 35,
                heightMm: 45,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: true,
                backSideInstructions: "Write applicant's full name on the back (if required by specific application form)"
            },
            digital: {
                minWidthPx: 900,
                minHeightPx: 1200,
                maxWidthPx: 2250,
                maxHeightPx: 3000,
                minKb: 500,
                maxKb: 10240,
                allowedFormats: ["JPG", "JPEG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true,
                allowedFormats: ["PDF", "JPEG"]
            },
            background: {
                requiredHex: "#E6E6E6",
                label: "Plain, light-colored (Not pure white - e.g., light grey or cream)"
            },
            biometrics: {
                headRatioMin: 0.75,
                headRatioMax: 0.75,
                shouldersVisible: true,
                glassesAllowed: false,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Babies under 12 months do not need eyes fully open. No toys, pacifiers, hands, or other people in frame"
            },
            sourceVerification: {
                authority: "Immigration New Zealand (INZ)",
                officialUrl: "https://www.immigration.govt.nz/new-zealand-visas/preparing-a-visa-application/character-and-identity/acceptable-photos",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "New Zealand Paper Visa Photo Size & Requirements",
                metaDescription: "Official photo specifications for New Zealand paper visa applications. Ensure exact 35x45 mm (1.38x1.77 inches) dimensions, plain light background, and head height of 30-36mm.",
                keywords: [
                    "NZ paper visa photo size",
                    "New Zealand physical visa photo dimensions",
                    "INZ paper application picture rules",
                    "New Zealand passport size photo"
                ]
            }
        },
        {
            id: "new-zealand-nzeta-photo",
            title: "New Zealand Electronic Travel Authority (NZeTA) Photo",
            country: "New Zealand",
            countryCode: "NZ",
            type: "visa",
            channel: "digital_upload",
            applicableCategories: [
                "New Zealand Electronic Travel Authority (NZeTA - standard tourism and transit variants)",
                "Cruise Ship NZeTA"
            ],
            aspectRatio: 0.75,
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
                minWidthPx: 900,
                minHeightPx: 1200,
                maxWidthPx: 2250,
                maxHeightPx: 3000,
                minKb: 500,
                maxKb: 3072,
                allowedFormats: ["JPG", "JPEG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true,
                allowedFormats: ["PDF", "JPEG"]
            },
            background: {
                requiredHex: "#E6E6E6",
                label: "Plain, light-colored (Not white; light grey recommended)"
            },
            biometrics: {
                headRatioMin: 0.70,
                headRatioMax: 0.80,
                shouldersVisible: true,
                glassesAllowed: false,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Babies under 12 months do not need to have their eyes open; no toys, pacifiers, hands, or other people may be in the frame"
            },
            sourceVerification: {
                authority: "Immigration New Zealand (INZ)",
                officialUrl: "https://www.immigration.govt.nz/process-to-apply/applying-for-a-visa/applying-online/uploading-documents-and-photos/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "NZeTA Photo Requirements & Size Guide 2026",
                metaDescription: "NZeTA photo rules for digital upload. Required dimensions 900x1200 pixels with a 3:4 aspect ratio on a plain, light grey background.",
                keywords: [
                    "NZeTA photo requirements",
                    "New Zealand ETA picture size",
                    "NZeTA upload photo",
                    "NZeTA digital photo guide"
                ]
            }
        }
    ]
};