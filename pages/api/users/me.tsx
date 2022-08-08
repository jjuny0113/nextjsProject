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
  console.log(req.session.user);
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });
  BigInt.prototype.toJSON = function() {       
    return this.toString()
  }
  res.json({
    ok: true,
    profile,
  });
};

export default withIronSessionApiRoute(withHandler("GET", handler), {
  cookieName: "carrotsesstion",
  password:
    "2893497243874892374892734982739472983749827349827349872398472983749283749823",
});
