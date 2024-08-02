"use client";

import { useGetProductosQuery } from "@/estado/api";
import Encabezado from "@/app/(componentes)/Encabezado";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CargadorPuntos from "../(componentes)/CargadorPuntos";

const columns: GridColDef[] = [
  { field: "productoId", headerName: "ID", width: 90 },
  { field: "nombre", headerName: "Nombre del Producto", width: 200 },
  {
    field: "precio",
    headerName: "Precio",
    width: 110,
    type: "number",
    valueGetter: (value, row) => `$${row.precio}`,
  },
  {
    field: "calificacion",
    headerName: "Calificación",
    width: 110,
    type: "number",
    valueGetter: (value, row) => (row.calificacion ? row.calificacion : "N/A"),
  },
  {
    field: "existencias",
    headerName: "Existencias",
    width: 150,
    type: "number",
  },
];

const Inventario = () => {
  const { data: productos, isError, isLoading } = useGetProductosQuery();

  if (isLoading) {
    return <CargadorPuntos />;
  }

  if (isError || !productos) {
    return (
      <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
        <div className="text-center text-red-500">
          <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Atención:</h2>
          ¡Falló la obtención del inventario de la API!
          <br />
          Asegúrate de que el backend este funcionando
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Encabezado nombre="Inventario" />
      <DataGrid
        rows={productos}
        columns={columns}
        getRowId={(row) => row.productId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Inventario;
