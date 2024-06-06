/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Breadcrumb,
  Button,
  Label,
  Modal,
  Table,
  TextInput,
} from "flowbite-react";
import type { ChangeEvent, FC } from "react";
import { useContext, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  HiCog,
  HiDotsVertical,
  HiExclamationCircle,
  HiHome,
  HiOutlineExclamationCircle,
  HiPencilAlt,
  HiTrash,
} from "react-icons/hi";
import NavbarSidebarLayout from "../../layouts/navbar-sidebar";
import { Pagination } from "../users/list";
import { postMarca, putMarca } from "../services/marcas";
import { Marca } from "../../types/api";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { newMarcaSchema, updateMarcaSchema } from "../../schemas/marcas";
import { MarcasContext } from "../../context/marcas/MarcasContext";

const MarcasPage: FC = function () {
  return (
    <NavbarSidebarLayout isFooter={false}>
      <div className="block items-center justify-between border-b border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800 sm:flex">
        <div className="mb-1 w-full">
          <div className="mb-4">
            <Breadcrumb className="mb-4">
              <Breadcrumb.Item href="#">
                <div className="flex items-center gap-x-3">
                  <HiHome className="text-xl" />
                  <span className="dark:text-white">Home</span>
                </div>
              </Breadcrumb.Item>
              <Breadcrumb.Item href="/e-commerce/products">
                crud
              </Breadcrumb.Item>
              <Breadcrumb.Item>Marcas</Breadcrumb.Item>
            </Breadcrumb>
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Todas las marcas
            </h1>
          </div>
          <div className="block items-center sm:flex">
            <SearchForProducts />
            <div className="hidden space-x-1 border-l border-gray-100 pl-2 dark:border-gray-700 md:flex">
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Configure</span>
                <HiCog className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Delete</span>
                <HiTrash className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Purge</span>
                <HiExclamationCircle className="text-2xl" />
              </a>
              <a
                href="#"
                className="inline-flex cursor-pointer justify-center rounded p-1 text-gray-500 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Settings</span>
                <HiDotsVertical className="text-2xl" />
              </a>
            </div>
            <div className="flex w-full items-center sm:justify-end">
              <AddProductModal />
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden shadow">
              <ProductsTable />
            </div>
          </div>
        </div>
      </div>
      <Pagination />
    </NavbarSidebarLayout>
  );
};

const SearchForProducts: FC = function () {
  return (
    <form className="mb-4 sm:mb-0 sm:pr-3" action="#" method="GET">
      <Label htmlFor="products-search" className="sr-only">
        Buscar
      </Label>
      <div className="relative mt-1 lg:w-64 xl:w-96">
        <TextInput
          id="products-search"
          name="products-search"
          placeholder="Buscar marcas"
        />
      </div>
    </form>
  );
};

const AddProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);
  const { setMarcas } = useContext(MarcasContext);
  return (
    <>
      <Button color="primary" onClick={() => setOpen(!isOpen)}>
        <FaPlus className="mr-3 text-sm" />
        Agregar una marca
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Formik
          initialValues={{ estado: "", nombre: "" }}
          onSubmit={async (
            values,
            { resetForm, setFieldError, setSubmitting }
          ) => {
            const marca = {
              ...values,
              estado: values.estado == "true",
            } as Omit<Marca, "id">;
            const res = await postMarca(marca);
            if (res.status == 200) {
              resetForm();
              alert("Marca registrada satisfactoriamente");
              setMarcas((marcas: Marca[]) => [...marcas, marca]);
              setOpen(false);
            } else if (res.status == 400) {
              const errorArray: any = (await res.json()).data.error;
              alert("Se han encontrado errores de validación del servidor");

              for (let i = errorArray.length - 1; i >= 0; i--) {
                if (
                  errorArray[i].path &&
                  errorArray[i].path.includes("nombre")
                ) {
                  setFieldError("nombre", errorArray[i].message);
                }
                if (
                  errorArray[i].path &&
                  errorArray[i].path.includes("estado")
                ) {
                  setFieldError("estado", errorArray[i].message);
                }
              }
            }

            setSubmitting(false);
          }}
          validationSchema={newMarcaSchema}
        >
          {({ submitForm, isSubmitting }: FormikProps<any>) => (
            <Form>
              <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                <strong>Agregar una marca</strong>
              </Modal.Header>
              <Modal.Body>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <Label htmlFor="marcaName">Nombre</Label>
                    <Field
                      id="marcaName"
                      name="nombre"
                      placeholder="Pepsi"
                      className="mt-1 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
                    />

                    <ErrorMessage component="div" name="nombre" />
                  </div>
                  <div>
                    <Label htmlFor="estadoMarca_add">Estado</Label>

                    <Field
                      as="select"
                      name="estado"
                      id="estadoMarca_add"
                      className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
                    >
                      <option value="">-- Seleccione uno --</option>
                      <option value="false">Inactivo</option>
                      <option value="true">Activo</option>
                    </Field>
                    <ErrorMessage component="div" name="estado" />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  color="dark"
                  disabled={isSubmitting}
                  onClick={() => submitForm()}
                >
                  Agregar
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
              </Modal.Footer>
            </Form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

interface EditProductModalProps {
  marcaEdit: Marca;
}
const EditProductModal: FC<EditProductModalProps> = function ({ marcaEdit }) {
  const [isOpen, setOpen] = useState(false);
  const { marca, setMarca } = useContext(MarcasContext);
  const { setMarcas } = useContext(MarcasContext);

  const handleOpenEditMarcaModal = () => {
    setOpen(!isOpen);
  };
  useEffect(() => {
    if (isOpen) {
      const marca = {
        id: marcaEdit.id,
        estado: !!marcaEdit.estado,
        nombre: marcaEdit.nombre,
      } as Marca;
      setMarca(marca);
    }
  }, [isOpen]);
  return (
    <>
      <Button color="primary" onClick={() => handleOpenEditMarcaModal()}>
        <HiPencilAlt className="mr-2 text-lg" />
        Editar marca
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen}>
        <Formik
          initialValues={marca}
          onSubmit={async (
            values,
            { resetForm, setFieldError, setSubmitting }
          ) => {
            const res = await putMarca(marca);
            if (res.status == 200) {
              resetForm();
              alert("Marca actualizada satisfactoriamente");

              setMarcas((prevMarcas: Marca[]) => {
                const marcasFiltred = prevMarcas.filter(
                  (m: Marca) => m.id !== marca.id
                );

                return [...marcasFiltred, marca];
              });
              setOpen(false);
            } else if (res.status == 400) {
              const errorArray: any = (await res.json()).data.error;
              alert("Se han encontrado errores de validación del servidor");

              for (let i = errorArray.length - 1; i >= 0; i--) {
                if (errorArray[i].path && errorArray[i].path.includes("id")) {
                  setFieldError("id", errorArray[i].message);
                }
                if (
                  errorArray[i].path &&
                  errorArray[i].path.includes("nombre")
                ) {
                  setFieldError("nombre", errorArray[i].message);
                }
                if (
                  errorArray[i].path &&
                  errorArray[i].path.includes("estado")
                ) {
                  setFieldError("estado", errorArray[i].message);
                }
              }
            }
            setSubmitting(false);
          }}
          validationSchema={updateMarcaSchema}
          enableReinitialize={true}
        >
          {({ submitForm, isSubmitting }: FormikProps<any>) => (
            <form>
              <Modal.Header className="border-b border-gray-200 !p-6 dark:border-gray-700">
                <strong>Editar marca</strong>
              </Modal.Header>
              <Modal.Body>
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                  <div>
                    <Label htmlFor="marcaIdEdit">Id</Label>
                    <Field
                      id="marcaIdEdit"
                      name="id"
                      type="number"
                      placeholder="0"
                      disabled
                      className="mt-1 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
                    />
                    <ErrorMessage component="div" name="id" />
                  </div>

                  <div>
                    <Label htmlFor="marcaNameEdit">Nombre</Label>
                    <Field
                      id="marcaNameEdit"
                      name="nombre"
                      placeholder="Pepsi"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        setMarca({ ...marca, nombre: e.target.value });
                      }}
                      className="mt-1 block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
                    />
                    <ErrorMessage component="div" name="nombre" />
                  </div>
                  <div>
                    <Label htmlFor="estadoMarcaEdit">Estado</Label>

                    <Field
                      as="select"
                      name="estado"
                      id="estadoMarcaEdit"
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {
                        const nuevoEstado = e.target.value === "true";
                        setMarca({ ...marca, estado: nuevoEstado });
                      }}
                      className="block w-full border disabled:cursor-not-allowed disabled:opacity-50 bg-gray-50 border-gray-300 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 rounded-lg p-2.5 text-sm"
                    >
                      <option value="false">Inactivo</option>
                      <option value="true">Activo</option>
                    </Field>
                    <ErrorMessage component="div" name="estado" />
                  </div>
                </div>
              </Modal.Body>
              <Modal.Footer>
                <Button
                  color="dark"
                  disabled={isSubmitting}
                  onClick={() => submitForm()}
                >
                  Actualizar
                </Button>
                <Button color="gray" onClick={() => setOpen(false)}>
                  Cancelar
                </Button>
              </Modal.Footer>
            </form>
          )}
        </Formik>
      </Modal>
    </>
  );
};

const DeleteProductModal: FC = function () {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button color="failure" onClick={() => setOpen(!isOpen)}>
        <HiTrash className="mr-2 text-lg" />
        Eliminar marca
      </Button>
      <Modal onClose={() => setOpen(false)} show={isOpen} size="md">
        <Modal.Header className="px-3 pt-3 pb-0">
          <span className="sr-only">Delete product</span>
        </Modal.Header>
        <Modal.Body className="px-6 pb-6 pt-0">
          <div className="flex flex-col items-center gap-y-6 text-center">
            <HiOutlineExclamationCircle className="text-7xl text-red-600" />
            <p className="text-lg text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this product?
            </p>
            <div className="flex items-center gap-x-3">
              <Button color="failure" onClick={() => setOpen(false)}>
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpen(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

const ProductsTable: FC = function () {
  const { marcas } = useContext(MarcasContext);

  return (
    <Table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
      <Table.Head className="bg-gray-100 dark:bg-gray-700">
        <Table.HeadCell className="w-1/4">ID</Table.HeadCell>
        <Table.HeadCell className="w-1/4">Nombre</Table.HeadCell>
        <Table.HeadCell className="w-1/4">Estado</Table.HeadCell>
        <Table.HeadCell className="w-1/4"></Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-800">
        {marcas.map((marca: Marca, i: number) => (
          <Table.Row
            key={i}
            className="hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Table.Cell className="whitespace-nowrap p-4 text-sm font-normal text-gray-500 dark:text-gray-400 w-1/4">
              <div className="text-base font-semibold text-gray-900 dark:text-white">
                {marca.id}
              </div>
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white w-1/4">
              {marca.nombre}
            </Table.Cell>
            <Table.Cell className="whitespace-nowrap p-4 text-base font-medium text-gray-900 dark:text-white flex items-center">
              {marca.estado ? (
                <>
                  <div className="h-2.5 w-2.5 rounded-full bg-green-400 mr-2" />
                  <span>Activo</span>
                </>
              ) : (
                <>
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500 mr-2" />
                  <span>Inactivo</span>
                </>
              )}
            </Table.Cell>
            <Table.Cell className="space-x-2 whitespace-nowrap p-4">
              <div className="flex items-center gap-x-3 w-1/4">
                <EditProductModal marcaEdit={marca} />
                <DeleteProductModal />
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};

export default MarcasPage;
