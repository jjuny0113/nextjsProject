import { Product, Sale } from "@prisma/client";

export interface IProduct extends Product {
  _count: {
    Fav: number;
  };
}

export interface IProfileProductData extends Sale {
  product: IProduct;
}

export interface ISucess {
  ok: true;
}

export interface IGetSalesData extends ISucess {
  sales: IProfileProductData[];
}

export interface IGetLovedData extends ISucess {
  favs: IProfileProductData[];
}

export interface IGetBounghtata extends ISucess {
  purchases: IProfileProductData[];
}
