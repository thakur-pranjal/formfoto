// 🚀 AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
import { CountryVisaConfig, VisaPassportConfig } from './types';

import { australiaVisaConfig } from './australia-visa';
import { canadaVisaConfig } from './canada-visa';
import { indiaVisaConfig } from './india-visa';
import { japanVisaConfig } from './japan-visa';
import { newZealandVisaConfig } from './new-zealand-visa';
import { saudiArabiaVisaConfig } from './saudi-arabia-visa';
import { schengenVisaConfig } from './schengen-visa';
import { singaporeVisaConfig } from './singapore-visa';
import { southKoreaVisaConfig } from './south-korea-visa';
import { uaeVisaConfig } from './uae-visa';
import { ukVisaConfig } from './uk-visa';
import { usVisaConfig } from './us-visa';

// Master array of all destination countries
export const visaCountries: CountryVisaConfig[] = [
  australiaVisaConfig,
  canadaVisaConfig,
  indiaVisaConfig,
  japanVisaConfig,
  newZealandVisaConfig,
  saudiArabiaVisaConfig,
  schengenVisaConfig,
  singaporeVisaConfig,
  southKoreaVisaConfig,
  uaeVisaConfig,
  ukVisaConfig,
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
