import _ from 'lodash';

import { usaCongress } from '../../../../libs';

export default async (req, res) => {
  const chamber: string = _.get(req, 'query.chamber', 'house');
  const congress: number = parseInt(_.get(req, 'query.congress', '116'), 10);
  const committees: Array<Record<string, any>> = await usaCongress.getCommittees(congress, chamber);
  return res.status(200).json(committees);
};
