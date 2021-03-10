'use strict';

import { dsMusicArtist } from '../data';

export default class MusicService {
  public async getArtists(): Promise<Array<Record<string, any>>> {
    const fields: Array<string> = ['name'];
    const artists: Array<Record<string, any>> = await dsMusicArtist.find({}, fields);
    return artists;
  }
}
