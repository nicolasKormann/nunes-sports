import axios from "axios";

const ApiService = () => {

  const getProducts = async (url) => {
    try {
      const response = await axios.get(url);
      return response.data.sort((a, b) =>
        a.name.toLowerCase().localeCompare(b.name.toLowerCase())
      );
    } catch (error) {
      throw new Error(`Falha ao buscar produtos: ${error.message}`);
    }
  };

  const deleteProduct = async (url, code) => {
    try {
      const response = await axios.delete(`${url}/${code}`);
      return response.data;
    } catch (error) {
      throw new Error(`Falha ao excluir produto: ${error.message}`);
    }
  };

  const putProduct = async (url, productForm) => {
    try {
      const price = formatPrice(productForm.price);
      const response = await axios.put(`${url}/${productForm.code}`, {
        name: productForm.name,
        description: productForm.description,
        price: Number(price),
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to edit product: ${error.message}`);
    }
  };

  const postProduct = async (url, newProduct) => {
    try {
      const price = formatPrice(newProduct.price);
      const response = await axios.post(url, {
        code: Number(newProduct.code),
        name: newProduct.name,
        description: newProduct.description,
        price: Number(price),
      });
      return response.data;
    } catch (error) {
      throw new Error(`Failed to create product: ${error.message}`);
    }
  };

  const formatPrice = (price) => {
    let formattedPrice = `${price}`;
    formattedPrice = formattedPrice.replace(",", ".");
    formattedPrice = formattedPrice.replace("R$", "").trim();
    return Number(formattedPrice);
  };

  return {
    getProducts,
    deleteProduct,
    putProduct,
    postProduct,
  };
};

export default ApiService;
