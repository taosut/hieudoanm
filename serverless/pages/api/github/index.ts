import { gitHub } from '../../../libs';

export default async (req, res) => {
  const status = await gitHub.getStatus();
  return res.json({ status });
};
