'use strict';

import mongoose from 'mongoose';

import { mongooseClient } from '../../libs';

export interface IFinanceStockListedCompany {
  id: string;
  symbol: string;
  name: string;
  market: string;
  group: string;
  industry: string;
  supersector: string;
  sector: string;
  subsector: string;
  listingDate: string;
  ceiling: number;
  floor: number;
  watching: boolean;
  lastSyncedAt: number;
}

export const FinanceStockListedCompany: mongoose.model = mongooseClient.modelize(
  'FinanceStockListedCompany',
  {
    id: { type: String, default: '', required: true, unique: true, index: true },
    symbol: { type: String, default: '', required: true },
    name: { type: String, default: '', required: true },
    market: { type: String, default: '', required: true },
    group: { type: String, default: '', required: true },
    industry: { type: String, default: '' },
    supersector: { type: String, default: '' },
    sector: { type: String, default: '' },
    subsector: { type: String, default: '' },
    listingDate: { type: String, default: '' },
    ceiling: { type: Number, default: 0 },
    floor: { type: Number, default: 0 },
    watching: { type: Boolean, default: false },
    lastSyncedAt: { type: Number, default: 0 }
  }
);
