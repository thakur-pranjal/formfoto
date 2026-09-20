import { CountryVisaConfig } from './types';

export const southKoreaVisaConfig: CountryVisaConfig = {
    id: "south-korea-visa",
    country: "South Korea",
    countryCode: "KR",
    defaultProfileId: "south-korea-visa",
    profiles: [
        {
            id: "south-korea-visa",
            title: "South Korea Visa Photo Specifications",
            country: "South Korea",
            countryCode: "KR",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "C-3-1 (Short-term General)",
                "C-3-2 (Group Tourist)",
                "C-3-3 (Medical Tourist)",
                "C-3-9 (Ordinary Tourist)",
                "C-3-4 (Short-term Business)",
                "D-2 (Student - including D-2-1 to D-2-8)",
                "D-4 (General Trainee - including D-4-1, D-4-2, D-4-7)",
                "C-4 (Short-term Employment)",
                "E-1 (Professor)",
                "E-2 (Foreign Language Instructor)",
                "E-3 (Researcher)",
                "E-4 (Technology Transfer)",
                "E-5 (Professional)",
                "E-6 (Arts & Performances)",
                "E-7 (Special Occupation - including E-7-1 to E-7-4)",
                "E-8 (Seasonal Worker)",
                "E-9 (Non-professional Employment)",
                "E-10 (Maritime Crew)",
                "H-1 (Working Holiday)",
                "H-2 (Working Visit)",
                "C-3-10 (Direct Transit)",
                "F-1 (Family Visitor)",
                "F-3 (Dependent Family)",
                "F-6 (Marriage Migrant)",
                "F-2 (Resident)",
                "F-4 (Overseas Korean)",
                "F-5 (Permanent Resident)",
                "D-8 (Corporate Investment)",
                "D-9 (International Trade/Management)",
                "D-10 (Job Seeker / Tech Startup)",
                "A-1 (Diplomat)",
                "A-2 (Official)",
                "A-3 (Treaties/SOFA)",
                "C-1 (Temporary Journalism)",
                "D-1 (Arts and Culture)",
                "D-3 (Industrial Trainee)",
                "D-5 (Long-Term News Coverage)",
                "D-6 (Religion)",
                "D-7 (Intra-Company Transferee)",
                "G-1 (Miscellaneous / Medical Treatment / Litigation / Humanitarian)",
                "Confirmation of Visa Issuance (사증발급인정서 - digital sponsor upload)"
            ],
            aspectRatio: 0.7778,
            physical: {
                widthMm: 35,
                heightMm: 45,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 1,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 413,
                minHeightPx: 531,
                minKb: 50,
                maxKb: 200,
                allowedFormats: ["JPEG"],
                colorSpace: "24-bit RGB / sRGB"
            },
            passportScan: {
                required: true,
                maxKb: 300,
                allowedFormats: ["JPEG"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain White"
            },
            biometrics: {
                headRatioMin: 0.71,
                headRatioMax: 0.80,
                shouldersVisible: true,
                glassesAllowed: false,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Toddlers can have a soft, natural expression but must not be laughing with their mouths open. No visible hands, parents, toys, or pacifiers in the frame."
            },
            sourceVerification: {
                authority: "Ministry of Justice / Korea Visa Portal (visa.go.kr)",
                officialUrl: "https://www.visa.go.kr/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "South Korea Visa Photo Size & Requirements",
                metaDescription: "Official South Korea visa photo requirements. Exact dimensions: 35x45 mm (1.38x1.77 inches). Perfect for Tourist (C-3), Student (D-2), Work (E-7), and other categories.",
                keywords: [
                    "South Korea visa photo size",
                    "South Korea visa photo requirements",
                    "Korea Visa Portal photo",
                    "C-3 visa photo",
                    "D-2 visa photo",
                    "35x45mm Korea"
                ]
            }
        },
        {
            id: "south-korea-k-eta",
            title: "South Korea K-ETA (Electronic Travel Authorization) Photo Specifications",
            country: "South Korea",
            countryCode: "KR",
            type: "visa",
            channel: "digital_upload",
            applicableCategories: [
                "K-ETA (Electronic Travel Authorization for eligible visa-exempt travelers entering under B-1 and B-2 status frameworks)"
            ],
            aspectRatio: 1.0,
            physical: {
                widthMm: 0,
                heightMm: 0,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 0,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 100,
                minHeightPx: 100,
                maxWidthPx: 700,
                maxHeightPx: 700,
                maxKb: 100,
                allowedFormats: ["JPG", "JPEG"],
                colorSpace: "sRGB / 24-bit RGB"
            },
            passportScan: {
                required: true,
                maxKb: 300,
                allowedFormats: ["JPG", "JPEG"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain White or Light Gray"
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
                relaxedConstraints: "Eyes must be open and mouth closed. No hands, parents, toys, or pacifiers allowed in the frame."
            },
            sourceVerification: {
                authority: "Ministry of Justice / K-ETA Portal (k-eta.go.kr)",
                officialUrl: "https://www.k-eta.go.kr/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "South Korea K-ETA Photo Size & Requirements",
                metaDescription: "Official South Korea K-ETA digital photo requirements. Exactly 1:1 aspect ratio (max 700x700 pixels) and under 100 KB for direct portal upload.",
                keywords: [
                    "South Korea K-ETA photo size",
                    "K-ETA photo requirements",
                    "K-ETA digital photo",
                    "Korea ETA requirements",
                    "1:1 K-ETA photo"
                ]
            }
        }
    ]
};