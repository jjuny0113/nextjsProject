import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

interface ConfigType {
  method: "POST" | "GET" | "DELETE";
  handler: (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ) => Promise<any>;
  isPrivate?: boolean;
}

export const withHandler =
  ({ method, isPrivate = true, handler }: ConfigType) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== method) {
      res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.json({ ok: false, error: "로그인해주세요" });
    }
    try {
      await handler(req, res);
    } catch (e) {
      console.error(e);
      return res.status(500).json({
        error: e,
      });
    }
  };
