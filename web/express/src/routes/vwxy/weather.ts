'use strict';

import { IRoute } from '../../models/interfaces';

const prefix: string = 'weather';

const weather: Array<IRoute> = [
  {
    public: true,
    tags: ['Weather'],
    summary: 'Get Weather',
    description: '',
    method: 'GET',
    path: `${prefix}`,
    middlewares: [],
    request: {
      query: [{ name: 'city', description: '', type: 'string', required: true }],
      body: []
    },
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            coord: {
              type: 'object',
              properties: {
                lon: { type: 'number' },
                lat: { type: 'number' }
              }
            },
            weather: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'number' },
                  main: { type: 'string' },
                  description: { type: 'string' },
                  icon: { type: 'string' }
                }
              }
            },
            base: { type: 'string' },
            main: {
              type: 'object',
              properties: {
                temp: { type: 'number' },
                feels_like: { type: 'number' },
                temp_min: { type: 'number' },
                temp_max: { type: 'number' },
                pressure: { type: 'number' },
                humidity: { type: 'number' }
              }
            },
            visibility: { type: 'number' },
            wind: {
              type: 'object',
              properties: {
                speed: { type: 'number' },
                deg: { type: 'number' }
              }
            },
            clouds: {
              type: 'object',
              properties: {
                all: { type: 'number' }
              }
            },
            dt: { type: 'number' },
            sys: {
              type: 'object',
              properties: {
                type: { type: 'number' },
                id: { type: 'number' },
                country: { type: 'string' },
                sunrise: { type: 'number' },
                sunset: { type: 'number' }
              }
            },
            timezone: { type: 'number' },
            id: { type: 'number' },
            name: { type: 'string' },
            cod: { type: 'number' }
          }
        }
      },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: true,
    tags: ['Weather'],
    summary: 'Get Weather Forecast',
    description: '',
    method: 'GET',
    path: `${prefix}/forecast`,
    middlewares: [],
    request: {
      query: [{ name: 'city', description: '', type: 'string', required: true }],
      body: []
    },
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            cod: { type: 'string' },
            message: { type: 'number' },
            cnt: { type: 'number' },
            list: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  dt: { type: 'string' },
                  main: {
                    type: 'object',
                    properties: {
                      temp: { type: 'number' },
                      feels_like: { type: 'number' },
                      temp_min: { type: 'number' },
                      temp_max: { type: 'number' },
                      pressure: { type: 'number' },
                      sea_level: { type: 'number' },
                      grnd_level: { type: 'number' },
                      humidity: { type: 'number' },
                      temp_kf: { type: 'number' }
                    }
                  },
                  weather: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: { type: 'number' },
                        main: { type: 'string' },
                        description: { type: 'string' },
                        icon: { type: 'string' }
                      }
                    }
                  },
                  clouds: { type: 'object', properties: { all: { type: 'number' } } },
                  wind: {
                    type: 'object',
                    properties: { speed: { type: 'number' }, deg: { type: 'number' } }
                  },
                  visibility: { type: 'number' },
                  pop: { type: 'number' },
                  sys: { type: 'object', properties: { pod: { type: 'string' } } },
                  dt_txt: { type: 'string' }
                }
              }
            },
            city: {
              type: 'object',
              properties: {
                id: { type: 'number' },
                name: { type: 'string' },
                coord: {
                  type: 'object',
                  properties: {
                    lat: { type: 'number' },
                    lon: { type: 'number' }
                  }
                },
                country: { type: 'string' },
                population: { type: 'number' },
                timezone: { type: 'number' },
                sunrise: { type: 'number' },
                sunset: { type: 'number' }
              }
            }
          }
        }
      },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: true,
    tags: ['Weather'],
    summary: 'Get Air Visual',
    description: '',
    method: 'GET',
    path: `${prefix}/air-visual`,
    middlewares: [],
    request: {
      query: [{ name: 'city', description: '', type: 'string', required: true }],
      body: []
    },
    responses: {
      200: {
        description: '',
        schema: {
          type: 'object',
          properties: {
            city: { type: 'string' },
            state: { type: 'string' },
            country: { type: 'string' },
            location: {
              type: 'object',
              properties: {
                type: { type: 'string' },
                coordinates: { type: 'array', items: { type: 'number' } }
              }
            },
            current: {
              type: 'object',
              properties: {
                weather: {
                  type: 'object',
                  properties: {
                    ts: { type: 'string' },
                    tp: { type: 'number' },
                    pr: { type: 'number' },
                    hu: { type: 'number' },
                    ws: { type: 'number' },
                    wd: { type: 'number' },
                    ic: { type: 'string' }
                  }
                },
                pollution: {
                  type: 'object',
                  properties: {
                    ts: { type: 'string' },
                    aqius: { type: 'number' },
                    mainus: { type: 'string' },
                    aqicn: { type: 'number' },
                    maincn: { type: 'string' }
                  }
                }
              }
            }
          }
        }
      },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  },
  {
    public: true,
    tags: ['Weather'],
    summary: 'Get Cities',
    description: '',
    method: 'GET',
    path: `${prefix}/air-visual/cities`,
    middlewares: [],
    request: {
      query: [],
      body: []
    },
    responses: {
      200: {
        description: '',
        schema: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              city: { type: 'string' },
              state: { type: 'string' },
              country: { type: 'string' }
            }
          }
        }
      },
      400: {
        description: '',
        schema: { type: 'object', properties: { message: { type: 'string' } } }
      }
    }
  }
];

export default weather;
