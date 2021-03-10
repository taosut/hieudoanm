'use strict';

import mongoose from 'mongoose';

import { mongooseClient } from '../../libs';

export interface IAdministrativeDivisionsWard {
  province: string;
  district: string;
  ward: string;
}

export const AdministrativeDivisionsWard: mongoose.model = mongooseClient.modelize('MapsWard', {
  province: { type: String, default: '', required: true },
  district: { type: String, default: '', required: true },
  ward: { type: String, default: '', required: true }
});
