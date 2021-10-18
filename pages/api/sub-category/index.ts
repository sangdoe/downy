import { NextApiRequest, NextApiResponse } from 'next';
import api from '../models/sub-categories';

export default async function userApi(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const result = await api.list();
  const [data, error] = result;

  if (data) {
    res.status(200).json(data);
  } else {
    console.log("SUB CATEGORY ERROR: ", req.method, error);
    res.status(404).json({ message: 'Sub Category was empty.' });
  }

}