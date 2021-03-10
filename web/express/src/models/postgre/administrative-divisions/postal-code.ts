'use strict';

export const AdministrativeDivisionsPostalCode = {
  id: { type: 'int', primary: true, required: true },
  code: { type: 'text', required: true },
  province: { type: 'text', required: true },
  province_id: { type: 'text', required: true }
};
