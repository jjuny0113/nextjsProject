import client from "@libs/client/client";
import { withHandler } from "./../../../../libs/server/withHandler";
import { withApiSession } from "./../../../../libs/server/withSession";
import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType } from "@libs/server/withHandler";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  switch (req.method) {
    case "POST":
      postData(req, res);
    case "GET":
      getData(req, res);
    default:
      undefined;
  }
};

async function postData(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query,
    session: { user },
    body: { data },
  } = req;

  const message = await client.message.create({
    data: {
      message: data.message,
      stream: {
        connect: {
          id: Number(query.id),
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
    message,
  });
}

async function getData(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { query } = req;

  const messages = await client.message.findMany({
    include: {
      user: {
        select: {
          id: true,
          avatar:true
        },
      },
    },
  });

  res.json({
    ok: true,
    messages,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
  })
);
