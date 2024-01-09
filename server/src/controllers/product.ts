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
    res.status(201).json("Produto criado com sucesso!");
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

// ### UPDATE
export const updateProduct = async (req: Request, res: Response) => {
  const { code } = req.params;
  const { name, description, price } = req.body;

  try {
    const product = await prismaClient.product.update({
      where: {
        code: parseInt(code),
      },
      data: {
        name,
        price,
        description,
      },
    });

    res.status(200).json("Produto atualizado com sucesso!");
  } catch (err) {
    res.json(err);
  }
};

// ### DELETE
export const deleteProduct = async (req: Request, res: Response) => {
  const { code } = req.params;
  try {
    const product = await prismaClient.product.delete({
      where: {
        code: parseInt(code),
      },
    });
    res.status(200).json("Produto deletado com sucesso!");
  } catch (err) {
    res.json(err);
  }
};
