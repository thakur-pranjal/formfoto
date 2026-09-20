import { CountryVisaConfig } from './types';

export const uaeVisaConfig: CountryVisaConfig = {
    id: "uae-visa",
    country: "United Arab Emirates",
    countryCode: "AE",
    defaultProfileId: "uae-visa-photo",
    profiles: [
        {
            id: "uae-visa-photo",
            title: "UAE Visa Photo",
            country: "United Arab Emirates",
            countryCode: "AE",
            type: "visa",
            channel: "digital_upload",
            applicableCategories: [
                "30-Day Tourist Visa",
                "60-Day Tourist Visa",
                "90-Day Multiple Entry Tourist Visa",
                "Jobseeker Visa (60-90 Days)",
                "Business Visit Visa",
                "Green Visa for Freelancers (5 Years)",
                "48-Hour Transit Visa",
                "96-Hour Transit Visa",
                "Student Visa (1 Year Renewable)",
                "Golden Visa for Outstanding Students/Graduates (10 Years)",
                "Standard Employment Visa (2 Years)",
                "Green Visa for Skilled Workers (5 Years)",
                "Family/Dependent Sponsorship Visa (Spouse, Child, Parent - 1 to 3 Years)",
                "Retirement Visa (5 Years)",
                "Golden Visa (10 Years)",
                "Golden Visa for Investors/Entrepreneurs (10 Years)",
                "Green Visa for Investors/Partners (5 Years)",
                "Standard Partner/Investor Visa (3 Years)",
                "Blue Visa (Environmental Contributors - 10 Years)",
                "Medical Treatment Visit Visa",
                "GCC Resident eVisa",
                "eVisa Pre-approval applications processed via ICP"
            ],
            aspectRatio: 0.7818,
            physical: {
                widthMm: 43,
                heightMm: 55,
                targetDpi: 600,
                paperFinish: "any",
                copiesRequired: 1,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 1016,
                minHeightPx: 1300,
                maxWidthPx: 1016,
                maxHeightPx: 1300,
                minKb: 1024,
                maxKb: 15360,
                allowedFormats: ["JPG", "JPEG", "PNG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true,
                maxKb: 15360,
                allowedFormats: ["JPG", "JPEG", "PNG"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain White"
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
                relaxedConstraints: "Face must be clear of toys, pacifiers, hands, or other people in the frame"
            },
            sourceVerification: {
                authority: "Federal Authority for Identity, Citizenship, Customs and Port Security (ICP)",
                officialUrl: "smartservices.icp.gov.ae",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "UAE Visa Photo Requirements, Size & Guidelines",
                metaDescription: "Ensure your UAE visa photo meets the exact 43x55 mm (1.69x2.17 inches) size and ICP biometric requirements. Create compliant digital uploads.",
                keywords: ["UAE visa photo size", "ICP visa photo requirements", "Emirates visa photo", "43x55mm visa photo", "UAE e-visa photo", "UAE tourist visa requirements"]
            }
        },
        {
            id: "uae-visa-gdrfa-photo",
            title: "UAE Visa (GDRFA Dubai) Photo",
            country: "United Arab Emirates",
            countryCode: "AE",
            type: "visa",
            channel: "digital_upload",
            applicableCategories: [
                "30-Day Tourist Visa (Dubai)",
                "60-Day Tourist Visa (Dubai)",
                "90-Day Multiple Entry Tourist Visa (Dubai)",
                "Jobseeker Visa (Dubai)",
                "Business Visit Visa (Dubai)",
                "Green Visa for Freelancers (Dubai)",
                "48-Hour Transit Visa (Dubai)",
                "96-Hour Transit Visa (Dubai)",
                "Student Visa (Dubai Institutions)",
                "Golden Visa for Outstanding Students",
                "Standard Employment Visa (Dubai - 2 Years)",
                "Green Visa for Skilled Workers",
                "Family/Dependent Sponsorship Visa (Dubai Sponsorship)",
                "Retirement Visa (Dubai)",
                "Golden Visa (Dubai Issuance)",
                "Golden Visa for Investors/Entrepreneurs",
                "Green Visa for Investors/Partners",
                "Standard Partner/Investor Visa (Dubai Free Zones & Mainland)",
                "Blue Visa (Dubai Issuance)",
                "Medical Treatment Visit Visa (Dubai)",
                "GCC Resident eVisa (Dubai Entry)",
                "eVisa Pre-approval applications processed via GDRFA"
            ],
            aspectRatio: 0.7818,
            physical: {
                widthMm: 43,
                heightMm: 55,
                targetDpi: 600,
                paperFinish: "any",
                copiesRequired: 1,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 300,
                minHeightPx: 369,
                maxWidthPx: 2000,
                maxHeightPx: 2000,
                minKb: 200,
                maxKb: 600,
                allowedFormats: ["JPEG", "JPG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true,
                maxKb: 2048,
                allowedFormats: ["JPEG", "JPG"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain White"
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
                relaxedConstraints: "Face must be clear of toys, pacifiers, hands, or other people in the frame"
            },
            sourceVerification: {
                authority: "General Directorate of Residency and Foreigners Affairs (GDRFA) - Dubai",
                officialUrl: "gdrfad.gov.ae",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Dubai (GDRFA) Visa Photo Requirements & Size Guidelines",
                metaDescription: "Official Dubai GDRFA visa photo specifications. Ensure your image is exactly 43x55 mm (1.69x2.17 inches), between 200-600 KB, with a plain white background.",
                keywords: ["Dubai visa photo size", "GDRFA photo requirements", "Dubai tourist visa photo", "43x55mm photo Dubai", "Dubai residency visa photo"]
            }
        },
        {
            id: "uae-visa-consular-print",
            title: "UAE Visa (Standard Consular & Typing Center Print 43x55mm)",
            country: "United Arab Emirates",
            countryCode: "AE",
            type: "visa",
            channel: "physical_print",
            applicableCategories: [
                "30-Day Tourist Visa",
                "60-Day Tourist Visa",
                "90-Day Multiple Entry Tourist Visa",
                "Business Visit Visa",
                "48-Hour Transit Visa",
                "96-Hour Transit Visa",
                "Student Visa Entry Permit",
                "Standard Employment Visa Entry Permit",
                "Family/Dependent Sponsorship Visa Entry Permit",
                "Golden Visa Entry Permit",
                "Investor/Partner Visa Entry Permit",
                "Medical Treatment Visit Visa"
            ],
            aspectRatio: 0.7818,
            physical: {
                widthMm: 43,
                heightMm: 55,
                targetDpi: 600,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain White"
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
                relaxedConstraints: "Face must be clear of toys, pacifiers, hands, or other people in the frame"
            },
            sourceVerification: {
                authority: "Federal Authority for Identity, Citizenship, Customs and Port Security (ICP) / General Directorate of Residency and Foreigners Affairs (GDRFA)",
                officialUrl: "icp.gov.ae",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "UAE Visa Physical Photo Print Size & Typing Center Guidelines",
                metaDescription: "Print specifications for UAE visa applications submitted via typing centers or consulates. Physical photo must measure 43x55 mm (1.69x2.17 inches) on glossy or matte paper.",
                keywords: ["UAE typing center photo", "UAE consular visa photo", "43x55mm visa print", "UAE physical visa photo size"]
            }
        }
    ]
};