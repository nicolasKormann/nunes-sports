import { FaRegTrashAlt, FaRegEdit } from "react-icons/fa";

const Table = ({ researchTerm, setresearchTerm, filteredProducts }) => {
  return (
    <>
      <div className="mt-8 px-5 md:mx-auto md:container">
        <div className="flex items-center mb-4">
          <input
            type="text"
            className="p-2 px-4 rounded-md text-slate-400 bg-slate-700 w-full placeholder:text-slate-400 focus:outline-none focus:ring focus:ring-blue-500"
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
          <table className="min-w-full bg-slate-700 shadow-md rounded-md overflow-hidden">
            <thead className="bg-slate-100 text-slate-700">
              <tr className="">
                <th className="py-2 px-4 text-left">Código</th>
                <th className="py-2 px-4 text-left">Nome</th>
                <th className="py-2 px-4 text-left">Descrição</th>
                <th className="py-2 px-4 text-left">Preço</th>
                <th className="py-2 px-4 text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((produto, i) => (
                <tr
                  key={i}
                  className="hover:bg-slate-600 transition duration-300 border-b border-slate-600 text-slate-100 mb-3"
                >
                  <td className="py-2 px-4">{produto.code}</td>
                  <td className="py-2 px-4">{produto.name}</td>
                  <td className="py-2 px-4">{produto.description}</td>
                  <td className="py-2 px-4">
                    {produto.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </td>
                  <td className="py-2 px-4 text-center  space-x-4">
                    <button className="text-blue-500 hover:text-blue-600 focus:outline-none">
                      <FaRegEdit size={20} />
                    </button>
                    <button className="text-red-500 hover:text-red-600 focus:outline-none">
                      <FaRegTrashAlt size={20} />
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
