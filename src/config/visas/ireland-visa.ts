import { CountryVisaConfig } from './types';

export const irelandVisaConfig: CountryVisaConfig = {
    id: "ireland-visa",
    country: "Ireland",
    countryCode: "IE",
    defaultProfileId: "ireland-visa-avats-consular-print",
    profiles: [
        {
            id: "ireland-visa-avats-consular-print",
            title: "Ireland Visa Photo",
            country: "Ireland",
            countryCode: "IE",
            type: "visa",
            channel: "physical_print",
            applicableCategories: [
                "Short Stay 'C' Tourist Visa",
                "Short Stay 'C' Visit (Family/Friends) Visa",
                "Short Stay 'C' Business Visa",
                "Short Stay 'C' Conference/Event Visa",
                "Short Stay 'C' Performance/Tournament Visa",
                "Transit 'C' Visa",
                "Seafarer 'C' Visa",
                "Short Stay 'C' Exam Visa",
                "Short Stay 'C' Study Visa",
                "Long Stay 'D' Study Visa (Academic/Vocational)",
                "Long Stay 'D' Employment Visa",
                "Long Stay 'D' Critical Skills Employment Visa",
                "Long Stay 'D' Intra-Company Transfer (ICT) Visa",
                "Long Stay 'D' Atypical Working Scheme (AWS) Visa",
                "Long Stay 'D' Working Holiday Authorisation (WHA) Visa",
                "Long Stay 'D' Internship Visa",
                "Long Stay 'D' Join Family Visa (Spouse/De Facto Partner/Child)",
                "Long Stay 'D' Parent of Irish Citizen Child Visa",
                "Long Stay 'D' Reside in Ireland (Without Employment) Visa",
                "Long Stay 'D' Start-up Entrepreneur Programme (STEP) Visa",
                "Short Stay 'C' Medical Treatment Visa",
                "Long Stay 'D' Minister of Religion Visa",
                "Long Stay 'D' Volunteer Visa"
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
                backSideInstructions: "Write the applicant's name and visa application/transaction number in BLOCK CAPITALS on the reverse of each photo (ignore transaction number for re-entry visas). Submit loose in the same envelope as the application form."
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain White or Light Grey"
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
                relaxedConstraints: "Child must be alone in the photo; no toys, pacifiers, or parents' hands visible."
            },
            sourceVerification: {
                authority: "Immigration Service Delivery (Department of Justice)",
                officialUrl: "https://www.irishimmigration.ie/photograph-rules-for-visa-applications/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Ireland Visa Photo Size & Requirements | AVATS Guidelines",
                metaDescription: "Official Ireland visa photo size guidelines for AVATS consular applications. Exact dimensions are 35-38 mm width by 45-50 mm height (1.38x1.77 inches).",
                keywords: [
                    "Ireland visa photo size",
                    "Short Stay C Visa photo requirements",
                    "Long Stay D Visa photo dimensions",
                    "Irish immigration picture guidelines",
                    "AVATS photo requirements"
                ]
            }
        }
    ]
};