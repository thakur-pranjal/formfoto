// 🚀 AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
import { CountryVisaConfig, VisaPassportConfig } from './types';

import { indiaVisaConfig } from './india-visa';
import { schengenVisaConfig } from './schengen-visa';
import { usVisaConfig } from './us-visa';

// Master array of all destination countries
export const visaCountries: CountryVisaConfig[] = [
  indiaVisaConfig,
  schengenVisaConfig,
  usVisaConfig
];

// Flattened array of every individual profile across all countries (backward-compatible)
export const visaStandards: VisaPassportConfig[] = visaCountries.flatMap((c) => c.profiles);

// Lookup a CountryVisaConfig by its id (e.g. "us-visa")
export const getVisaCountryById = (slug: string): CountryVisaConfig | undefined =>
  visaCountries.find((c) => c.id.toLowerCase() === slug.toLowerCase());

// Lookup an individual VisaPassportConfig by its id (e.g. "us-consular-ds160")
export const getVisaConfigById = (slug: string): VisaPassportConfig | undefined =>
  visaStandards.find((item) => item.id.toLowerCase() === slug.toLowerCase());

export * from './types';
