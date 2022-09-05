import client from "@libs/client/client";
import { withHandler } from "@libs/server/withHandler";
import { ResponseType } from "./../../../libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "./../../../libs/server/withSession";
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  switch (req.method) {
    case "GET":
      getData(req, res);
      break;
    case "POST":
      postData(req, res);
      break;
    default:
      undefined;
  }
};

async function getData(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const streams = await client.stream.findMany({});

  res.json({
    ok: true,
    streams,
  });
}

async function postData(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  console.log("req.body.data", req.body.data);
  const { name, price, description } = req.body.data;

  const { user } = req.session;
  const stream = await client.stream.create({
    data: {
      name,
      price,
      description,
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.json({
    ok: true,
    stream,
  });
}

export default withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler,
  })
);
