'use strict';

import mongoose from 'mongoose';

import { mongooseClient } from '../../libs';

export interface IXUser {
  id: string;
  esId: string;
  primaryEmail: string;
  primaryPhoneNumber: string;
  username: string;
  password: string;
  joinInAt: number;
  balance: number;
  name: string;
  emails: Array<string>;
  phoneNumbers: Array<string>;
  banks: Array<IBank>;
  addresses: Array<IAddress>;
  test: boolean;
  changePasswordToken: string;
}

export interface IAddress {
  id: String;
  province: String;
  district: String;
  street: String;
  postalCode: String;
}

export interface IBank {
  code: String;
  name: String;
  number: String;
}

export const Address = {
  id: String,
  province: String,
  district: String,
  street: String,
  postalCode: String
};

export const Bank = {
  code: String,
  name: String,
  number: String
};

export const XUser: mongoose.model = mongooseClient.modelize('XUser', {
  id: { type: String, default: '', required: true, unique: true, index: true },
  esId: { type: String, default: '', required: true, unique: true, index: true },
  primaryEmail: {
    type: String,
    default: '',
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  },
  primaryPhoneNumber: { type: String, default: '', required: true, unique: true, index: true },
  username: {
    type: String,
    default: '',
    required: true,
    unique: true,
    index: true,
    lowercase: true,
    trim: true
  },
  password: { type: String, default: '', required: true },
  joinInAt: { type: Number, default: Date.now, required: true },
  balance: { type: Number, default: 0, required: true },
  name: { type: String, default: '' },
  emails: { type: [String], default: [] },
  phoneNumbers: { type: [String], default: [] },
  banks: { type: [Bank], default: [] },
  addresses: { type: [Address], default: [] },
  test: { type: Boolean, default: false },
  changePasswordToken: { type: String, default: '' }
});
