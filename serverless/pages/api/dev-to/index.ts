import { devTo } from '../../../libs';

export default async (req, res) => {
  const articles = await devTo.getArticles();
  return res.status(200).json(articles);
};
