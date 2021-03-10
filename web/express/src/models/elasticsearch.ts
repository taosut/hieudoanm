'use strict';

interface ElasticSearchCommand {
  method: string;
  path: string;
  body: Record<string, any>;
}

export const UpdateXUserMapping: ElasticSearchCommand = {
  method: 'PUT',
  path: '/x-user',
  body: {
    settings: {},
    mappings: {
      properties: {
        phoneNumber: { type: 'text', index: true },
        username: { type: 'text', index: true },
        email: { type: 'text', index: true },
        test: { type: 'boolean', index: true }
      }
    }
  }
};

export const UpdateFinanceForexRateMapping: ElasticSearchCommand = {
  method: 'PUT',
  path: '/finance-forex-rates',
  body: {
    settings: {},
    mappings: {
      properties: {
        bank: { type: 'text', index: false },
        date: { type: 'date', index: false },
        rates: { type: 'nested' }
      }
    }
  }
};

export const DeleteFinanceForexRates: ElasticSearchCommand = {
  method: 'POST',
  path: '/finance-forex-rates/_delete_by_query',
  body: {
    query: {
      match_all: {}
    }
  }
};
