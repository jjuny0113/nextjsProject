import { client } from "@libs/client/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { ResponseType, withHandler } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  console.log("req.session", req.session);
  const { token } = req.body.data;
  const foundToken = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: { user: true },
  });
  if (!foundToken) {
    return res.status(404).end();
  }
  console.log("foundToken", foundToken);
  req.session.user = {
    id: foundToken?.userId,
  };
  await req.session.save();
  await client.token.deleteMany({
    where: {
      userId: foundToken.userId,
    },
  });
  res.json({
    ok: true,
  });
};

export default withApiSession(
  withHandler({
    method: "POST",
    handler,
    isPrivate: false,
  })
);
