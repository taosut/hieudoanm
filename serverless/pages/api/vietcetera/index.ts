import { vietcetera } from '../../../libs';

export default async (req, res) => {
  const type: any = req.query.type || 'latest';
  const articles: Array<Record<string, any>> = await vietcetera.getArticles({ type });
  res.status(200).json(articles);
};
