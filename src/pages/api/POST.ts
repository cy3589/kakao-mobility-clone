import axios from 'axios';
import { NextApiRequest, NextApiResponse } from 'next';

const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') return res.status(403).send('Only Support POST');
  const { url, data: postData } = req.body;
  if (!url) return res.status(403).send("Missing param 'url'");
  const { data } = await axios.post(url, postData);
  return res.send(data);
};

export default POST;
