// 🚀 AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
import { CountryVisaConfig, VisaPassportConfig } from './types';

import { australiaVisaConfig } from './australia-visa';
import { canadaVisaConfig } from './canada-visa';
import { chinaVisaConfig } from './china-visa';
import { indiaVisaConfig } from './india-visa';
import { irelandVisaConfig } from './ireland-visa';
import { israelVisaConfig } from './israel-visa';
import { japanVisaConfig } from './japan-visa';
import { mexicoVisaConfig } from './mexico-visa';
import { newZealandVisaConfig } from './new-zealand-visa';
import { omanVisaConfig } from './oman-visa';
import { qatarVisaConfig } from './qatar-visa';
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
  chinaVisaConfig,
  indiaVisaConfig,
  irelandVisaConfig,
  israelVisaConfig,
  japanVisaConfig,
  mexicoVisaConfig,
  newZealandVisaConfig,
  omanVisaConfig,
  qatarVisaConfig,
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
