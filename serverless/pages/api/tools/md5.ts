import _ from 'lodash';
import md5 from 'md5';

export default async (req, res) => {
  const method: string = _.get(req, 'method', 'GET');
  if (method === 'POST') {
    const hash = post(req);
    return res.status(200).json({ hash });
  }
  return res.status(404);
};

const post = (req): string => {
  const message: string = _.get(req, 'body.message', '');
  const hash: string = md5(message);
  return hash;
};
