import { vietcetera } from '../../../libs';

export default async (req, res) => {
  const language: any = req.query.language || 'VN';
  const topics: Array<Record<string, any>> = await vietcetera.getFavoristTopics(language);
  res.status(200).json(topics);
};
