import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

import Header from "../components/Header";
import Table from "../components/Table";
import Title from "../components/Title";
import MobileCards from "../components/MobileCards";
import EditModal from "../components/Modals/EditModal";
import CreateModal from "../components/Modals/CreateModal";
import ApiService from "../services/ApiService";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [researchTerm, setresearchTerm] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [onEdit, setOnEdit] = useState(null);
  const url = import.meta.env.VITE_APP_API_URL;
  const apiService = ApiService();

  const getProducts = async () => {
    try {
      const response = await apiService.getProducts(url);
      setProducts(response);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleDelete = async (code) => {
    try {
      const response = await apiService.deleteProduct(url, code);
      const newArray = products.filter((product) => product.code !== code);
      setProducts(newArray);
      toast.success(response);
    } catch (err) {
      toast.error(err);
    }
  };

  const handleEdit = async (productForm) => {
    try {
      const response = await apiService.putProduct(url, productForm);
      const newArray = products
        .map((product) =>
          product.code === productForm.code ? productForm : product
        )
        .sort((a, b) =>
          a.name.toLowerCase().localeCompare(b.name.toLowerCase())
        );
      setProducts(newArray);
      toast.success(response);
    } catch (error) {
      toast.error(error);
    }
  };

  const handleCreate = async (newProduct) => {
    try {
      const response = await apiService.postProduct(url, newProduct);
      const updatedProducts = [...products, newProduct];
      updatedProducts.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
      setProducts(updatedProducts);
      toast.success(response);
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
      <CreateModal
        openModal={openModal}
        setOpenModal={setOpenModal}
        handleCreate={handleCreate}
      />
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
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </>
  );
};

export default Products;
