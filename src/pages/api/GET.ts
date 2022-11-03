import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(403).send('Only Support POST');
  const { url } = req.body;
  if (!url) return res.status(403).send("Missing param 'url'");
  const { data } = await axios.get(url);
  return res.send(data);
};

export default GET;
