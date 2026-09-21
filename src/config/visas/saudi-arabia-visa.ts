import { CountryVisaConfig } from './types';

export const saudiArabiaVisaConfig: CountryVisaConfig = {
    id: "saudi-arabia-visa",
    country: "Saudi Arabia",
    countryCode: "SA",
    defaultProfileId: "saudi-arabia-evisa-photo",
    profiles: [
        {
            id: "saudi-arabia-evisa-photo",
            title: "Saudi Arabia e-Visa & Online Portal Photo",
            country: "Saudi Arabia",
            countryCode: "SA",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Tourist e-Visa",
                "Family Visit (Digital Initiation)",
                "Business Visit e-Visa",
                "Stopover e-Visa",
                "Transit e-Visa",
                "Premium Residency (Digital Application)",
                "Umrah e-Visa (Portal Route)",
                "GCC Resident e-Visa"
            ],
            aspectRatio: 1.0,
            physical: {
                widthMm: 50.8,
                heightMm: 50.8,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 200,
                minHeightPx: 200,
                maxWidthPx: 200,
                maxHeightPx: 200,
                minKb: 5,
                maxKb: 100,
                allowedFormats: ["JPEG", "PNG"],
                colorSpace: "24-bit RGB"
            },
            passportScan: {
                required: true,
                maxKb: 1024,
                allowedFormats: ["JPEG", "PNG", "PDF"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Pure White"
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
                relaxedConstraints: "Standard relaxed constraints apply: no pacifiers, no hands visible."
            },
            sourceVerification: {
                authority: "Ministry of Foreign Affairs (MOFA) / KSA Visa / Enjaz / VisitSaudi",
                officialUrl: "https://visa.visitsaudi.com/Home/PhotoSpecifications",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Saudi Arabia e-Visa Photo Requirements & Size Guide",
                metaDescription: "Ensure your Saudi Arabia e-Visa photo meets the strict 50.8x50.8 mm (2.0x2.0 inches) and 200x200 pixel digital upload limits. Pure white background required.",
                keywords: [
                    "Saudi Arabia e-Visa photo size",
                    "Saudi Arabia visa photo requirements",
                    "Tourist e-Visa photo",
                    "VisitSaudi photo upload"
                ]
            }
        },
        {
            id: "saudi-arabia-consular-tasheer-visa-photo",
            title: "Saudi Arabia Consular & Tasheer Center Visa Photo",
            country: "Saudi Arabia",
            countryCode: "SA",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Tourist Visa (Consular Sticker)",
                "Family Visit Visa",
                "Personal Visit Visa",
                "Commercial Visit Visa",
                "Working Visit Visa",
                "Student Visa",
                "Educational Visit Visa",
                "Work Visa (Employment)",
                "Seasonal Work Visa",
                "Temporary Work Visa",
                "Domestic Worker Visa",
                "Transit Visa (Sticker)",
                "Seafarer Visa",
                "Residence Visa (Family Dependent)",
                "Permanent Residence (Sticker)",
                "Investor Visit Visa",
                "Diplomatic Visa",
                "Official Visa",
                "Medical Treatment Visa",
                "Escort Visa"
            ],
            aspectRatio: 1.0,
            physical: {
                widthMm: 51,
                heightMm: 51,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: false,
                backSideInstructions: "Attach with tape, paper clip, or ONE staple only (placed at top or side edge, never across the face). Do NOT use glue."
            },
            digital: {
                minWidthPx: 200,
                minHeightPx: 200,
                maxWidthPx: 1200,
                maxHeightPx: 1200,
                minKb: 5,
                maxKb: 100,
                allowedFormats: ["JPEG", "JPG", "PNG", "GIF", "BMP"],
                colorSpace: "24-bit RGB"
            },
            passportScan: {
                required: true,
                maxKb: 1024,
                allowedFormats: ["JPEG", "PNG", "PDF"]
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
                relaxedConstraints: "Babies should be laid on a flat white sheet or car seat. Eyes must be open, no pacifiers, toys, or parents' hands visible in the frame."
            },
            sourceVerification: {
                authority: "Ministry of Foreign Affairs (MOFA) / Tasheer Visa Service Centers",
                officialUrl: "https://vc.tasheer.com/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Saudi Arabia Consular Visa Photo Requirements (Tasheer)",
                metaDescription: "Get the exact 51x51 mm (2.0x2.0 inches) photo size and requirements for Saudi Arabia Tasheer centers and consular visas. Ensure high contrast attire on white background.",
                keywords: [
                    "Saudi Arabia Tasheer photo size",
                    "Saudi Arabia consular visa photo",
                    "Work visa photo guidelines Saudi",
                    "Tasheer visa application photo"
                ]
            }
        }
    ]
};