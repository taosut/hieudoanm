import _ from 'lodash';

export default async (req, res) => {
  const method: string = _.get(req, 'method', 'GET');
  if (method === 'POST') {
    const body: Record<string, any> = _.get(req, 'body', {});
    console.log(body);
    return res.status(200).json({ status: 'OK' });
  }
  return res.status(404);
};
