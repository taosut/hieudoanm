'use strict';

import { statuses } from '../libs';

export default class StatusService {
  public async getStatuses(): Promise<Record<string, any>> {
    const heroku = await statuses.getHerokuStatus();
    return { heroku };
  }
}
