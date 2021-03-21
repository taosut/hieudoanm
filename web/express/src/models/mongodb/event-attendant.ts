'use strict';

import mongoose from 'mongoose';

import { mongooseClient } from '../../libs';

export interface IEventAttendant {
  id: string;
  province: string;
  district: string;
  organization: string;
}

export const EventAttendant: mongoose.model = mongooseClient.modelize('EventAttendant', {
  id: { type: String, default: '', required: true },
  name: { type: String, default: '', required: true },
  email: { type: String, default: '', required: true },
  organization: { type: String, default: '', required: true }
});
