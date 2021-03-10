'use strict';

import mongoose from 'mongoose';

import { mongooseClient } from '../../libs';

export interface IBanksForexRate {
  timestamp: number;
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  bank: string;
  rates: Array<IRate>;
}

export interface IRate {
  code: String;
  buyCash: Number;
  buyTransfer: Number;
  sellCash: Number;
  sellTransfer: Number;
}

export const Rate = {
  code: String,
  buyCash: Number,
  buyTransfer: Number,
  sellCash: Number,
  sellTransfer: Number
};

export const BanksForexRate: mongoose.model = mongooseClient.modelize('FinanceForexRate', {
  timestamp: { type: Number, default: 0, index: true, required: true },
  year: { type: Number, default: 0, index: true, required: true },
  month: { type: Number, default: 0, index: true, required: true },
  date: { type: Number, default: 0, index: true, required: true },
  hour: { type: Number, default: 0, index: true, required: true },
  minute: { type: Number, default: 0, index: true, required: true },
  bank: { type: String, default: '', index: true, required: true },
  rates: { type: [Rate], default: [], required: true }
});
