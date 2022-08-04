import { NextApiRequest, NextApiResponse } from "next";

export const withHandler =
  (
    method: "POST" | "GET" | "DELETE",
    fn: (req: NextApiRequest, res: NextApiResponse) => Promise<NextApiResponse<any>>
  ) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      res.status(405).end();
    }
    try {
      await fn(req, res);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        error: e,
      });
    }
  };
