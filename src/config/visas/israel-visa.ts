import { CountryVisaConfig } from './types';

export const israelVisaConfig: CountryVisaConfig = {
    id: "israel-visa",
    country: "Israel",
    countryCode: "IL",
    defaultProfileId: "israel-visa-consular",
    profiles: [
        {
            id: "israel-visa-consular",
            title: "Israel Consular Visa Photo",
            country: "Israel",
            countryCode: "IL",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "B/2 (Visitor / Tourist)",
                "B/2 (Business Meeting / Conference)",
                "B/2 (Transit)",
                "A/2 (Student)",
                "A/3 (Clergy / Religious Student)",
                "B/1 (Work / Employment - Expert, Caregiver, Agricultural)",
                "A/4 (Dependents of A/2 and A/3 visa holders)",
                "B/4 (Volunteer)",
                "A/5 (Temporary Resident - often used for spouses of citizens)",
                "A/1 (Temporary Resident / Eligible for Aliyah)",
                "Oleh Visa (New Immigrant / Law of Return)",
                "B/5 (Investor Visa - specifically for US citizens)",
                "Diplomatic Visa",
                "Official / Service Visa",
                "B/1 (Journalist)",
                "B/2 (Medical Treatment)",
                "B/3 (Temporary Visitor - Status Pending/Doubtful)"
            ],
            aspectRatio: 1,
            physical: {
                widthMm: 50,
                heightMm: 50,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 600,
                minHeightPx: 600,
                maxWidthPx: 1200,
                maxHeightPx: 1200,
                minKb: 240,
                maxKb: 12288,
                allowedFormats: ["JPEG", "JPG", "PNG"],
                colorSpace: "sRGB"
            },
            signature: {
                required: false
            },
            passportScan: {
                required: true,
                maxKb: 5120,
                allowedFormats: ["PDF", "JPEG", "JPG"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "White"
            },
            biometrics: {
                headRatioMin: 0.50,
                headRatioMax: 0.70,
                shouldersVisible: true,
                glassesAllowed: false,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Children under 6 do not need a neutral expression. Infants under 1 year do not need eyes open. No hands, pacifiers, or toys visible."
            },
            sourceVerification: {
                authority: "Ministry of Foreign Affairs (MFA) / Israel Embassies",
                officialUrl: "https://govextra.gov.il/foreign-affairs/consular-affairs-eng/travel-english/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Israel Consular Visa Photo Requirements & Size Guide (50x50mm)",
                metaDescription: "Official Israel consular visa photo specifications. Size must be exactly 50x50 mm (2x2 inches) with a pure white background. View full biometric, digital, and print requirements.",
                keywords: ["Israel visa photo size", "Israel consular photo requirements", "50x50mm visa photo", "Israel visa photo guidelines", "B/2 visa photo"]
            }
        },
        {
            id: "israel-evisa-b2",
            title: "Israel eVisa-B2 Photo",
            country: "Israel",
            countryCode: "IL",
            type: "visa",
            channel: "digital_upload",
            applicableCategories: [
                "eVisa-B2 (Tourist / Visitor)",
                "eVisa-B2 (Business Meetings)",
                "eVisa-B2 (Transit)",
                "eVisa-B2 (Short-term non-academic study)",
                "eVisa-B2 (Family Visit)",
                "eVisa-B2 (Medical Tourism)",
                "eVisa-B2 (For Visa-Required Nationals)"
            ],
            aspectRatio: 1,
            physical: {
                widthMm: 50,
                heightMm: 50,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 0,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 600,
                minHeightPx: 600,
                maxWidthPx: 1200,
                maxHeightPx: 1200,
                minKb: 10,
                maxKb: 5120,
                allowedFormats: ["JPEG", "JPG", "PDF"],
                colorSpace: "sRGB"
            },
            signature: {
                required: false
            },
            passportScan: {
                required: true,
                maxKb: 5120,
                allowedFormats: ["PDF", "JPEG", "JPG"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "White"
            },
            biometrics: {
                headRatioMin: 0.50,
                headRatioMax: 0.70,
                shouldersVisible: true,
                glassesAllowed: false,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Children under 6 are exempt from the strict neutral expression requirement. Infants under 1 year are exempt from having their eyes open. No pacifiers, hands, or toys visible."
            },
            sourceVerification: {
                authority: "Population and Immigration Authority (PIBA) / ETA-IL Portal",
                officialUrl: "https://israel-entry.piba.gov.il/learn-about-evisa-b2",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Israel eVisa-B2 Photo Requirements & Digital Upload Guide",
                metaDescription: "Official Israel eVisa-B2 digital photo requirements. Ensure your upload is a minimum 600x600 pixels (1:1 ratio) up to 5MB with a solid white background for the ETA-IL portal.",
                keywords: ["Israel eVisa-B2 photo size", "Israel eVisa photo requirements", "ETA-IL photo specifications", "Israel digital visa photo", "eVisa-B2 photo upload"]
            }
        }
    ]
};