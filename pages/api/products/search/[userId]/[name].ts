import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../../models/products';

export default async function userApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {userId, name} = req.query;
  const result = await api.search(+userId, name);
  const [data, error] = result;

  if (data) {
    res.status(200).json(data);
  } else {
    console.log("SUB CATEGORY ERROR: ", req.method, error);
    res.status(404).json({ message: 'Sub Category was empty.' });
  }

}