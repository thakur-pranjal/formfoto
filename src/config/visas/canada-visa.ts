import { CountryVisaConfig } from './types';

export const canadaVisaConfig: CountryVisaConfig = {
    id: "canada-visa",
    country: "Canada",
    countryCode: "CA",
    defaultProfileId: "canada-temporary-resident-visa-photo",
    profiles: [
        {
            id: "canada-temporary-resident-visa-photo",
            title: "Canada Temporary Resident Visa Photo",
            country: "Canada",
            countryCode: "CA",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Visitor Visa (V-1)",
                "Super Visa for Parents and Grandparents (PG-1)",
                "Business Visitor Visa (B-1)",
                "Study Permit / Student Visa (S-1)",
                "Study and Work / Co-op (SW-1)",
                "Temporary Worker (W-1)",
                "Working Holiday / International Experience Canada (W-1)",
                "Intra-Company Transfer (W-1)",
                "Transit Visa (VH-1)",
                "Air Crew (W-X / V-1)",
                "Spousal Open Work Permit (W-1)",
                "Dependent Child Visitor (V-1) or Student (S-1)",
                "Start-Up Visa Temporary Work Permit (W-1)",
                "Diplomatic Visa (D-1)",
                "Official Visa (O-1)",
                "Courtesy Visa (C-1)",
                "Facilitation Visa (F-1)",
                "Refugee/Asylum claimant (RA-1)"
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
                backSideInstructions: "Write applicant's name and date of birth on the back of the photos"
            },
            digital: {
                minWidthPx: 420,
                minHeightPx: 540,
                minKb: 60,
                maxKb: 4000,
                allowedFormats: ["JPEG", "JPEG2000"],
                colorSpace: "24-bit RGB / sRGB"
            },
            passportScan: {
                required: true,
                maxKb: 4000,
                allowedFormats: ["JPEG", "PDF"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain white or light-coloured"
            },
            biometrics: {
                headRatioMin: 0.69,
                headRatioMax: 0.80,
                shouldersVisible: true,
                glassesAllowed: true,
                smileAllowed: false,
                contrastWarning: false
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Newborns do not need neutral expressions, infants can have eyes closed, parental support hands must not be visible in frame"
            },
            sourceVerification: {
                authority: "Immigration, Refugees and Citizenship Canada (IRCC)",
                officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/application/application-forms-guides/temporary-resident-visa-application-photograph-specifications.html",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Canada Temporary Resident Visa Photo Requirements & Size",
                metaDescription: "Official IRCC Canada Temporary Resident Visa photo requirements. Exact dimensions: 35x45 mm (1 3/8 x 1 3/4 inches). Perfect for V-1, S-1, and W-1 applications.",
                keywords: [
                    "Canada visa photo size",
                    "Canada TRV photo requirements",
                    "Canadian student visa photo",
                    "Canada work permit photo guidelines"
                ]
            }
        },
        {
            id: "canada-permanent-resident-citizenship-photo",
            title: "Canada Permanent Resident & Citizenship Photo",
            country: "Canada",
            countryCode: "CA",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Family Class Sponsorship PR (IM-1)",
                "Permanent Resident Visa (IM-1)",
                "Permanent Resident Card (PR Card Initial & Renewal)",
                "Permanent Resident Travel Document (PRTD)",
                "Start-Up Visa PR (IM-1)",
                "Self-Employed Persons PR (IM-1)",
                "Humanitarian and Compassionate Grounds PR (IM-1)",
                "Citizenship Certificate"
            ],
            aspectRatio: 0.7143,
            physical: {
                widthMm: 50,
                heightMm: 70,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: true,
                backSideInstructions: "Back of 1 photo must include subject's name and DOB, photography studio name and complete address, and date taken"
            },
            digital: {
                minWidthPx: 715,
                minHeightPx: 1000,
                maxWidthPx: 2000,
                maxHeightPx: 2800,
                maxKb: 4000,
                allowedFormats: ["JPEG", "PNG"],
                colorSpace: "24-bit RGB / sRGB"
            },
            passportScan: {
                required: true,
                maxKb: 4000,
                allowedFormats: ["JPEG", "PDF"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain, untextured white"
            },
            biometrics: {
                headRatioMin: 0.44,
                headRatioMax: 0.51,
                shouldersVisible: true,
                glassesAllowed: true,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Newborns may be photographed in a car seat with a white blanket behind the head. No parental hands visible in frame."
            },
            sourceVerification: {
                authority: "Immigration, Refugees and Citizenship Canada (IRCC)",
                officialUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/permanent-residents/card/photos.html",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Canada PR Card & Citizenship Photo Size Guide",
                metaDescription: "Official specifications for Canada PR and Citizenship photos. Exact dimensions: 50x70 mm (2 x 2 3/4 inches). Follow strict contrast and background rules to avoid rejection.",
                keywords: [
                    "Canada PR photo size",
                    "Canadian citizenship photo dimensions",
                    "Canada permanent resident card photo requirements",
                    "IRCC PR photo guide",
                    "50x70 mm visa photo"
                ]
            }
        }
    ]
};