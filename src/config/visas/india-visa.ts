import { CountryVisaConfig } from './types';

export const indiaVisaConfig: CountryVisaConfig = {
    id: "india-visa",
    country: "India",
    countryCode: "IN",
    defaultProfileId: "india-evisa",
    profiles: [
        {
            id: "india-evisa",
            title: "India e-Visa",
            country: "India",
            countryCode: "IN",
            type: "visa",
            channel: "digital_upload",
            applicableCategories: [
                "e-Tourist Visa (30-day, 1-year, 5-year)",
                "e-Business Visa",
                "e-Medical Visa",
                "e-Medical Attendant",
                "e-Conference Visa",
                "e-Ayush",
                "e-Ayush Attendant",
                "e-Emergency X-Misc"
            ],
            aspectRatio: 1.00,
            physical: {
                widthMm: 51,
                heightMm: 51,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 0,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 350,
                minHeightPx: 350,
                maxWidthPx: 1000,
                maxHeightPx: 1000,
                minKb: 10,
                maxKb: 1024,
                allowedFormats: ["JPEG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true,
                maxKb: 300,
                allowedFormats: ["PDF"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain light-colored or white"
            },
            biometrics: {
                headRatioMin: 0.49,
                headRatioMax: 0.69,
                shouldersVisible: true,
                glassesAllowed: false,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Relaxed constraints for newborns, but standard positioning rules apply generally."
            },
            sourceVerification: {
                authority: "Government of India / indianvisaonline.gov.in",
                officialUrl: "https://indianvisaonline.gov.in/evisa/tvoa.html",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "India e-Visa Photo Requirements & Size (2x2 inches)",
                metaDescription: "Official India e-Visa digital photo specifications. Ensure your image is square (1:1), 350x350 to 1000x1000 pixels, exactly 51x51 mm (2.0x2.0 inches) if printed, under 1 MB, with a white background.",
                keywords: [
                    "India e-visa photo size",
                    "India ETA photo requirements",
                    "Indian electronic visa photo",
                    "e-Tourist visa photo specs"
                ]
            }
        },
        {
            id: "india-regular-visa",
            title: "India Regular Visa",
            country: "India",
            countryCode: "IN",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "Tourist Visa (T)",
                "Business Visa (B)",
                "Student Visa (S, S-1 to S-6)",
                "Research Visa (R)",
                "Intern Visa (I)",
                "Employment Visa (E)",
                "Project Visa (P)",
                "Transit Visa (TR)",
                "Entry Visa (X, X-1, X-2, X-Misc, S-X, E-X)",
                "Medical Visa (MED)",
                "Medical Attendant (MED-X)",
                "Conference Visa (C)",
                "Journalist Visa (J)",
                "Film Visa (F)",
                "Missionary Visa (M)",
                "Diplomatic Visa",
                "Official Visa"
            ],
            aspectRatio: 1.00,
            physical: {
                widthMm: 51,
                heightMm: 51,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: true,
                backSideInstructions: "Paste one photo on the designated box on the first page of the printed application form; submit the second photo loose."
            },
            digital: {
                minWidthPx: 350,
                minHeightPx: 350,
                maxWidthPx: 1000,
                maxHeightPx: 1000,
                minKb: 10,
                maxKb: 300,
                allowedFormats: ["JPEG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true,
                maxKb: 500,
                allowedFormats: ["PDF"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain light-colored or white"
            },
            biometrics: {
                headRatioMin: 0.50,
                headRatioMax: 0.69,
                shouldersVisible: true,
                glassesAllowed: false,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Babies under one year do not have to have their eyes open. For children under ten years of age, requirements can be somewhat relaxed in respect of head size and eye position."
            },
            sourceVerification: {
                authority: "Government of India / indianvisaonline.gov.in / VFS Global",
                officialUrl: "https://indianvisaonline.gov.in/visa/instruction.html",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "India Regular Visa Photo Size & Specs (51x51mm)",
                metaDescription: "Official India Regular Visa photo specifications. Requires 51x51 mm (2.0x2.0 inches) physical prints and 350x350 to 1000x1000 pixels digital upload with white background.",
                keywords: [
                    "India regular visa photo size",
                    "Indian consulate visa photo",
                    "51x51mm visa photo India",
                    "Employment Visa photo requirements"
                ]
            }
        },
        {
            id: "india-oci-card",
            title: "India Overseas Citizen of India",
            country: "India",
            countryCode: "IN",
            type: "visa",
            channel: "both",
            applicableCategories: [
                "OCI Foreign Spouse Registration",
                "OCI New Registration",
                "OCI Miscellaneous Services (Renewal/Update)"
            ],
            aspectRatio: 1.00,
            physical: {
                widthMm: 51,
                heightMm: 51,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 2,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 200,
                minHeightPx: 200,
                maxWidthPx: 1500,
                maxHeightPx: 1500,
                minKb: 20,
                maxKb: 500,
                allowedFormats: ["JPEG", "JPG"],
                colorSpace: "sRGB"
            },
            signature: {
                required: true,
                minWidthPx: 200,
                minHeightPx: 67,
                maxKb: 500
            },
            passportScan: {
                required: true,
                maxKb: 1000,
                allowedFormats: ["PDF"]
            },
            background: {
                requiredHex: "#D3D3D3",
                label: "Plain light color, NOT white (e.g., Light Grey, Light Blue, or Cream)"
            },
            biometrics: {
                headRatioMin: 0.50,
                headRatioMax: 0.69,
                shouldersVisible: true,
                glassesAllowed: true,
                smileAllowed: false,
                contrastWarning: true
            },
            infantRules: {
                applicable: true,
                relaxedConstraints: "Relaxed constraints for newborns and infants regarding eye position and head size."
            },
            sourceVerification: {
                authority: "Government of India / ociservices.gov.in",
                officialUrl: "https://ociservices.gov.in/Photo-Spec-FINAL.pdf",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "India OCI Card Photo Requirements (Non-White Background)",
                metaDescription: "Official OCI card photo specifications. 51x51 mm (2.0x2.0 inches) physical prints or digital 200x200 to 1500x1500 pixels. Strict requirement: Light-colored background, NOT white.",
                keywords: [
                    "OCI card photo size",
                    "India OCI photo background",
                    "OCI registration photo requirements",
                    "OCI miscellaneous services photo"
                ]
            }
        },
        {
            id: "india-e-frro",
            title: "India e-FRRO",
            country: "India",
            countryCode: "IN",
            type: "visa",
            channel: "digital_upload",
            applicableCategories: [
                "Tourist Visa Extension (Extreme emergencies only)",
                "Business Visa Extension / Registration",
                "Student Visa Extension / Registration",
                "Employment Visa Extension / Registration",
                "Entry Visa (X) Extension / Registration",
                "Medical Visa Extension",
                "Exit Permits",
                "Return Visas",
                "PIO to OCI conversion endorsements",
                "e-FRRO Registration Certificate & Residence Permit"
            ],
            aspectRatio: 1.00,
            physical: {
                widthMm: 35,
                heightMm: 35,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 0,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            digital: {
                minWidthPx: 350,
                minHeightPx: 350,
                maxWidthPx: 1000,
                maxHeightPx: 1000,
                minKb: 10,
                maxKb: 1024,
                allowedFormats: ["JPEG", "JPG"],
                colorSpace: "sRGB"
            },
            passportScan: {
                required: true,
                maxKb: 200,
                allowedFormats: ["PDF"]
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "Plain light-colored or white"
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
                relaxedConstraints: "Relaxed constraints for newborns and infants regarding expression and gaze."
            },
            sourceVerification: {
                authority: "Government of India / e-FRRO Portal",
                officialUrl: "https://indianfrro.gov.in/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "India e-FRRO Visa Extension Photo Size & Guidelines",
                metaDescription: "Official India e-FRRO photo guidelines. 350x350 to 1000x1000 pixels (1:1 ratio square) image under 1MB, or 35x35 mm (1.38x1.38 inches) physical equivalent, with a white background.",
                keywords: [
                    "e-FRRO photo size",
                    "India visa extension photo",
                    "e-FRRO residence permit photo",
                    "e-FRRO digital upload specs"
                ]
            }
        }
    ]
};