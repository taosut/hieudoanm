'use strict';

export const AdministrativeDivisionsProvince = {
  id: { type: 'int', primary: true, required: true },
  province_id: { type: 'text', required: true },
  name: { type: 'text', required: true },
  capital: { type: 'text', required: true },
  level: { type: 'text', required: true },
  level_en: { type: 'text', required: true },
  macro_region: { type: 'text', required: true },
  macro_region_en: { type: 'text', required: true },
  region: { type: 'text', required: true },
  region_en: { type: 'text', required: true }
};
