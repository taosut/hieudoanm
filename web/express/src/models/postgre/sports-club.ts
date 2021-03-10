'use strict';

export const SportsClub = {
  id: { type: 'int', primary: true, required: true },
  sport: { type: 'text', required: true },
  sport_en: { type: 'text', required: true },
  competition: { type: 'text', required: true },
  city: { type: 'text', required: true },
  name: { type: 'text', required: true }
};
