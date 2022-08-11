import { NextApiResponse } from "next";
import { NextApiRequest } from "next";
import { ResponseType, withHandler } from "@libs/server/withHandler";
import client from "@libs/client/client";
import { withApiSession } from "@libs/server/withSession";

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

async function getData(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const products = await client.product.findMany({});
  console.log("products", products);
  res.json({
    ok: true,
    products,
  });
}

async function postData(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { name, price, description } = req.body.data;
  const { user } = req.session;

  const product = await client?.product.create({
    data: {
      name,
      price: Number(price),
      description,
      image: "asdf",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });

  res.json({
    ok: true,
    product,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
