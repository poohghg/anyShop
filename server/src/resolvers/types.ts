import { Request, Response } from "express";

export type Resolver = {
  [key: string]: {
    [key: string]: (
      parent: any,
      args: { [key: string]: any },
      context: {
        req: Request;
        res: Response;
        userId?: string;
      },
      info: any,
    ) => any;
  };
};

export type User = {
  userId?: string;
  nickName?: string;
  email?: String;
  userTy?: number;
};

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
