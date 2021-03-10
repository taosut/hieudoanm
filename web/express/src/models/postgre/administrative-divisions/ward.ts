'use strict';

export const AdministrativeDivisionsWard = {
  id: { type: 'int', primary: true, required: true },
  name: { type: 'text', required: true },
  level: { type: 'text', required: true },
  level_en: { type: 'text', required: true },
  district: { type: 'text', required: true },
  district_id: { type: 'text', required: true },
  province: { type: 'text', required: true },
  province_id: { type: 'text', required: true }
};
