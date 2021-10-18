import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../models/products';

export default async function userApi(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { userId, subCategoryId } = req.query;
  const result = await api.list(+userId, +subCategoryId);
  const [data, error] = result;

  if (data) {
    //console.log(data)
    res.status(200).json(data);
  } else {
    console.log("PRODUCT ERROR: ", req.method, error);
    res.status(404).json({ message: 'PRODUCT was empty.' });
  }

}