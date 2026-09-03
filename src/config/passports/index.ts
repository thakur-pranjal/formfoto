// 🚀 AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
import { VisaPassportConfig } from '../visas/types';


export const passportStandards: VisaPassportConfig[] = [];

export const getPassportConfigById = (slug: string): VisaPassportConfig | undefined =>
  passportStandards.find((item) => item.id.toLowerCase() === slug.toLowerCase());
