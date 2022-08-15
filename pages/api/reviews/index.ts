import client from "@libs/client/client";
import { withHandler } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { ResponseType } from "@libs/server/withHandler";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    session: { user },
  } = req;
  const reviews = await client.review.findMany({
    where: {
      createdForId: user?.id,
    },
    include: {
      createBy: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  res.json({
    ok: true,
    reviews,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
