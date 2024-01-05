import { Request, Response } from "express";
import { prismaClient } from "../database";

// ### CREATE
export const createProduct = async (req: Request, res: Response) => {
  const { code, name, description, price } = req.body;
  try {
    const product = await prismaClient.product.create({
      data: {
        code,
        name,
        description,
        price,
      },
    });
    res.status(201).json("Usuário criado com sucesso!");
  } catch (err) {
    res.json(err);
  }
};

// ### READ
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await prismaClient.product.findMany();
    res.status(200).json(products);
  } catch (err) {
    res.json(err);
  }
};