import { client } from "@libs/client/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { ResponseType, withHandler } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  res.json({
    ok: true,
    profile,
  });
};

export default withApiSession(
  withHandler({
    method: "GET",
    handler
  })
);
