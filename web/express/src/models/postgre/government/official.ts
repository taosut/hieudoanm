'use strict';

export const GovernmentOfficial = {
  id: { type: 'int', primary: true, required: true },
  ranking: { type: 'int', required: true },
  title: { type: 'text', required: true },
  title_en: { type: 'text', required: true },
  title_short: { type: 'text', required: true },
  name: { type: 'text', required: true },
  gender: { type: 'text', required: true },
  gender_en: { type: 'text', required: true },
  start_date: { type: 'text', required: true },
  end_date: { type: 'text', required: true },
  note: { type: 'text' }
};
