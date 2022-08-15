import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { IGetBounghtata } from "./types";

const Bought: NextPage = () => {
  const { data } = useSWR<IGetBounghtata>(`/api/users/me/purchases`);
  return (
    <Layout title="구매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        {data?.purchases.map((v, i) => (
          <Item
            key={v.id}
            id={v.product.id}
            title={v.product.name}
            price={v.product.price}
            hearts={v.product._count.Fav}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Bought;
