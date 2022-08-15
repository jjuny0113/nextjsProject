import type { NextPage } from "next";
import Item from "@components/item";
import Layout from "@components/layout";
import useSWR from "swr";
import { IGetSalesData } from "./types";


const Sold: NextPage = () => {
  const { data } = useSWR<IGetSalesData>(`/api/users/me/sales`);
  
  return (
    <Layout title="판매내역" canGoBack>
      <div className="flex flex-col space-y-5 pb-10  divide-y">
        {data?.sales.map((v, i) => (
          <Item
            id={v.product.id}
            key={v.id}
            title={v.product.name}
            price={v.product.price}
            hearts={v.product._count.Fav}
          />
        ))}
      </div>
    </Layout>
  );
};

export default Sold;
