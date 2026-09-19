// 🚀 AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
import { VisaPassportConfig } from '../visas/types';

import { australiaPassportConfig } from './australia-passport';
import { austriaPassportConfig } from './austria-passport';
import { bangladeshPassportConfig } from './bangladesh-passport';
import { brazilPassportConfig } from './brazil-passport';
import { canadaPassportConfig } from './canada-passport';
import { chinaPassportConfig } from './china-passport';
import { denmarkPassportConfig } from './denmark-passport';
import { finlandPassportConfig } from './finland-passport';
import { francePassportConfig } from './france-passport';
import { germanyPassportConfig } from './germany-passport';
import { indiaPassportConfig } from './india-passport';
import { indonesiaPassportConfig } from './indonesia-passport';
import { irelandPassportConfig } from './ireland-passport';
import { israelPassportConfig } from './israel-passport';
import { italyPassportConfig } from './italy-passport';
import { japanPassportConfig } from './japan-passport';
import { malaysiaPassportConfig } from './malaysia-passport';
import { mexicoPassportConfig } from './mexico-passport';
import { nepalPassportConfig } from './nepal-passport';
import { netherlandsPassportConfig } from './netherlands-passport';
import { newzealandPassportConfig } from './newzealand-passport';
import { norwayPassportConfig } from './norway-passport';
import { pakistanPassportConfig } from './pakistan-passport';
import { philippinesPassportConfig } from './philippines-passport';
import { portugalPassportConfig } from './portugal-passport';
import { qatarPassportConfig } from './qatar-passport';
import { russiaPassportConfig } from './russia-passport';
import { saudiArabiaPassportConfig } from './saudi-arabia-passport';
import { singaporePassportConfig } from './singapore-passport';
import { southAfricaPassportConfig } from './south-africa-passport';
import { southKoreaPassportConfig } from './south-korea-passport';
import { spainPassportConfig } from './spain-passport';
import { sriLankaPassportConfig } from './sri-lanka-passport';
import { swedenPassportConfig } from './sweden-passport';
import { switzerlandPassportConfig } from './switzerland-passport';
import { thailandPassportConfig } from './thailand-passport';
import { turkiyePassportConfig } from './turkiye-passport';
import { uaePassportConfig } from './uae-passport';
import { ukPassportConfig } from './uk-passport';
import { usPassportConfig } from './us-passport';

export const passportStandards: VisaPassportConfig[] = [
  australiaPassportConfig,
  austriaPassportConfig,
  bangladeshPassportConfig,
  brazilPassportConfig,
  canadaPassportConfig,
  chinaPassportConfig,
  denmarkPassportConfig,
  finlandPassportConfig,
  francePassportConfig,
  germanyPassportConfig,
  indiaPassportConfig,
  indonesiaPassportConfig,
  irelandPassportConfig,
  israelPassportConfig,
  italyPassportConfig,
  japanPassportConfig,
  malaysiaPassportConfig,
  mexicoPassportConfig,
  nepalPassportConfig,
  netherlandsPassportConfig,
  newzealandPassportConfig,
  norwayPassportConfig,
  pakistanPassportConfig,
  philippinesPassportConfig,
  portugalPassportConfig,
  qatarPassportConfig,
  russiaPassportConfig,
  saudiArabiaPassportConfig,
  singaporePassportConfig,
  southAfricaPassportConfig,
  southKoreaPassportConfig,
  spainPassportConfig,
  sriLankaPassportConfig,
  swedenPassportConfig,
  switzerlandPassportConfig,
  thailandPassportConfig,
  turkiyePassportConfig,
  uaePassportConfig,
  ukPassportConfig,
  usPassportConfig
];

export const getPassportConfigById = (slug: string): VisaPassportConfig | undefined =>
  passportStandards.find((item) => item.id.toLowerCase() === slug.toLowerCase());
