import { withIronSessionApiRoute } from "iron-session/next";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions = {
  cookieName: "carrotsesstion",
  password: process.env.COOKIE_PASSWORD ?? "",
};

export const withApiSession = (fn: any) =>
  withIronSessionApiRoute(fn, cookieOptions);
