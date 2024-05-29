import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const placeName: string = req.query.placeName as string;

  const response = await fetch(
    `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${placeName}&language=ja&key=${process.env.GOOGLE_PLACES_API_KEY}`
  );

  const data = await response.json();

  return res.status(200).json(data);
}
