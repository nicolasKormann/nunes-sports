import { Request, Response } from "express";
import { prismaClient } from "../database";

// ### READ
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prismaClient.product.findMany();
    res.status(200).json(products);
  } catch (err) {
    res.json(err);
  }
};

