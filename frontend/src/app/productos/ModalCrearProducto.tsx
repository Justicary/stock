import React, { ChangeEvent, FormEvent, useState } from "react";
import { v4 } from "uuid";
import Encabezado from "@/app/(componentes)/Encabezado";

type TProductoFormulario = {
  nombre: string;
  precio: number;
  calificacion: number;
  existencias: number;
};

type TModalCrearProductoProps = {
  abierto: boolean;
  alCerrar: () => void;
  alCrear: (formData: TProductoFormulario) => void;
};

const ModalCrearProducto = ({
  abierto,
  alCerrar,
  alCrear,
}: TModalCrearProductoProps) => {
  const [datosFormulario, setDatosFormulario] = useState({
    productoId: v4(),
    nombre: "",
    precio: 0,
    existencias: 0,
    calificacion: 0,
  });

  const controlarCambios = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDatosFormulario({
      ...datosFormulario,
      [name]:
        name === "price" || name === "stockQuantity" || name === "rating"
          ? parseFloat(value)
          : value,
    });
  };

  const controlarEnvio = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alCrear(datosFormulario);
    alCerrar();
  };

  if (!abierto) return null;

  const labelCssStyles = "block text-sm font-medium text-gray-700";
  const inputCssStyles =
    "block w-full mb-2 p-2 border-gray-500 border-2 rounded-md";

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-20">
      <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
        <Encabezado nombre="Crear Producto Nuevo" />
        <form onSubmit={controlarEnvio} className="mt-5">
          {/* PRODUCT NAME */}
          <label htmlFor="productName" className={labelCssStyles}>
            Nombre Producto
          </label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            onChange={controlarCambios}
            value={datosFormulario.nombre}
            className={inputCssStyles}
            required
          />

          {/* PRICE */}
          <label htmlFor="productPrice" className={labelCssStyles}>
            Precio
          </label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            onChange={controlarCambios}
            value={datosFormulario.precio}
            className={inputCssStyles}
            required
          />

          {/* STOCK QUANTITY */}
          <label htmlFor="stockQuantity" className={labelCssStyles}>
            Existencias
          </label>
          <input
            type="number"
            name="stockQuantity"
            placeholder="Stock Quantity"
            onChange={controlarCambios}
            value={datosFormulario.existencias}
            className={inputCssStyles}
            required
          />

          {/* RATING */}
          <label htmlFor="rating" className={labelCssStyles}>
            Calificación
          </label>
          <input
            type="number"
            name="rating"
            placeholder="Rating"
            onChange={controlarCambios}
            value={datosFormulario.calificacion}
            className={inputCssStyles}
            required
          />

          {/* CREATE ACTIONS */}
          <button
            type="submit"
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            Crear
          </button>
          <button
            onClick={alCerrar}
            type="button"
            className="ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-700"
          >
            Cancelar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ModalCrearProducto;
