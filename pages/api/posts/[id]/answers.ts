import client from "@libs/client/client";
import { withHandler } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
import { ResponseType } from "@libs/server/withHandler";
import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    data: { answerForm },
  } = req.body;

  const {
    session: { user },
    query: { id },
  } = req;

  const post = await client.post.findUnique({
    where: {
      id: Number(id),
    },
    select: {
      id: true,
    },
  });

  if (!post) {
    res.json({
      ok: false,
    });
    return;
  }

  const answer = await client.answer.create({
    data: {
      answer: answerForm,
      post: {
        connect: {
          id: post.id,
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.json({
    ok: true,
    answer,
  });
};

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
