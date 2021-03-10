'use strict';

export const HistoryDynasty = {
  id: { type: 'int', primary: true, required: true },
  temple_name: { type: 'text' },
  birth_name: { type: 'text', required: true },
  birth: { type: 'int', required: true },
  death: { type: 'int', required: true },
  start_year: { type: 'int', required: true },
  end_year: { type: 'int', required: true },
  dynasty: { type: 'text', required: true }
};
