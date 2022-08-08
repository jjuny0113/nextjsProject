import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export const withHandler =
  (
    method: "POST" | "GET" | "DELETE",
    fn: (
      req: NextApiRequest,
      res: NextApiResponse<ResponseType>
    ) => Promise<any>
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
