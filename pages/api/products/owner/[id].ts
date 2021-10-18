import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../models/products';

export default async function userApi(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { id } = req.query;
  const result = await api.listByOwner(+id);
  const [data, error] = result;

  if (data) {
    //console.log(data)
    res.status(200).json(data);
  } else {
    console.log("PRODUCT BY OWNER ERROR: ", req.method, error);
    res.status(404).json({ message: 'PRODUCT was empty.' });
  }

}