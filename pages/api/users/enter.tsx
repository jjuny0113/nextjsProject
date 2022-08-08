import twilio from "twilio";
import { client } from "@libs/client/client";
import { ResponseType, withHandler } from "@libs/server/withHandler";
import { NextApiRequest, NextApiResponse } from "next";

const twilioClient = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) => {
  const { phone, email } = req.body.data;
  const user = phone ? { phone: Number(phone) } : email ? { email } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload = Math.floor(100000 + Math.random() * 900000).toString();

  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          // user가 있을 때
          where: {
            ...user,
          },
          // user가 없을 때
          create: {
            ...user,
            name: "Anonymous",
          },
        },
      },
    },
  });

  // if (phone) {
  //  await twilioClient.messages.create({
  //     messagingServiceSid: process.env.TWILIO_SERVICE_SID,
  //     to: process.env.MY_PHONE ?? "", //원래 phone이 들어가야함
  //     body: `로그인 토큰은 ${payload}입니다`,
  //   });
    
  // }

  return res.json({
    ok: true,
  });
};

export default withHandler("POST", handler);
