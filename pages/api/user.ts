import type { NextApiRequest, NextApiResponse } from "next";
import { getUsers } from "lib/api/user";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const { search } = req.query;
      if (!search) {
        res.status(400).send("Please provide a search query.");
      } else {
        const result = await getUsers(search);
        return res.status(200).json(result);
      }
    } catch (e: any) {
      console.log(e);
      return res.status(500).json({
        error: e.toString(),
      });
    }
  } else {
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
