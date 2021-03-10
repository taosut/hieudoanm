'use strict';

export const Bank = {
  id: { type: 'int', primary: true, required: true },
  code: { type: 'text', required: true },
  name: { type: 'text', required: true },
  name_en: { type: 'text', required: true },
  name_short: { type: 'text', required: true },
  url: { type: 'text', required: true },
  type: { type: 'text', required: true },
  type_en: { type: 'text', required: true }
};
