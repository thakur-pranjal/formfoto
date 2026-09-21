import { CountryVisaConfig } from './types';

export const mexicoVisaConfig: CountryVisaConfig = {
    id: "mexico-visa",
    country: "Mexico",
    countryCode: "MX",
    defaultProfileId: "mexico-visa-photo",
    profiles: [
        {
            id: "mexico-visa-photo",
            title: "Mexico Visa Photo",
            country: "Mexico",
            countryCode: "MX",
            type: "visa",
            channel: "physical_print",
            applicableCategories: [
                "Visa de Visitante sin permiso para realizar actividades remuneradas (Tourism)",
                "Visa de Visitante sin permiso para realizar actividades remuneradas (Business)",
                "Visa de Visitante sin permiso para realizar actividades remuneradas (Transit)",
                "Visa de Residente Temporal Estudiante",
                "Visa de Visitante con permiso para realizar actividades remuneradas",
                "Visa de Residente Temporal (Oferta de Empleo)",
                "Visa de Residente Temporal (Unidad Familiar)",
                "Visa de Residente Permanente (Unidad Familiar)",
                "Visa de Residente Permanente",
                "Visa de Residente Permanente (Jubilado / Pensionista)",
                "Visa de Residente Temporal (Inversionista)",
                "Visa de Visitante para Trámites de Adopción",
                "Visa Diplomática",
                "Visa Oficial"
            ],
            aspectRatio: 0.79,
            physical: {
                widthMm: 31,
                heightMm: 39,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 1,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "White"
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
                relaxedConstraints: "Relaxed constraints on expression (eyes must be open, no support hands or parents visible in frame)"
            },
            sourceVerification: {
                authority: "Secretaría de Relaciones Exteriores (SRE)",
                officialUrl: "https://embamex.sre.gob.mx/",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Mexico Visa Photo Requirements & Size (31x39 mm)",
                metaDescription: "Official Mexico visa photo size is 31x39 mm (1.22x1.53 inches). Ensure your photo meets strict biometric guidelines, including a pure white background and no glasses.",
                keywords: [
                    "Mexico visa photo size",
                    "Mexico visa photo requirements",
                    "Visitante sin permiso photo",
                    "Mexico Residente Temporal photo rules"
                ]
            }
        },
        {
            id: "mexico-inm-residente-infantil",
            title: "Mexico INM Tarjeta de Residente Photo (Tamaño Infantil)",
            country: "Mexico",
            countryCode: "MX",
            type: "visa",
            channel: "physical_print",
            applicableCategories: [
                "Tarjeta de Visitante Regional",
                "Tarjeta de Visitante Trabajador Fronterizo",
                "Tarjeta de Residente Temporal Estudiante",
                "Tarjeta de Residente Temporal (con permiso de trabajo)",
                "Tarjeta de Residente Temporal (Unidad Familiar)",
                "Tarjeta de Residente Permanente (Unidad Familiar)",
                "Tarjeta de Residente Permanente",
                "Tarjeta de Residente Temporal (Inversionista)",
                "Tarjeta de Visitante para Trámites de Adopción",
                "Tarjeta de Visitante por Razones Humanitarias"
            ],
            aspectRatio: 0.83,
            physical: {
                widthMm: 25,
                heightMm: 30,
                targetDpi: 300,
                paperFinish: "any",
                copiesRequired: 3,
                printSheetSize: "4x6",
                backSideRequired: false
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "White"
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
                relaxedConstraints: "Relaxed constraints on expression (eyes must be open, no support hands visible)"
            },
            sourceVerification: {
                authority: "Instituto Nacional de Migración (INM) / Secretaría de Gobernación (SEGOB)",
                officialUrl: "https://www.gob.mx/inm",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Mexico INM Tarjeta de Residente Photo Size (Tamaño Infantil)",
                metaDescription: "Official INM Mexico Tarjeta de Residente photo requirements. Tamaño infantil size is 25x30 mm (0.98x1.18 inches). Requires 2 front-facing and 1 right-profile photo.",
                keywords: [
                    "Mexico INM photo size",
                    "Tamaño infantil photo dimensions",
                    "Mexico Tarjeta de Residente photo requirements",
                    "INM Mexico right-profile photo"
                ]
            }
        },
        {
            id: "mexico-sae-digital",
            title: "Mexico Sistema de Autorización Electrónica (SAE)",
            country: "Mexico",
            countryCode: "MX",
            type: "visa",
            channel: "digital_upload",
            applicableCategories: [
                "SAE for Tourism (e.g., Mandatory for Brazilian Nationals)",
                "SAE for Business",
                "SAE for Transit",
                "SAE (Sistema de Autorización Electrónica)"
            ],
            aspectRatio: 1,
            physical: {
                widthMm: 0,
                heightMm: 0,
                targetDpi: 0,
                paperFinish: "any",
                copiesRequired: 0,
                printSheetSize: "A4",
                backSideRequired: false
            },
            background: {
                requiredHex: "#FFFFFF",
                label: "N/A"
            },
            biometrics: {
                headRatioMin: 0,
                headRatioMax: 0,
                shouldersVisible: false,
                glassesAllowed: false,
                smileAllowed: false,
                contrastWarning: false
            },
            sourceVerification: {
                authority: "Instituto Nacional de Migración (INM)",
                officialUrl: "https://www.inm.gob.mx/sae/publico/solicitud.html",
                lastVerifiedDate: "2026-09",
                disclaimer: "Prepared according to official government visa photo guidelines. Final acceptance rests with the reviewing embassy or consular authority."
            },
            seo: {
                metaTitle: "Mexico SAE (Sistema de Autorización Electrónica) Requirements",
                metaDescription: "The official Mexico Sistema de Autorización Electrónica (SAE) via INM is a purely text-based digital application and does not require photo uploads.",
                keywords: [
                    "Mexico SAE photo requirements",
                    "Mexico Sistema de Autorización Electrónica",
                    "INM SAE photo upload"
                ]
            }
        }
    ]
};