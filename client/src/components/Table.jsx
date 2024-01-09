import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const Table = ({
  researchTerm,
  setresearchTerm,
  filteredProducts,
  handleDelete,
  setOpenEditModal,
  setOnEdit,
}) => {
  const handleEdit = (item) => {
    setOnEdit(item);
  };

  return (
    <>
      <div className="mt-8 px-5 md:mx-auto md:container">
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="p-2 px-4 rounded-md text-slate-400 bg-slate-700/50 w-full placeholder:text-slate-400 focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Pesquisar produtos"
            value={researchTerm}
            onChange={(e) => setresearchTerm(e.target.value)}
          />
          <button
            className="text-blue-500 p-2 px-8 rounded-md ml-4 border border-blue-500 hover:bg-blue-500 hover:text-slate-100 transition duration-300"
            onClick={() => setresearchTerm("")}
          >
            Limpar
          </button>
        </div>
        <div className="hidden md:table w-full">
          <table className="min-w-full shadow-md rounded-md overflow-hidden">
            <thead className=" text-slate-100 border-b border-slate-700">
              <tr className="">
                <th className="py-2 px-4 text-left">Código</th>
                <th className="py-2 px-4 text-left">Nome</th>
                <th className="py-2 px-4 text-left">Descrição</th>
                <th className="py-2 px-4 text-left">Preço</th>
                <th className="py-2 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-700 transition duration-300 border-b border-slate-700/50 text-slate-100 mb-3"
                >
                  <td className="py-2 px-4">{product.code}</td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.description}</td>
                  <td className="py-2 px-4">
                    {product.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="py-2 px-4 text-center  space-x-4">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Table;
