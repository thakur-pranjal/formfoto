import { CountryVisaConfig } from './types';

export const singaporeVisaConfig: CountryVisaConfig = {
    id: "singapore-visa",
    country: "Singapore",
    countryCode: "SG",
    defaultProfileId: "singapore-visa-and-work-pass",
    profiles: [
        {
            id: "singapore-visa-and-work-pass",
            title: "Singapore Visa and Work Pass",
            country: "Singapore",
            countryCode: "SG",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Entry Visa (Assessment Level 1 & 2 e-Visa via SAVE)",
                "Short-Term Visit Pass (STVP) Extension",
                "Entry Visa (Business via SAVE)",
                "Multiple Journey Visa (MJV)",
                "APEC Business Travel Card (ABTC)",
                "Student's Pass (STP)",
                "Training Employment Pass (TEP)",
                "Training Work Permit (TWP)",
                "Employment Pass (EP)",
                "S Pass (SP)",
                "Work Permit (WP) (Migrant Worker, Migrant Domestic Worker, Confinement Nanny)",
                "Personalised Employment Pass (PEP)",
                "Work Holiday Pass (WHP)",
                "Crew Pass",
                "Dependant's Pass (DP)",
                "Long-Term Visit Pass (LTVP - ICA & MOM)",
                "Long-Term Visit Pass Plus (LTVP+)",
                "Permanent Residence (e-PR) (PTS Scheme, GIP Scheme, Foreign Artistic Talent Scheme)",
                "EntrePass",
                "Tech.Pass",
                "Global Investor Programme (GIP)",
                "Miscellaneous Work Pass (MWP)"
            ],
            aspectRatio: 0.7778,
            physical: {
                widthMm: 35,
                heightMm: 45,
                targetDpi: 300,
                paperFinish: "matte",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 400,
                minHeightPx: 514,
                maxWidthPx: 400,
                maxHeightPx: 514,
                maxKb: 8192,
                allowedFormats: ["JPG", "JPEG", "PNG", "HEIC", "HEIF"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain White"
            },
            biometrics: {
                headRatioMin: 0.56,
                headRatioMax: 0.78,
                shouldersVisible: true,
                glassesAllowed: true,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Babies under one year old are not required to have their eyes open; child must be alone in the photo with no toys or hands visible"
            },
            sourceVerification: {
                authority: "Immigration & Checkpoints Authority (ICA) / Ministry of Manpower (MOM)",
                officialUrl: "https://www.ica.gov.sg/photo-guidelines",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Singapore Visa & Work Pass Photo Requirements",
                metaDescription: "Official Singapore visa and work pass photo requirements. The exact required dimensions are 35 mm x 45 mm (1.38 x 1.77 inches) on a plain white background.",
                keywords: [
                    "Singapore visa photo size",
                    "Singapore work pass photo requirements",
                    "ICA photo guidelines",
                    "MOM photo size",
                    "Singapore e-Visa picture dimensions"
                ]
            }
        },
        {
            id: "singapore-visa-form-14a-consular-physical-print-35x45mm",
            title: "Singapore Visa (Form 14A)",
            country: "Singapore",
            countryCode: "SG",
            type: "visa",
            channel: "physical_print",
            applicableCategories: [
                "Entry Visa (Form 14A via AVA/Mission for applicants without a local sponsor)",
                "Entry Visa (Business - Form 14A via AVA/Mission)"
            ],
            aspectRatio: 0.7778,
            physical: {
                widthMm: 35,
                heightMm: 45,
                targetDpi: 300,
                paperFinish: "matte",
                copiesRequired: 1,
                printSheetSize: "4x6",
                backSideRequired: false,
                backSideInstructions: "Glued/affixed to Form 14A"
            },
            digital: {
                minWidthPx: 400,
                minHeightPx: 514,
                maxWidthPx: 400,
                maxHeightPx: 514,
                maxKb: 8192,
                allowedFormats: ["JPG", "JPEG", "PNG", "HEIC", "HEIF"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain White"
            },
            biometrics: {
                headRatioMin: 0.56,
                headRatioMax: 0.78,
                shouldersVisible: true,
                glassesAllowed: true,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Relaxed constraints (e.g., babies under one year old are not required to have their eyes open; children must be alone in the photo with no toys or hands visible)"
            },
            sourceVerification: {
                authority: "Immigration & Checkpoints Authority (ICA) / Ministry of Foreign Affairs (MFA)",
                officialUrl: "https://www.ica.gov.sg/photo-guidelines",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Singapore Visa Form 14A Photo Requirements",
                metaDescription: "Official photo specifications for Singapore Form 14A consular visa applications. Required size is exactly 35 mm x 45 mm (1.38 x 1.77 inches) on a white background.",
                keywords: [
                    "Singapore Visa Form 14A photo size",
                    "Entry Visa photo requirements Singapore",
                    "Consular visa photo dimensions SG",
                    "Singapore embassy visa photo"
                ]
            }
        }
    ]
};