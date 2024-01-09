import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const MobileCards = ({
  filteredProducts,
  handleDelete,
  setOpenEditModal,
  setOnEdit,
}) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  return (
    <div className="md:hidden px-5">
      {filteredProducts.map((product, i) => (
        <div
          key={i}
          className=" shadow-md rounded-md overflow-hidden mb-4 border border-slate-700/40"
        >
          <div className="p-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold mb-2 text-slate-100">
                {product.name}
              </h3>
              <p className="text-sm text-slate-400">Código: {product.code}</p>
            </div>
            <p className="text-slate-200 mb-2">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="text-slate-200">{product.description}</p>
          </div>
          <div className="flex justify-between p-4 pt-0">
            <div className="flex space-x-2">
              <button className="text-blue-500 hover:text-blue-600 focus:outline-none">
                <FaRegEdit
                  size={20}
                  onClick={() => {
                    handleEdit(product);
                    setOpenEditModal(true);
                  }}
                />
              </button>
              <button className="text-red-500 hover:text-red-600 focus:outline-none">
                <FaRegTrashAlt
                  size={20}
                  onClick={() => handleDelete(product.code)}
                />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileCards;
