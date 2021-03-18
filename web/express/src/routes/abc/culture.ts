'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = `culture`;

const calendar: Array<IRoute> = [
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Solar to Lunar',
    description: '',
    method: `POST`,
    request: {
      query: [],
      body: [
        { name: 'year', description: '', required: true, type: 'number' },
        { name: 'month', description: '', required: true, type: 'number' },
        { name: 'date', description: '', required: true, type: 'number' }
      ]
    },
    path: `${prefix}/calendar/solar2lunar`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            year: { type: 'number' },
            month: { type: 'number' },
            date: { type: 'number' }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Lunar to Solar',
    description: '',
    method: `POST`,
    request: {
      query: [],
      body: [
        { name: 'year', description: '', required: true, type: 'number' },
        { name: 'month', description: '', required: true, type: 'number' },
        { name: 'date', description: '', required: true, type: 'number' }
      ]
    },
    path: `${prefix}/calendar/lunar2solar`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          year: { type: 'number' },
          month: { type: 'number' },
          date: { type: 'number' }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get List of Can',
    description: '',
    method: `GET`,
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/calendar/lunar/can`,
    middlewares: [],
    responses: {
      200: { description: '', schema: { type: 'array', items: { type: 'string' } } },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get List of Chi',
    description: '',
    method: `GET`,
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/calendar/lunar/chi`,
    middlewares: [],
    responses: {
      200: { description: '', schema: { type: 'array', items: { type: 'string' } } },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get Can Chi',
    description: '',
    method: `POST`,
    request: {
      query: [],
      body: [
        { name: 'year', description: '', required: true, type: 'number' },
        { name: 'month', description: '', required: true, type: 'number' },
        { name: 'date', description: '', required: true, type: 'number' }
      ]
    },
    path: `${prefix}/calendar/lunar/can-chi`,
    middlewares: [],
    responses: {
      200: { description: '', schema: { type: 'object', properties: { canChi: 'string' } } },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get Tiet Khi',
    description: '',
    method: `POST`,
    request: {
      query: [],
      body: [
        { name: 'year', description: '', required: true, type: 'number' },
        { name: 'month', description: '', required: true, type: 'number' },
        { name: 'date', description: '', required: true, type: 'number' }
      ]
    },
    path: `${prefix}/calendar/lunar/tiet-khi`,
    middlewares: [],
    responses: {
      200: { description: '', schema: { type: 'object', properties: { tietKhi: 'string' } } },
      400: { description: '', schema: {} }
    }
  }
];

const history: Array<IRoute> = [
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get History',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/history`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get Dynasties',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/history/dynasties`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              temple_name: { type: 'string' },
              birth_name: { type: 'string' },
              birth: { type: 'number' },
              death: { type: 'number' },
              start_year: { type: 'number' },
              end_year: { type: 'number' },
              dynasty: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  }
];

const movies: Array<IRoute> = [
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get Movies',
    description: '',
    method: 'GET',
    request: {
      query: [{ name: 'type', description: '', required: true, type: 'string' }],
      body: []
    },
    path: `${prefix}/movies`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              url: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  }
];

const sports: Array<IRoute> = [
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get Sports',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/sports`,
    middlewares: [],
    responses: {
      200: { description: '', schema: {} },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get Sports Clubs',
    description: '',
    method: 'GET',
    request: {
      query: [{ name: 'sport_en', description: '', type: 'string', required: false }],
      body: []
    },
    path: `${prefix}/sports/clubs`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              sport: { type: 'string' },
              sport_en: { type: 'string' },
              competition: { type: 'string' },
              city: { type: 'string' },
              name: { type: 'string' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get VLeague',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/sports/vleague`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            matches: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  round: { type: 'number' },
                  status: { type: 'string' },
                  dateTime: { type: 'string' },
                  homeTeam: { type: 'string' },
                  awayTeam: { type: 'string' },
                  homeScore: { type: 'number' },
                  awayScore: { type: 'number' },
                  year: { type: 'number' },
                  month: { type: 'number' },
                  date: { type: 'number' },
                  hours: { type: 'number' },
                  minutes: { type: 'number' },
                  seconds: { type: 'number' }
                }
              }
            },
            leagueTable: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  rank: { type: 'number' },
                  name: { type: 'string' },
                  point: { type: 'number' },
                  played: { type: 'number' },
                  win: { type: 'number' },
                  draw: { type: 'number' },
                  lost: { type: 'number' },
                  goal: { type: 'number' },
                  goalAgainst: { type: 'number' },
                  goalDifference: { type: 'number' }
                }
              }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get VLeague Matches',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/sports/vleague/matches`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              round: { type: 'number' },
              status: { type: 'string' },
              dateTime: { type: 'string' },
              homeTeam: { type: 'string' },
              awayTeam: { type: 'string' },
              homeScore: { type: 'number' },
              awayScore: { type: 'number' },
              year: { type: 'number' },
              month: { type: 'number' },
              date: { type: 'number' },
              hours: { type: 'number' },
              minutes: { type: 'number' },
              seconds: { type: 'number' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  },
  {
    public: true,
    tags: ['Culture, Sports and Tourism'],
    summary: 'Get VLeague Table',
    description: '',
    method: 'GET',
    request: {
      query: [],
      body: []
    },
    path: `${prefix}/sports/vleague/table`,
    middlewares: [],
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              rank: { type: 'number' },
              name: { type: 'string' },
              point: { type: 'number' },
              played: { type: 'number' },
              win: { type: 'number' },
              draw: { type: 'number' },
              lost: { type: 'number' },
              goal: { type: 'number' },
              goalAgainst: { type: 'number' },
              goalDifference: { type: 'number' }
            }
          }
        }
      },
      400: { description: '', schema: {} }
    }
  }
];

const culture: Array<IRoute> = [].concat(calendar, history, movies, sports);

export default culture;
