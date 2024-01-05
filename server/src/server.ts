import express from 'express'
import { prismaClient } from "./database";
import productRouter from './routes/products';

const app = express();
app.use(express.json());

const port = process.env.PORT ?? 4000;

app.use('/', productRouter)

app.listen(port, () => console.log('Server is running on port', port))






















// ### CREATE
async function create() {
  const produt = await prismaClient.product.create({
    data: {
      code: 124,
      name: "Produto de teste 2",
      description: "Descrição teste 2",
      price: 25,
    },
  });
  console.log(produt);
  prismaClient.$disconnect();
}


// ### UPDATE
async function update() {
  const produt = await prismaClient.product.update({
    where: {
      code: 124,
    },
    data: {
      code: 124,
      name: "Produto de teste 2.1",
      description: "Descrição teste 2.1",
      price: 2150.35,
    },
  });
  console.log(produt);
  prismaClient.$disconnect();
}

// ### DELETE
async function deleteProduct() {
  const produt = await prismaClient.product.delete({
    where: {
      code: 124,
    },
  });
  console.log(produt);
  prismaClient.$disconnect();
}


// create();
// read();
// update();
// deleteProduct();