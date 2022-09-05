import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

const main = async () => {
  Array(500)
    .fill(null)
    .map((_, i) => i)
    .forEach(async (item) => {
      await client.stream.create({
        data: {
          name: String(item),
          description: String(item),
          price: item,
          user: {
            connect: {
              id: 5,
            },
          },
        },
      });
      console.log(`${item}/500`);
    });
};

main()
  .catch((e) => console.log(e))
  .finally(() => client.$disconnect());
