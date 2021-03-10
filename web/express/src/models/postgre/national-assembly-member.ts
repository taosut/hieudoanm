'use strict';

export const NationalAssemblyMember = {
  id: { type: 'int', primary: true, required: true },
  no: { type: 'int', required: true },
  name: { type: 'text', require: true },
  date_of_birth: { type: 'text' },
  gender: { type: 'text' },
  province: { type: 'text' },
  percentage: { type: 'int' },
  district: { type: 'text' },
  city_of_birth: { type: 'text' },
  degree: { type: 'text' },
  active: { type: 'text' }
};
