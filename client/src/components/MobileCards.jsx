import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const MobileCards = ({ filteredProducts }) => {
  return (
    <div className="md:hidden px-5">
      {filteredProducts.map((produto, i) => (
        <div
          key={i}
          className="bg-slate-700 shadow-md rounded-md overflow-hidden mb-4"
        >
          <div className="p-4">
            <div className="flex justify-between items-baseline">
              <h3 className="text-lg font-semibold mb-2 text-slate-100">
                {produto.name}
              </h3>
              <p className="text-sm text-slate-400">Código: {produto.code}</p>
            </div>
            <p className="text-slate-200 mb-2">
              {produto.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="text-slate-200">{produto.description}</p>
          </div>
          <div className="flex justify-between p-4 pt-0">
            <div className="flex space-x-2">
              <button className="text-blue-500 hover:text-blue-600 focus:outline-none">
                <FaRegEdit size={20} />
              </button>
              <button className="text-red-500 hover:text-red-600 focus:outline-none">
                <FaRegTrashAlt size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MobileCards;
