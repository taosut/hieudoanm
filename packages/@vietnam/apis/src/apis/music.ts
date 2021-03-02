'use strict';

import Base from './base';

import { IMusicArtist } from '../constants';

export default class Music extends Base {
  public async getArtists(): Promise<Array<IMusicArtist>> {
    const endpoint: string = `music/artists`;
    return await this.get(endpoint);
  }
}
