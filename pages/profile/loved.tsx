import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { IGetLovedData } from "./types";

const Loved: NextPage = () => {
  const { data } = useSWR<IGetLovedData>(`/api/users/me/favs`);
  
  return (
    <Layout title="관심목록" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        {data?.favs.map((v, i) => (
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

export default Loved;
