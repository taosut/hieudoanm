import _ from 'lodash';

import { gitHub } from '../../../libs';

export default async (req, res) => {
  const repo: string = _.get(req, 'query.repo', 'vietnamdb/vietnamdb');
  const repository = await gitHub.getRepository(repo);
  return res.json(repository);
};
