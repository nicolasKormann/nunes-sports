import Header from "../components/Header";
import Table from "../components/Table";
import Title from "../components/Title";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import MobileCards from "../components/MobileCards";
import EditModal from "../components/EditModal";
import Modal from "../components/Modal";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [researchTerm, setresearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [onEdit, setOnEdit] = useState(null);

  const url = "http://localhost:4000/api/products";

  const getProducts = async () => {
    try {
      const response = await axios.get(url);
      setProducts(response.data);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDelete = async (code) => {
    try {
      const data = await axios.delete(`${url}/${code}`);
      const newArray = products.filter((product) => product.code !== code);
      setProducts(newArray);
      toast.success(data);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleEdit = async (productForm) => {
    try {
      console.log(productForm);
      let price = productForm.price.toString();
      price = productForm.price.replace(",", ".");
      price = price.replace("R$", "").trim();
      const response = await axios.put(
        `http://localhost:4000/api/products/${productForm.code}`,
        {
          name: productForm.name,
          description: productForm.description,
          price: Number(price),
        }
      );
      toast.success(response.data);
      setProducts(
        products.map((product) =>
          product.code === productForm.code ? productForm : product
        )
      );
      console.log(response.data);
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [setProducts]);

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

  return (
    <>
      <Header setOpenModal={setOpenModal} />
      <Title title="Produtos" />
      <Table
        researchTerm={researchTerm}
        setresearchTerm={setresearchTerm}
        filteredProducts={filteredProducts}
        handleDelete={handleDelete}
        setOpenEditModal={setOpenEditModal}
        setOnEdit={setOnEdit}
      />
      <MobileCards
        filteredProducts={filteredProducts}
        handleDelete={handleDelete}
        setOpenEditModal={setOpenEditModal}
        setOnEdit={setOnEdit}
      />
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
      {onEdit && (
        <EditModal
          openModal={openEditModal}
          setOpenModal={setOpenEditModal}
          filteredProducts={filteredProducts}
          onEdit={onEdit}
          setOnEdit={setOnEdit}
          getProducts={getProducts}
          handleEdit={handleEdit}
        />
      )}
    </>
  );
};

export default Products;
