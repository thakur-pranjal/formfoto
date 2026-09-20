import { CountryVisaConfig } from './types';

export const australiaVisaConfig: CountryVisaConfig = {
    id: "australia-visa",
    country: "Australia",
    countryCode: "AU",
    defaultProfileId: "australia-visa",
    profiles: [
        {
            id: "australia-visa",
            title: "Australian Visa Photograph Specifications",
            country: "Australia",
            countryCode: "AU",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Subclass 600 (Visitor - Tourist stream)",
                "Subclass 870 (Sponsored Parent Temporary)",
                "Subclass 600 (Visitor - Business stream)",
                "Subclass 500 (Student)",
                "Subclass 590 (Student Guardian)",
                "Subclass 407 (Training)",
                "Subclass 482 (Temporary Skill Shortage)",
                "Subclass 494 (Skilled Employer Sponsored Regional)",
                "Subclass 186 (Employer Nomination Scheme)",
                "Subclass 189 (Skilled Independent)",
                "Subclass 190 (Skilled Nominated)",
                "Subclass 491 (Skilled Work Regional)",
                "Subclass 417 (Working Holiday)",
                "Subclass 462 (Work and Holiday)",
                "Subclass 400 (Temporary Work Short Stay Specialist)",
                "Subclass 403 (Temporary Work International Relations)",
                "Subclass 771 (Transit)",
                "Subclass 988 (Maritime Crew)",
                "Subclass 408 (Superyacht Crew)",
                "Subclass 300 (Prospective Marriage)",
                "Subclass 820/801 (Partner - Onshore)",
                "Subclass 309/100 (Partner - Offshore)",
                "Subclass 101/802 (Child)",
                "Subclass 103 (Parent)",
                "Subclass 143 (Contributory Parent)",
                "Subclass 155/157 (Resident Return)",
                "Subclass 858 (Global Talent)",
                "Subclass 188/888 (Business Innovation and Investment)",
                "Subclass 602 (Medical Treatment)"
            ],
            aspectRatio: 0.7778,
            physical: {
                widthMm: 35,
                heightMm: 45,
                targetDpi: 300,
                paperFinish: "glossy",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: true,
                backSideInstructions: "Write the applicant's name on the back of the photograph"
            },
            digital: {
                minWidthPx: 1200,
                minHeightPx: 1600,
                maxWidthPx: 1200,
                maxHeightPx: 1600,
                maxKb: 3072,
                allowedFormats: ["JPG", "JPEG", "PNG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true,
                maxKb: 3072,
                allowedFormats: ["PDF", "JPG", "PNG"]
            },
            background: {
                requiredHex: "#C0C0C0",
                label: "Neutral or light grey"
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
                relaxedConstraints: "Child must be photographed alone with no other person, furniture, or objects visible"
            },
            sourceVerification: {
                authority: "Australian Department of Home Affairs",
                officialUrl: "https://immi.homeaffairs.gov.au/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Australia Visa Photo Requirements & Size Guide",
                metaDescription: "Official Australia visa photo requirements. Ensure your photo is exactly 35x45mm (1.38x1.77 inches) with a neutral or light grey background.",
                keywords: [
                    "Australia visa photo size",
                    "Subclass 600 photo requirements",
                    "Australia digital visa photo rules",
                    "Australia visa picture dimensions"
                ]
            }
        },
        {
            id: "australian-visa-paper",
            title: "Australian Visa Photograph Specifications (Paper Application)",
            country: "Australia",
            countryCode: "AU",
            type: "visa",
            channel: "physical_print",
            applicableCategories: [
                "Subclass 200/201/202/203/204 (Humanitarian & Refugee)",
                "Subclass 995 (Diplomatic)"
            ],
            aspectRatio: 0.7778,
            physical: {
                widthMm: 35,
                heightMm: 45,
                targetDpi: 300,
                paperFinish: "glossy",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: true,
                backSideInstructions: "Write applicant's name clearly on the back of each photograph"
            },
            background: {
                requiredHex: "#C0C0C0",
                label: "Neutral or light grey"
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
                relaxedConstraints: "Children under 3 years of age are allowed to have their mouths open; no parents, hands, or objects may be visible in the frame"
            },
            sourceVerification: {
                authority: "Australian Department of Home Affairs",
                officialUrl: "https://immi.homeaffairs.gov.au/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Australia Paper Visa Photo Requirements",
                metaDescription: "Official Australia paper application visa photo requirements. Physical prints must be 35x45mm (1.38x1.77 inches) and printed on high-quality photographic paper.",
                keywords: [
                    "Australia paper visa photo size",
                    "Subclass 200 photo requirements",
                    "Australia diplomatic visa photo",
                    "Australia physical visa photo specifications"
                ]
            }
        }
    ]
};