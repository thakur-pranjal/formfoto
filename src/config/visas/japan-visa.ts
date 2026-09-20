import { CountryVisaConfig } from './types';

export const japanVisaConfig: CountryVisaConfig = {
    id: "japan-visa",
    country: "Japan",
    countryCode: "JP",
    defaultProfileId: "japan-visa-photo-45x45mm",
    profiles: [
        {
            id: "japan-visa-photo-45x45mm",
            title: "Japan Visa Photo Specification",
            country: "Japan",
            countryCode: "JP",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Temporary Visitor (Tourism)",
                "Temporary Visitor (Visiting Relatives/Acquaintances)",
                "Temporary Visitor (Business Affairs)",
                "Student",
                "Trainee",
                "Cultural Activities",
                "Engineer / Specialist in Humanities / International Services",
                "Intra-company Transferee",
                "Highly Skilled Professional (1 & 2)",
                "Skilled Labor",
                "Specified Skilled Worker (i & ii)",
                "Technical Intern Training (i, ii, iii)",
                "Care Worker",
                "Professor",
                "Artist",
                "Instructor",
                "Entertainer",
                "Researcher",
                "Designated Activities (Working Holiday)",
                "Transit",
                "Crew Member",
                "Dependent",
                "Spouse or Child of Japanese National",
                "Spouse or Child of Permanent Resident",
                "Long Term Resident",
                "Permanent Resident (Entry Visa for PR holders)",
                "Business Manager",
                "Future Creation Individual Visa (J-Find)",
                "Diplomat",
                "Official",
                "Medical Stay",
                "Religious Activities",
                "Journalist",
                "Legal / Accounting Services",
                "Medical Services"
            ],
            aspectRatio: 1.0,
            physical: {
                widthMm: 45,
                heightMm: 45,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 1,
                printSheetSize: "4x6",
                backSideRequired: true,
                backSideInstructions: "Firmly pasted or glued to the designated box on the visa application form"
            },
            digital: {
                minWidthPx: 600,
                minHeightPx: 600,
                maxWidthPx: 800,
                maxHeightPx: 800,
                maxKb: 2000,
                allowedFormats: ["JPEG"],
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
                headRatioMin: 0.71,
                headRatioMax: 0.80,
                shouldersVisible: true,
                glassesAllowed: true,
                smileAllowed: false,
                contrastWarning: true
            },
            sourceVerification: {
                authority: "Ministry of Foreign Affairs of Japan (MOFA) / eMOJ Portal / Japanese Embassies and Consulates",
                officialUrl: "https://www.mofa.go.jp/j_info/visit/visa/index.html",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Japan Visa Photo Size & Requirements (45x45 mm)",
                metaDescription: "Official Japan visa photo requirements. Size must be exactly 45x45 mm (1.77x1.77 inches) with a plain white background. Prepare your application with perfect dimensions.",
                keywords: ["Japan visa photo size", "Japan visa photo requirements", "45x45mm visa photo", "MOFA Japan photo size"]
            }
        },
        {
            id: "japan-evisa-photo-upload",
            title: "Japan eVISA Photo Specification",
            country: "Japan",
            countryCode: "JP",
            type: "visa",
            channel: "digital_upload",
            applicableCategories: [
                "e-Visa (Short-Term Stay for Tourism - Single Entry)",
                "JAPAN eVISA"
            ],
            aspectRatio: 1.0,
            physical: {
                widthMm: 45,
                heightMm: 45,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 0,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 600,
                minHeightPx: 600,
                maxKb: 1024,
                allowedFormats: ["JPEG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Pure White"
            },
            biometrics: {
                headRatioMin: 0.71,
                headRatioMax: 0.80,
                shouldersVisible: true,
                glassesAllowed: true,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Relaxed constraints apply to infants (e.g., eyes slightly closed or looking away), but no hands, toys, or other persons may be visible in the frame"
            },
            sourceVerification: {
                authority: "Ministry of Foreign Affairs of Japan (MOFA) / JAPAN eVISA Portal",
                officialUrl: "https://www.evisa.mofa.go.jp/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Japan eVISA Photo Size & Digital Upload Requirements",
                metaDescription: "Official digital photo requirements for the Japan eVISA. Must be a 1:1 square, exactly 600x600 pixels minimum, under 1MB, with a pure white background.",
                keywords: ["Japan eVisa photo size", "Japan e-visa digital upload", "Japan eVisa photo requirements", "600x600 px visa photo"]
            }
        },
        {
            id: "japan-coe-residence-card-40x30mm",
            title: "Japan Certificate of Eligibility (COE) & Residence Card Photo Specification",
            country: "Japan",
            countryCode: "JP",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Student",
                "Trainee",
                "Cultural Activities",
                "Engineer / Specialist in Humanities / International Services",
                "Intra-company Transferee",
                "Highly Skilled Professional (1 & 2)",
                "Skilled Labor",
                "Specified Skilled Worker (i & ii)",
                "Technical Intern Training (i, ii, iii)",
                "Care Worker",
                "Professor",
                "Artist",
                "Instructor",
                "Entertainer",
                "Researcher",
                "Dependent",
                "Spouse or Child of Japanese National",
                "Spouse or Child of Permanent Resident",
                "Long Term Resident",
                "Permanent Resident",
                "Special Permanent Resident",
                "Business Manager",
                "Future Creation Individual Visa (J-Find)",
                "Medical Stay",
                "Religious Activities",
                "Journalist",
                "Legal / Accounting Services",
                "Medical Services"
            ],
            aspectRatio: 0.75,
            physical: {
                widthMm: 30,
                heightMm: 40,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 1,
                printSheetSize: "4x6",
                backSideRequired: true,
                backSideInstructions: "Write applicant's full name on the back of the photo before pasting it onto the application form"
            },
            digital: {
                minWidthPx: 450,
                minHeightPx: 600,
                maxKb: 2048,
                allowedFormats: ["JPEG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain, solid color (White or Light Blue recommended)"
            },
            biometrics: {
                headRatioMin: 0.55,
                headRatioMax: 0.70,
                shouldersVisible: true,
                glassesAllowed: true,
                smileAllowed: false,
                contrastWarning: true
            },
            sourceVerification: {
                authority: "Immigration Services Agency of Japan (ISA) / Ministry of Justice (MOJ) / COE Online System",
                officialUrl: "https://www.moj.go.jp/isa/applications/status/photo_info_00002.html",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Japan COE & Residence Card Photo Size (40x30 mm)",
                metaDescription: "Official Japan Certificate of Eligibility (COE) and Residence Card photo requirements. Exactly 30x40 mm (1.18x1.57 inches) with a plain solid background.",
                keywords: ["Japan COE photo size", "Japan Residence Card photo requirements", "40x30mm photo Japan", "Zairyu Card photo size"]
            }
        }
    ]
};