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
  const {
    query,
    session: { user },
  } = req;

  const post = await client.post.findUnique({
    where: {
      id: Number(query.id),
    },
    select: {
      question: true,
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          Wondering: true,
          answers: true,
        },
      },
      answers: {
        select: {
          answer: true,
          createdAt:true,
          user: {
            select: {
              name: true,
              id: true,
              avatar: true,
            },
          },
        },
      },
    },
  });

  const isWondering = Boolean(
    await client.wondering.findFirst({
      where: {
        postId: Number(query.id),
        userId: user?.id,
      },
      select: {
        id: true,
      },
    })
  );

  res.json({
    ok: true,
    post,
    isWondering
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
