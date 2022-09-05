import client from "@libs/client/client";
import { withHandler } from "../../../../libs/server/withHandler";
import { withApiSession } from "../../../../libs/server/withSession";
import { ResponseType } from "@libs/server/withHandler";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { query } = req;
  const stream = await client.stream.findUnique({
    where: {
      id: Number(query.id),
    },
    include: {
      messages: {
        select: {
          id:true,
          message: true,
          user: {
            select: {
              id: true,
              avatar: true,
            },
          },
        },
      },
    },
  });
  res.json({
    ok: true,
    stream,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
