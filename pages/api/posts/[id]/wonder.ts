import client from "@libs/client/client";
import { withHandler } from "@libs/server/withHandler";
import { withApiSession } from "./../../../../libs/server/withSession";
import { ResponseType } from "./../../../../libs/server/withHandler";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await client.wondering.findFirst({
    where: {
      userId: user?.id,
      postId: Number(id),
    },
  });
  if (alreadyExists) {
    await client.wondering.delete({
      where: {
        id: alreadyExists.id,
      },
      select: {
        id: true,
      },
    });
  } else {
    await client.wondering.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({
    ok: true,
  });
};

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
