import _ from 'lodash';

import { usaCongress } from '../../../../libs';

export default async (req, res) => {
  const chamber: string = _.get(req, 'query.chamber', 'house');
  const congress: number = parseInt(_.get(req, 'query.congress', '117'), 10);
  const members: Array<Record<string, any>> = await usaCongress.getMembers(congress, chamber);
  return res.status(200).json(members);
};
