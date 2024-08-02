"use client";

import Image from "next/image";
import { useCrearProductoMutation, useGetProductosQuery } from "@/estado/api";
import { PlusCircleIcon, SearchIcon } from "lucide-react";
import { useState } from "react";
import Encabezado from "@/app/(componentes)/Encabezado";
import Calificacion from "@/app/(componentes)/Calificacion";
import CargadorPuntos from "../(componentes)/CargadorPuntos";
import ModalCrearProducto from "./ModalCrearProducto";

type TProductoFormulario = {
  nombre: string;
  precio: number;
  existencias: number;
  calificacion: number;
};

const Productos = () => {
  const [terminosBusqueda, setTerminosBusqueda] = useState("");
  const [modalAbierto, setModalAbierto] = useState(false);

  const {
    data: productos,
    isLoading,
    isError,
  } = useGetProductosQuery(terminosBusqueda);

  const [createProduct] = useCrearProductoMutation();
  const controlCrearProducto = async (datosProducto: TProductoFormulario) => {
    await createProduct(datosProducto);
  };

  if (isLoading) {
    return <CargadorPuntos />;
  }

  if (isError || !productos) {
    return (
      <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
        <div className="text-center text-red-500">
          <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Atención:</h2>
          ¡Falló la obtención de productos de la API!
          <br />
          Asegúrate de que el backend este funcionando
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto pb-5 w-full">
      {/* BARRA BUSQUEDA */}
      <div className="mb-6">
        <div className="flex items-center border-2 border-gray-200 rounded">
          <SearchIcon className="w-5 h-5 text-gray-500 m-2" />
          <input
            className="w-full py-2 px-4 rounded bg-white"
            placeholder="Buscar productos..."
            value={terminosBusqueda}
            onChange={(e) => setTerminosBusqueda(e.target.value)}
          />
        </div>
      </div>

      {/* BARRA ENCABEZADO */}
      <div className="flex justify-between items-center mb-6">
        <Encabezado nombre="Productos" />
        <button
          className="flex items-center bg-yellow-500 hover:bg-yellow-800 text-gray-200 font-bold py-2 px-4 rounded"
          onClick={() => setModalAbierto(true)}
        >
          <PlusCircleIcon className="w-5 h-5 mr-2 !text-gray-200" /> Crear
          Producto
        </button>
      </div>

      {/* BODY LISTA PRODUCTOS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg-grid-cols-3 gap-10 justify-between">
        {isLoading ? (
          <CargadorPuntos />
        ) : (
          productos?.map((p) => (
            <div
              key={p.productoId}
              className="border shadow rounded-md p-4 max-w-full w-full mx-auto"
            >
              <div className="flex flex-col items-center">
                <Image
                  src={`https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/product${
                    Math.floor(Math.random() * 3) + 1
                  }.png`}
                  alt={p.nombre}
                  width={150}
                  height={150}
                  className="mb-3 rounded-2xl w-36 h-36"
                />
                <h3 className="text-lg text-gray-900 font-semibold">
                  {p.nombre}
                </h3>
                <p className="text-gray-800">${p.precio.toFixed(2)}</p>
                <div className="text-sm text-gray-600 mt-1">
                  Existencias: {p.existencias}
                </div>
                {p.calificacion && (
                  <div className="flex items-center mt-2">
                    <Calificacion valor={p.calificacion} />
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* MODAL */}
      <ModalCrearProducto
        abierto={modalAbierto}
        alCerrar={() => setModalAbierto(false)}
        alCrear={controlCrearProducto}
      />
    </div>
  );
};

export default Productos;
