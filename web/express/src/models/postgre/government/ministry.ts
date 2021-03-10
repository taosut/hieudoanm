'use strict';

export const GovernmentMinistry = {
  id: { type: 'int', primary: true, required: true },
  short: { type: 'text', required: true },
  name: { type: 'text', required: true },
  name_en: { type: 'text', required: true },
  level: { type: 'text', required: true },
  level_en: { type: 'text', required: true }
};
