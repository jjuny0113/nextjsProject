import { client } from "@libs/client/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { ResponseType, withHandler } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  console.log("req.session", req.session);
  const { token } = req.body.data;
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
    // include: { user: true },
  });
  if (!exists) {
    return res.status(404).end();
  }
  console.log("exists", exists);
  req.session.user = {
    id: exists?.userId,
  };
  await req.session.save();
  res.status(200).end();
};

export default withIronSessionApiRoute(withHandler("POST", handler), {
  cookieName: "carrotsesstion",
  password:
    "2893497243874892374892734982739472983749827349827349872398472983749283749823",
});
