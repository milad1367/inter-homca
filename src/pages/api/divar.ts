// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  data: any;
};
const baseUrl = "https://api.divar.ir/v8/web-search/tehran/classic-car";
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const query = req.query;
  const params = Object.keys(query)
    .map((key) => {
      return `${key}=${query[key]}`;
    })
    .join("&");

  try {
    const url = params ? `${baseUrl}?${params}` : `${baseUrl}`;
    const response = await axios.get(url);
    res.status(200).json({ data: response.data });
  } catch (e) {
    res.status(500).json({ data: e });
  }
}
