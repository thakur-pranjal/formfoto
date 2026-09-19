import { CountryVisaConfig } from './types';

export const schengenVisaConfig: CountryVisaConfig = {
    id: "schengen-visa",
    country: "Schengen Area",
    countryCode: "EU",
    defaultProfileId: "schengen-visa",
    profiles: [
        {
            id: "schengen-visa",
            title: "Schengen Area Visa",
            country: "Schengen Area",
            countryCode: "EU",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Type C (Uniform Short-Stay Visa - Tourism)",
                "Type C (Visit to Family/Friends)",
                "Type C (Business Visitor)",
                "Type C (Trade Fair / Conference)",
                "Type C (Short-Term Study / Language Course)",
                "Type D (National Long-Stay Visa - Student / Academic)",
                "Type C (Short-Term Seasonal Work)",
                "Type D (National Long-Stay Visa - Employment / EU Blue Card / ICT)",
                "Type A (Airport Transit Visa)",
                "Type C (Seafarer / Air Crew Transit)",
                "Type C (EU/EEA Family Member)",
                "Type D (National Long-Stay Visa - Family Reunification)",
                "Type D (National Long-Stay Visa - Retirement / Non-Lucrative / Settlement)",
                "Type D (National Long-Stay Visa - Investor / Golden Visa / Startup Founder)",
                "Type C (Medical Treatment / Cultural / Sports / Official Visit)",
                "Type D (National Long-Stay Visa - Researcher / Religious / Humanitarian)"
            ],
            aspectRatio: 0.7778,
            physical: {
                widthMm: 35,
                heightMm: 45,
                targetDpi: 600,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 700,
                minHeightPx: 900,
                maxWidthPx: 1000,
                maxHeightPx: 1200,
                maxKb: 2048,
                allowedFormats: ["JPEG", "JPG"],
                colorSpace: "24-bit RGB"
            },
            passportScan: {
                required: true,
                maxKb: 2048,
                allowedFormats: ["PDF", "JPEG"]
            },
            background: {
                requiredHex: "#E0E0E0",
                label: "Plain light grey or neutral light color; pure white discouraged"
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
                relaxedConstraints: "Under 10 years: Head height 50-80% allowed. Under 6 years: Relaxed head position and expression constraints. Under 1 year: Eyes may be closed, no hands/supports visible."
            },
            sourceVerification: {
                authority: "European Union Member States / Bundesministerium des Innern (BMI)",
                officialUrl: "https://www.bmi.bund.de/SharedDocs/downloads/DE/publikationen/themen/moderne-verwaltung/BMI24037-fotomustertafel.pdf",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Schengen Visa Photo Requirements & Exact Biometric Size 2026",
                metaDescription: "Official Schengen Area Visa photo guidelines. Exact physical dimensions: 35x45 mm (1.38x1.77 inches). Requires light grey background and neutral expression.",
                keywords: [
                    "Schengen visa photo size",
                    "Schengen visa photo requirements",
                    "Type C visa photo",
                    "Type D visa photo",
                    "35x45mm visa photo",
                    "EU visa picture dimensions"
                ]
            }
        },
        {
            id: "schengen-visa-eu-vap",
            title: "Schengen Area Visa (EU VAP & National Digital Portals)",
            country: "Schengen Area",
            countryCode: "EU",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Type C (Uniform Short-Stay Visa - Tourism)",
                "Type C (Visit to Family/Friends)",
                "Type C (Business Visitor)",
                "Type C (Trade Fair / Conference)",
                "Type C (Short-Term Study / Language Course)",
                "Type D (National Long-Stay Visa - Student / Academic)",
                "Type C (Short-Term Seasonal Work)",
                "Type D (National Long-Stay Visa - Employment / EU Blue Card / ICT)",
                "Type A (Airport Transit Visa)",
                "Type C (Seafarer / Air Crew Transit)",
                "Type C (EU/EEA Family Member)",
                "Type D (National Long-Stay Visa - Family Reunification)",
                "Type D (National Long-Stay Visa - Retirement / Non-Lucrative / Settlement)",
                "Type D (National Long-Stay Visa - Investor / Golden Visa / Startup Founder)",
                "Type C (Medical Treatment / Cultural / Sports / Official Visit)",
                "Type D (National Long-Stay Visa - Researcher / Religious / Humanitarian)"
            ],
            aspectRatio: 0.7778,
            physical: {
                widthMm: 35,
                heightMm: 45,
                targetDpi: 600,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 413,
                minHeightPx: 531,
                maxWidthPx: 827,
                maxHeightPx: 1063,
                minKb: 10,
                maxKb: 2048,
                allowedFormats: ["JPEG", "JPG"],
                colorSpace: "24-bit RGB (sRGB)"
            },
            passportScan: {
                required: true,
                maxKb: 2048,
                allowedFormats: ["PDF", "JPEG"]
            },
            background: {
                requiredHex: "#E0E0E0",
                label: "Plain light-colored (Light Grey preferred; pure white prohibited by some member states like France and Germany)"
            },
            biometrics: {
                headRatioMin: 0.71,
                headRatioMax: 0.80,
                eyeLinePercentFromBottom: 0.60,
                shouldersVisible: true,
                glassesAllowed: true,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Under 1 year: Eyes may be closed, no hands/supports visible. Under 6 years: Relaxed head position and expression constraints. Under 10 years: Head height 50-80% allowed."
            },
            sourceVerification: {
                authority: "European Union / EU Visa Application Platform (VAP) & Member State Consulates",
                officialUrl: "https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R2685",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "EU VAP Schengen Visa Photo Requirements & Digital Upload Specs",
                metaDescription: "Digital photo requirements for the EU Visa Application Platform (VAP). Dimensions: 413x531 px minimum, matching 35x45 mm (1.38x1.77 inches) physical ratio. Light grey background required.",
                keywords: [
                    "EU VAP photo size",
                    "digital Schengen visa photo",
                    "Schengen online application photo",
                    "EU Visa portal upload",
                    "35x45 mm digital visa photo",
                    "Schengen visa digital specifications"
                ]
            }
        }
    ]
};