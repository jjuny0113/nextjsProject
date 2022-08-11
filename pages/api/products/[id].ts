import { NextApiRequest, NextApiResponse } from "next";
import { ResponseType, withHandler } from "@libs/server/withHandler";
import { withApiSession } from "@libs/server/withSession";
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const product = await client?.product.findUnique({
    where: { id: Number(req.query.id) },
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });
  const terms = product?.name.split(" ").map((word) => ({
    name: {
      contains: word,
    },
  }));
  console.log(terms);
  const relatedProducts = await client?.product.findMany({
    where: {
      OR: terms,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },
  });
  
  res.json({
    ok: true,
    product,
    relatedProducts
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
