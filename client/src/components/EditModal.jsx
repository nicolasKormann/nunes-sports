import { Fragment, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { IoMdClose } from "react-icons/io";
import { useState } from "react";
import { toast } from "react-toastify";

const EditModal = ({
  openModal,
  setOpenModal,
  onEdit,
  setOnEdit,
  getProducts,
  handleEdit,
}) => {
  const cancelButtonRef = useRef(null);
  const [formValues, setFormValues] = useState({
    code: "",
    name: "",
    description: "",
    price: "",
  });

  useEffect(() => {
    if (onEdit) {
      setFormValues({
        code: onEdit.code,
        name: onEdit.name,
        description: onEdit.description,
        price: onEdit.price,
      });
    }
  }, [onEdit]);

  useEffect(() => {
    if (!openModal && onEdit) {
      setFormValues({
        code: onEdit.code || "",
        name: onEdit.name || "",
        description: onEdit.description || "",
        price: onEdit.price || "",
      });
    }
  }, [openModal, onEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === "price") {
      let numericValue = value.replace(/[^\d,]/g, "");

      const decimalParts = numericValue.split(",");
      if (decimalParts.length > 1) {
        numericValue = `${decimalParts[0]},${decimalParts[1].slice(0, 2)}`;
      }

      setFormValues(() => ({
        ...formValues,
        [name]: `R$ ${numericValue}`,
      }));
    } else {
      setFormValues(() => ({ ...formValues, [name]: value.slice(0, 40) }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formValues.name || !formValues.description || !formValues.price) {
      return toast.warning("Preencha todos os campos");
    }

    handleEdit(formValues);
    setOpenModal(false);
    setOnEdit(null);
  };

  return (
    <Transition.Root show={openModal} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={setOpenModal}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-left sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="w-full transform overflow-hidden rounded-lg bg-slate-700 shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="relative bg-slate-800 p-6 sm:p-10 ">
                  <div className="sm:flex sm:items-start">
                    <button
                      className="text-slate-400 absolute top-6 right-6 hover:text-slate-500"
                      onClick={() => setOpenModal(false)}
                    >
                      <IoMdClose size={24} />
                    </button>
                    <div className="mt-3 sm:ml-4 w-full">
                      <Dialog.Title
                        as="h3"
                        className="text-xl font-semibold leading-6 text-slate-100 md:text-2xl"
                      >
                        {onEdit ? "Editar Produto" : "Novo Produto"}
                      </Dialog.Title>
                      <div className="mt-6 md:mt-8">
                        <form className="w-full" onSubmit={handleSubmit}>
                          <input
                            name="code"
                            value={formValues.code}
                            type="number"
                            className="p-2 px-4 rounded-md text-slate-400 bg-slate-700 w-full placeholder:text-slate-400 focus:outline-none focus:ring focus:ring-blue-500 disabled:opacity-40"
                            placeholder="Código"
                            disabled
                          />

                          <input
                            name="name"
                            value={formValues.name}
                            type="text"
                            className="p-2 px-4 rounded-md text-slate-400 bg-slate-700 w-full placeholder:text-slate-400 focus:outline-none focus:ring focus:ring-blue-500 mt-5"
                            placeholder="Nome"
                            onChange={handleChange}
                            required
                          />

                          <input
                            name="description"
                            value={formValues.description}
                            type="text"
                            className="p-2 px-4 rounded-md text-slate-400 bg-slate-700 w-full placeholder:text-slate-400 focus:outline-none focus:ring focus:ring-blue-500 mt-5"
                            placeholder="Descrição"
                            onChange={handleChange}
                          />

                          <input
                            name="price"
                            value={formValues.price.toLocaleString("pt-BR", {
                              style: "currency",
                              currency: "BRL",
                            })}
                            type="text"
                            className="p-2 px-4 rounded-md text-slate-400 bg-slate-700 w-full placeholder:text-slate-400 focus:outline-none focus:ring focus:ring-blue-500 mt-5"
                            placeholder="Preço"
                            onChange={handleChange}
                          />

                          <button
                            type="submit"
                            className="w-full bg-blue-500 text-slate-100 font-semibold p-2 px-4 mt-5 rounded-md hover:bg-blue-600 "
                            onClick={() => setOpenModal(true)}
                          >
                            Cadastrar
                          </button>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default EditModal;
