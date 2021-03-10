'use strict';

import mongoose from 'mongoose';

import { mongooseClient } from '../../libs';

export interface IXContact {
  fromId: string;
  toId: string;
  status: string | 'pending' | 'active';
  timestamp: number;
}

export const XContact: mongoose.model = mongooseClient.modelize('XContact', {
  fromId: { type: String, default: '' },
  toId: { type: String, default: '' },
  status: { type: String, default: '', enum: ['active', 'pending'], lowercase: true, trim: true },
  timestamp: { type: Number, default: Date.now }
});
