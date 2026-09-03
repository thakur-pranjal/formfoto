// 🚀 AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
import { VisaPassportConfig } from './types';


export const visaStandards: VisaPassportConfig[] = [];

export const getVisaConfigById = (slug: string): VisaPassportConfig | undefined =>
  visaStandards.find((item) => item.id.toLowerCase() === slug.toLowerCase());

export * from './types';
