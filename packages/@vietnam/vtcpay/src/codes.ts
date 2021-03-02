'use strict';

export default [
  {
    code: 0,
    mean: '',
    message: 'Transaction status of initializing'
  },
  {
    code: 1,
    mean: 'SUCCESS',
    message: 'Successful transaction'
  },
  {
    code: 7,
    mean: 'REVIEW',
    message:
      'Payment account of customer is deducted but Merchant’s account is not credited.Payment admin department of VTC will approve to decide transaction is successful or failed.'
  },
  {
    code: -1,
    mean: 'FAIL',
    message: 'Failed transaction'
  },
  {
    code: -9,
    mean: 'FAIL',
    message: 'Customer cancel transaction'
  },
  {
    code: -3,
    mean: 'FAIL',
    message: 'VTC admin cancel transaction'
  },
  {
    code: -4,
    mean: 'FAIL',
    message: 'Account not eligible for transaction(Locked, not registered for online payment ...)'
  },
  {
    code: -5,
    mean: 'FAIL',
    message:
      'Customer account balance(VTC Pay ewallet, bank account) is not sufficient to make payment'
  },
  {
    code: -6,
    mean: 'FAIL',
    message: 'Transaction error at VTC'
  },
  {
    code: -7,
    mean: 'FAIL',
    message: 'Customer enter wrong payment information(account information or OTP)'
  },
  {
    code: -8,
    mean: 'FAIL',
    message: 'Exceed day transaction limit'
  },
  {
    code: -22,
    mean: 'FAIL',
    message: 'Order payment value is too small'
  },
  {
    code: -24,
    mean: 'FAIL',
    message: 'Order payment currency is not valid'
  },
  {
    code: -25,
    mean: 'FAIL',
    message: 'Merchant’s VTC Pay receiving account does not exist'
  },
  {
    code: -28,
    mean: 'FAIL',
    message: 'Lack of compulsory parameters in one online payment order'
  },
  {
    code: -29,
    mean: 'FAIL',
    message: 'Request parameter is not valid'
  },
  {
    code: -21,
    mean: 'CHECK',
    message:
      'Duplicating transaction reference. May be because of duplicating solving is not good, poor internet connection, customer enter F5, or poor transaction code generating, partner must check to get the final result of this transaction'
  },
  {
    code: -23,
    mean: 'CHECK',
    message: 'WebsiteID does not exist'
  },
  {
    code: -99,
    mean: 'CHECK',
    message:
      'Undefined errors and transaction status.Must check to know if transaction is successful or not'
  }
];
