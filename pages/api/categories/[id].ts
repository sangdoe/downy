import { NextApiRequest, NextApiResponse } from 'next';
import api from '../models/categories';

export default async function categoryApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;

  switch (req.method) {
    case 'POST': {
      const category = req.body;
      result = await api.insert(category);
    }
      break;
    case 'PUT': {
      const id: number = req.query.id ? +req.query.id : 0;
      const category = req.body;
      result = await api.update(id, category);
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
    console.log("CATEGORY ERROR: ", req.method, error);
    res.status(404).json({ message: 'Category tidak ditemukan.' });
  }

}