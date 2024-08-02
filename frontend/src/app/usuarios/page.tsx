"use client";

import { useGetUsuariosQuery } from "@/estado/api";
import Encabezado from "@/app/(componentes)/Encabezado";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import CargadorSpinner from "../(componentes)/CargadorSpinner";

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 90 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
];

const Users = () => {
  const { data: usuarios, isError, isLoading } = useGetUsuariosQuery();

  if (isLoading) {
    return <CargadorSpinner />;
  }

  if (isError || !usuarios) {
    return (
      <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
        <div className="text-center text-red-500">
          <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Atención:</h2>
          ¡Falló la obtención de usuarios de la API!
          <br />
          Asegúrate de que el backend este funcionando
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      <Encabezado nombre="Usuarios" />
      <DataGrid
        rows={usuarios}
        columns={columns}
        getRowId={(row) => row.userId}
        checkboxSelection
        className="bg-white shadow rounded-lg border border-gray-200 mt-5 !text-gray-700"
      />
    </div>
  );
};

export default Users;
