'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'x';

const xAuth: Array<IRoute> = [
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Sign In',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [
        { name: 'username', description: '', type: 'string', required: true },
        { name: 'password', description: '', type: 'string', required: true }
      ]
    },
    path: `${prefix}/auth/sign-in`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Sign Up',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [
        { name: 'phoneNumber', description: '', type: 'string', required: true },
        { name: 'username', description: '', type: 'string', required: true },
        { name: 'password', description: '', type: 'string', required: true }
      ]
    },
    path: `${prefix}/auth/sign-up`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Forget Password',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [{ name: 'email', description: '', type: 'string', required: true }]
    },
    path: `${prefix}/auth/password/forget`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Change Password',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [
        { name: 'token', description: '', type: 'string', required: true },
        { name: 'password', description: '', type: 'string', required: true }
      ]
    },
    path: `${prefix}/auth/password/change`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Get Google URL',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/auth/google`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Authorize Google Account',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/auth/google`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Get Facebook URL',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/auth/facebook`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Authorize Facebook Account',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/auth/facebook`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }
];

const xAddresses: Array<IRoute> = [
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Add Address',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [
        { name: 'street', description: '', type: 'string', required: true },
        { name: 'district', description: '', type: 'string', required: true },
        { name: 'province', description: '', type: 'string', required: true },
        { name: 'postalCode', description: '', type: 'string', required: true }
      ]
    },
    path: `${prefix}/settings/addresses`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Delete Address',
    description: '',
    method: 'DELETE',
    request: {
      query: [{ name: 'id', description: '', type: 'string', required: true }],
      body: []
    },
    path: `${prefix}/settings/addresses`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }
];

const xBanks: Array<IRoute> = [
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Add Bank',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [
        { name: 'code', description: '', type: 'string', required: true },
        { name: 'name', description: '', type: 'string', required: true },
        { name: 'number', description: '', type: 'number', required: true }
      ]
    },
    path: `${prefix}/settings/banks`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Delete Bank',
    description: '',
    method: 'DELETE',
    request: {
      query: [{ name: 'code', description: '', type: 'string', required: true }],
      body: []
    },
    path: `${prefix}/settings/banks`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }
];

const xContacts: Array<IRoute> = [
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Get Contacts',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/contacts`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Add Contact',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/contacts`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Delete Contact',
    description: '',
    method: 'DELETE',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/contacts`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Confirm Contact',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/contacts/confirm`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }
];

const xEmails: Array<IRoute> = [
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Add Email',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [{ name: 'email', description: '', type: 'string', required: true }]
    },
    path: `${prefix}/settings/emails`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Delete Email',
    description: '',
    method: 'DELETE',
    request: {
      query: [{ name: 'email', description: '', type: 'string', required: true }],
      body: []
    },
    path: `${prefix}/settings/emails`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Update Primary Email',
    description: '',
    method: 'PATCH',
    request: {
      query: [],
      body: [{ name: 'email', description: '', type: 'string', required: true }]
    },
    path: `${prefix}/settings/emails/primary`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }
];

const xPhoneNumbers: Array<IRoute> = [
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Add Phone Number',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [{ name: 'phoneNumber', description: '', type: 'string', required: true }]
    },
    path: `${prefix}/settings/phone-numbers`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Delete Phone Number',
    description: '',
    method: 'DELETE',
    request: {
      query: [{ name: 'phoneNumber', description: '', type: 'string', required: true }],
      body: []
    },
    path: `${prefix}/settings/phone-numbers`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Update Primary Phone Number',
    description: '',
    method: 'PATCH',
    request: {
      query: [{ name: 'phoneNumber', description: '', type: 'string', required: true }],
      body: []
    },
    path: `${prefix}/settings/phone-numbers/primary`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }
];

const xProfile: Array<IRoute> = [
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Get Profile',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/settings/profile`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Update Profile',
    description: '',
    method: 'PATCH',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/settings/profile`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Delete Profile',
    description: '',
    method: 'DELETE',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/settings/profile`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }
];

const xApps: Array<IRoute> = [
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Get Balance',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/apps/balance`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Get Profile',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/apps/me`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Get Notifications',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/apps/notifications`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Get Transactions',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/apps/transactions`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Search User',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/apps/search`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Top Up',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [{ name: 'amount', description: '', type: 'number', required: true }]
    },
    path: `${prefix}/apps/top-up`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Pay',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/apps/pay`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Send Request',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/apps/request/send`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Confirm Request',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/apps/request/confirm`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: false,
    tags: ['X Bank'],
    summary: 'Withdraw',
    description: '',
    method: 'POST',
    request: {
      query: [],
      body: [{ name: 'amount', description: '', type: 'number', required: true }]
    },
    path: `${prefix}/apps/withdraw`,
    middlewares: ['authentication/x-user'],
    responses: {
      200: { description: '', schema: {} },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }
];

const x: Array<IRoute> = [].concat(
  xAuth,
  xAddresses,
  xBanks,
  xContacts,
  xEmails,
  xPhoneNumbers,
  xProfile,
  xApps
);

export default x;
