import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../models/users';

export default async function userApi(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { id } = req.query
  const result = await api.getProfile(+id);
  const [data, error] = result;

  if (data) {
    res.status(200).json(data);
  } else {
    console.log("USER PROFILE ERROR: ", req.method, error);
    res.status(404).json({ message: 'User was empty.' });
  }

}