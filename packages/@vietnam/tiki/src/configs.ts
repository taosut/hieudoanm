'use strict';

export default {
  trackingStates: [
    {
      state: 'queuing',
      description: 'request is in queue, waiting for processing'
    },
    {
      state: 'processing',
      description: 'request is transforming to tiki format'
    },
    {
      state: 'drafted',
      description: 'TIKI product request created, ready to review'
    },
    {
      state: 'bot_awaiting_approve',
      description: 'TIKI reviewing request by bot'
    },
    {
      state: 'md_awaiting_approve',
      description: 'TIKI reviewing required document (by category)'
    },
    {
      state: 'awaiting_approve',
      description: 'request waiting for approving, we need to take a look'
    },
    {
      state: 'approved',
      description: 'request is approved, product created successfully'
    },
    {
      state: 'rejected',
      description: 'request is rejected, use tracking API for more information'
    },
    {
      state: 'deleted',
      description: 'request is deleted, no more available in system'
    }
  ],
  orderStatuses: [
    'queueing',
    'seller_confirmed',
    'seller_canceled',
    'complete',
    'successful_delivery',
    'all'
  ],
  webhookSupportedEvents: [
    'product:request:approved',
    'product:request:rejected',
    'product:request:locked'
  ]
};
