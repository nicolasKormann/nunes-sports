import { useState } from "react";
import DeleteModal from "./Modals/DeleteModal";
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

  const [open, setOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const handleDeleteClick = (item) => {
    setItemToDelete(item);
    setOpen(true);
  };

  const confirmDelete = () => {
    handleDelete(itemToDelete.code);
    setOpen(false);
  };

  return (
    <>
      <div className="md:hidden px-5">
        {filteredProducts.map((product, i) => (
          <div
            key={i}
            className=" shadow-md rounded-md overflow-hidden mb-4 border border-slate-700/40"
          >
            <div className="p-4">
              <div className="flex justify-between items-baseline">
                <h3 className="text-base font-semibold mb-2 text-slate-100">
                  {product.name}
                </h3>
              </div>
              <p className="text-sm text-slate-200 mb-2">
                {product.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </p>
              <p className="text-sm text-slate-200">{product.description}</p>
            </div>
            <div className="flex justify-between p-4 pt-0">
              <div className="flex gap-4">
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
                    onClick={() => handleDeleteClick(product)}
                  />
                </button>
              </div>
              <p className="text-xs	 text-slate-400">Código: {product.code}</p>
            </div>
          </div>
        ))}
      </div>
      <DeleteModal
        open={open}
        setOpen={setOpen}
        confirmDelete={confirmDelete}
      />
    </>
  );
};

export default MobileCards;
