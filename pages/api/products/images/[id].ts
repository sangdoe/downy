import { NextApiRequest, NextApiResponse } from 'next';
import api from '../../models/product-image';

export default async function productImageApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  let result;
  // console.log(req.body)

  switch (req.method) {
    case 'POST': {
      const { image } = req.body;
      //console.log(image)
      result = await api.insert(image);
    }
      break;
    case 'PUT': {

      const id: number = req.query.id ? +req.query.id : 0;
      const { image } = req.body;
      result = await api.update(id, image);
    }
      break;

    case 'DELETE':
      {
        const id: number = req.query.id ? +req.query.id : 0;
        result = await api.delete(id);
      }
      break;
    default:
    case 'GET': {
      const id: number = req.query.id ? +req.query.id : 0;
      //console.log(id)
      result = await api.get(id);
    }
  }

  const [data, error] = result;

  if (data) {
    res.status(200).json(data);
  } else {
    console.log("[PRODUCT IMAGES] ERROR: ", req.method, error);
    res.status(404).json({ message: 'Produk tidak ditemukan.' });
  }

}