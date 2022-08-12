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
    query: { id },
    session: { user },
  } = req;
  const alreadyExists = await client?.fav.findFirst({
    where: {
      productId: Number(id),
      userId: user?.id,
    },
  });
  console.log('alreadyExists',alreadyExists)
  if (alreadyExists) {
    await client?.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client?.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: Number(id),
          },
        },
      },
    });
  }
  res.json({ ok: true });
};

export default withApiSession(
  withHandler({
    methods: ["POST"],
    handler,
  })
);
