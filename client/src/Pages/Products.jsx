import Header from "../components/Header";
import Table from "../components/Table";
import Title from "../components/Title";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import MobileCards from "../components/MobileCards";
import Modal from "../components/Modal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [researchTerm, setresearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);

  const getProducts = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/products");
      setProducts(response.data);
    } catch (err) {
      toast.error(err);
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.code
        .toString()
        .toLowerCase()
        .includes(researchTerm.toLowerCase()) ||
      product.name.toLowerCase().includes(researchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(researchTerm.toLowerCase()) ||
      product.price.toString().includes(researchTerm.toLowerCase())
  );

  useEffect(() => {
    getProducts();
  }, [setProducts]);

  return (
    <>
      <Header setOpenModal={setOpenModal} />
      <Title title="Produtos" />
      <Table
        researchTerm={researchTerm}
        setresearchTerm={setresearchTerm}
        filteredProducts={filteredProducts}
      />
      <MobileCards filteredProducts={filteredProducts} />
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default Products;
