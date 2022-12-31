import { Request, Response } from "express";

export type Resolver = {
  [key: string]: {
    [key: string]: (
      parent: any,
      args: { [key: string]: any },
      context: {
        req: Request;
        res: Response;
        user: User;
      },
      info: any,
    ) => any;
  };
};

export type User =
  | {
      nickName: string;
      email: String;
      token?: string;
    }
  | {};

export type Product = {
  id: string;
  imageUrl: string;
  price: number;
  title: string;
  description: string;
  createdAt?: number;
};

export type Products = Product[];

export type CartItem = {
  id: string;
  amount: number;
};

export type Cart = CartItem[];
