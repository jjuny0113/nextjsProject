import client from "@libs/client/client";
import { withIronSessionApiRoute } from "iron-session/next";
import { ResponseType, withHandler } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";
import { withApiSession } from "@libs/server/withSession";

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  switch (req.method) {
    case "GET":
      await getData(req, res);
    case "POST":
      await postData(req, res);
    default:
      undefined;
  }
};

async function getData(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const profile = await client.user.findUnique({
    where: { id: req.session.user?.id },
  });

  res.json({
    ok: true,
    profile,
  });
}

async function postData(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (!req.body) return;
  const {
    session: { user },
    body: {
      data: { email, phoneNum, name },
    },
  } = req;

  const currentUser = await client.user.findUnique({
    where: {
      id: user?.id,
    },
  });

  if (email && email !== currentUser?.email) {
    await handleEmail(req, res);
  }

  if (phoneNum && phoneNum !== currentUser?.phone) {
    await handlePhoneNum(req, res);
  }
  if (name) {
    await client.user.update({
      where: {
        id: user?.id,
      },
      data: {
        name,
      },
    });
  }
  res.json({
    ok: true,
  });
}

async function handleEmail(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: {
      data: { email, phoneNum },
    },
  } = req;
  const alreadyExist = Boolean(
    await client.user.findUnique({
      where: {
        email,
      },
      select: {
        id: true,
      },
    })
  );
  if (alreadyExist) {
    res.json({
      ok: false,
      error: "이미 사용중인 이메일입니다.",
    });
    return;
  }
  await client.user.update({
    where: {
      id: user?.id,
    },
    data: {
      email,
    },
  });

  res.json({
    ok: true,
  });
}

async function handlePhoneNum(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: {
      data: { email, phoneNum },
    },
  } = req;
  const alreadyExist = Boolean(
    await client.user.findUnique({
      where: {
        phone: phoneNum,
      },
      select: {
        id: true,
      },
    })
  );
  console.log("alreadyExist", alreadyExist);
  if (alreadyExist) {
    res.json({
      ok: false,
      error: "이미 사용중인 휴대폰 번호입니다.",
    });
    return;
  }
  await client.user.update({
    where: {
      id: user?.id,
    },
    data: {
      phone: phoneNum,
    },
  });
  res.json({
    ok: true,
  });
}

export default withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler,
  })
);
