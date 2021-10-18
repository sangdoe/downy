import { NextApiRequest, NextApiResponse } from "next";
import api from "../../models/sub-categories";

export default async function userApi(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id: number = req.query.id ? +req.query.id : 0;
  const result = await api.listByCategory(id);
  const [data, error] = result;

  if (data) {
    res.status(200).json(data);
  } else {
    console.log("CATEGORY GETSUB ERROR: ", req.method, error);
    res.status(404).json({ message: "Sub Category was empty." });
  }
}
