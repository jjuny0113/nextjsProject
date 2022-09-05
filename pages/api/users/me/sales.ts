import client from "@libs/client/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { ResponseType, withHandler } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const {
    session: { user },
  } = req;
  const sales = await client.sale.findMany({
    where: {
      userId: user?.id,
    },
    include: {
      product: {
        include: {
          _count: {
            select: {
              Fav: true,
            },
          },
        },
      },
    },
  });
console.log('sales')
  res.json({
    ok: true,
    sales,
  });
};

export default withApiSession(
  withHandler({
    methods: ["GET"],
    handler,
  })
);
