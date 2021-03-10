'use strict';

import mongoose from 'mongoose';

import { mongooseClient } from '../../libs';

export interface IFinanceStockHistoryData {
  symbol: string;
  timestamp: number;
  year: number;
  month: number;
  date: number;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

export const FinanceStockHistoryData: mongoose.model = mongooseClient.modelize(
  'FinanceStockHistoryData',
  {
    symbol: { type: String, default: '', required: true },
    timestamp: { type: Number, default: 0, required: true },
    year: { type: Number, default: 0, required: true },
    month: { type: Number, default: 0, required: true },
    date: { type: Number, default: 0, required: true },
    close: { type: Number, default: 0, required: true },
    open: { type: Number, default: 0, required: true },
    high: { type: Number, default: 0, required: true },
    low: { type: Number, default: 0, required: true },
    volume: { type: Number, default: 0, required: true }
  }
);
