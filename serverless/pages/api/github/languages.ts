import { gitHub } from '../../../libs';

export default async (req, res) => {
  const languages = await gitHub.getLanguages();
  return res.json(languages);
};
