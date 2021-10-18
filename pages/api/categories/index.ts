import { NextApiRequest, NextApiResponse } from 'next';
import api from '../models/categories';

export default async function categoryApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const result = await api.list();

  const [data, error] = result;

  if (data) {
    res.status(200).json(data);
  } else {
    console.log("CATEGORY ERROR: ", req.method, error);
    res.status(404).json({ message: 'Category tidak ditemukan.' });
  }

}