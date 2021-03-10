import { devTo } from '../../../libs';

export default async (req, res) => {
  const tags = await devTo.getTags();
  return res.json(tags);
};
