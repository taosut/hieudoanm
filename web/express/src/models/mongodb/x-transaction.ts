'use strict';

import mongoose from 'mongoose';

import { mongooseClient } from '../../libs';

export interface IXTransaction {
  fromId: string;
  toId: string;
  status: string;
  amount: number;
  description: string;
  year: number;
  month: number;
  date: number;
  hour: number;
  minute: number;
  timestamp: number;
}

export const XTransaction: mongoose.model = mongooseClient.modelize('XTransaction', {
  fromId: { type: String, default: '' },
  toId: { type: String, default: '' },
  status: { type: String, default: '', lowercase: true, trim: true },
  amount: { type: Number, default: 0 },
  description: { type: String, default: '' },
  year: { type: Number, default: 0 },
  month: { type: Number, default: 0 },
  date: { type: Number, default: 0 },
  hour: { type: Number, default: 0 },
  minute: { type: Number, default: 0 },
  timestamp: { type: Number, default: Date.now }
});
