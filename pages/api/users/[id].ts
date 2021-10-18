import { NextApiRequest, NextApiResponse } from 'next';
import api from '../models/users';

export default async function userApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;

  switch (req.method) {
    case 'POST': {
      const { user } = req.body;
      result = await api.insert(user);
    }
      break;
    case 'PUT': {
      const id: number = req.query.id ? +req.query.id : 0;
      const { user } = req.body;
      result = await api.update(id, user);
    }
      break;
    case 'DELETE': {
      const id: number = req.query.id ? +req.query.id : 0;
      result = await api.delete(id);
    }
      break;

    case 'GET':
    default: {
      const id: number = req.query.id ? +req.query.id : 0;
      result = await api.get(id);
    }
      break;
  }

  const [data, error] = result;

  if (data) {
    res.status(200).json(data);
  } else {
    console.log("USER ERROR: ", req.method, error);
    res.status(404).json({ message: 'User tidak ditemukan.' });
  }

}