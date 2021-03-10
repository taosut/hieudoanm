'use strict';

export const AdministrativeDivisionsDistrict = {
  id: { type: 'int', primary: true, required: true },
  name: { type: 'text', required: true },
  level: { type: 'text', required: true },
  level_en: { type: 'text', required: true },
  province: { type: 'text', required: true },
  province_id: { type: 'text', required: true }
};
