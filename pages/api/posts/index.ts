import { withHandler } from "./../../../libs/server/withHandler";
import { withApiSession } from "./../../../libs/server/withSession";
import { NextApiRequest } from "next";
import client from "@libs/client/client";
import { NextApiResponse } from "next";
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case "POST":
      postData(req, res);
    case "GET":
      getData(req, res);
    default:
      undefined;
  }
};

async function getData(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { latitude, longitude },
  } = req;

  const posts = await client.post.findMany({
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
      _count: {
        select: {
          answers: true,
          Wondering: true,
        },
      },
    },
    where: {
      ...(latitude && longitude
        ? {
            latitude: {
              gte: parseFloat(latitude?.toString()) - 0.01,
              lte: parseFloat(latitude?.toString()) + 0.01,
            },
            longitude: {
              gte: parseFloat(longitude?.toString()) - 0.01,
              lte: parseFloat(longitude?.toString()) + 0.01,
            },
          }
        : {}),
    },
  });
  res.json({
    ok: true,
    posts,
  });
}

async function postData(req: NextApiRequest, res: NextApiResponse) {
  const { question, latitude, longitude } = req.body.data;
  const { user } = req.session;

  const post = await client?.post.create({
    data: {
      question,
      latitude,
      longitude,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.json({
    ok: true,
    post,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
