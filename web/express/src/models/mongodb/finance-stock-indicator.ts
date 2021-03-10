'use strict';

import mongoose from 'mongoose';

import { mongooseClient } from '../../libs';

export interface IFinanceStockIndicator {
  symbol: string;
  key: string;
  value: number;
  quarter: number;
  year: number;
}

export const FinanceStockIndicator: mongoose.model = mongooseClient.modelize(
  'FinanceStockIndicator',
  {
    symbol: { type: String, default: '', required: true },
    key: { type: String, default: '', required: true },
    value: { type: Number, default: 0, required: true },
    quarter: { type: Number, default: 0, required: true },
    year: { type: Number, default: 0, required: true }
  }
);
