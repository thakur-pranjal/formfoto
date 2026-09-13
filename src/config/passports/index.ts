// 🚀 AUTO-GENERATED FILE — DO NOT EDIT MANUALLY
import { VisaPassportConfig } from '../visas/types';

import { australiaPassportConfig } from './australia-passport';
import { brazilPassportConfig } from './brazil-passport';
import { canadaPassportConfig } from './canada-passport';
import { chinaPassportConfig } from './china-passport';
import { francePassportConfig } from './france-passport';
import { germanyPassportConfig } from './germany-passport';
import { indiaPassportConfig } from './india-passport';
import { irelandPassportConfig } from './ireland-passport';
import { italyPassportConfig } from './italy-passport';
import { japanPassportConfig } from './japan-passport';
import { malaysiaPassportConfig } from './malaysia-passport';
import { netherlandsPassportConfig } from './netherlands-passport';
import { newzealandPassportConfig } from './newzealand-passport';
import { portugalPassportConfig } from './portugal-passport';
import { qatarPassportConfig } from './qatar-passport';
import { saudiArabiaPassportConfig } from './saudi-arabia-passport';
import { singaporePassportConfig } from './singapore-passport';
import { southAfricaPassportConfig } from './south-africa-passport';
import { southKoreaPassportConfig } from './south-korea-passport';
import { spainPassportConfig } from './spain-passport';
import { switzerlandPassportConfig } from './switzerland-passport';
import { thailandPassportConfig } from './thailand-passport';
import { uaePassportConfig } from './uae-passport';
import { ukPassportConfig } from './uk-passport';
import { usPassportConfig } from './us-passport';

export const passportStandards: VisaPassportConfig[] = [
  australiaPassportConfig,
  brazilPassportConfig,
  canadaPassportConfig,
  chinaPassportConfig,
  francePassportConfig,
  germanyPassportConfig,
  indiaPassportConfig,
  irelandPassportConfig,
  italyPassportConfig,
  japanPassportConfig,
  malaysiaPassportConfig,
  netherlandsPassportConfig,
  newzealandPassportConfig,
  portugalPassportConfig,
  qatarPassportConfig,
  saudiArabiaPassportConfig,
  singaporePassportConfig,
  southAfricaPassportConfig,
  southKoreaPassportConfig,
  spainPassportConfig,
  switzerlandPassportConfig,
  thailandPassportConfig,
  uaePassportConfig,
  ukPassportConfig,
  usPassportConfig
];

export const getPassportConfigById = (slug: string): VisaPassportConfig | undefined =>
  passportStandards.find((item) => item.id.toLowerCase() === slug.toLowerCase());
