import logo from "../images/nunes-logo.svg";


const Header = ({ setOpenModal }) => {
  return (
    <header className="w-full bg-slate-900 py-8">
      <div className="px-5 mx-auto flex justify-between items-end md:mx-auto md:container sm:items-stretch">
        <img className="sm:w-56 w-47" src={logo} alt="Nunes Sportes logo" />
        <button
          className="bg-blue-500 text-slate-100 p-2 px-4 rounded-md hover:bg-blue-600"
          onClick={() => setOpenModal(true)}
        >
          Novo Produto
        </button>
      </div>
    </header>
  );
};

export default Header;
