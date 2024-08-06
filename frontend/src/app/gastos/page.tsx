"use client";

import {
  IResumenGastoPorCategoria,
  useGetGastosPorCategoriaQuery,
} from "@/estado/api";
import { useMemo, useState } from "react";
import Encabezado from "@/app/(componentes)/Encabezado";
import CargadorSpinner from "../(componentes)/CargadorSpinner";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

// Este tipo define los elementos que consumen los componentes Legend, Pie & Tooltip de recharts.
// Es por eso que se definen en ingles.
type TDatosAgregadosEle = {
  name: string;
  color?: string;
  amount: number;
};

type TDatosAgregados = {
  [categoria: string]: TDatosAgregadosEle;
};

const Gastos = () => {
  const [indiceActivo, setIndiceActivo] = useState(0);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("All");
  const [fechaInicial, setFechaInicial] = useState("");
  const [fechaFinal, setFechaFinal] = useState("");

  const {
    data: datosGastosPorcategoria,
    isLoading,
    isError,
  } = useGetGastosPorCategoriaQuery();

  const gastos = useMemo(
    () => datosGastosPorcategoria ?? [],
    [datosGastosPorcategoria]
  );

  const convertirFecha = (stringFecha: string) => {
    const fecha = new Date(stringFecha);
    return fecha.toISOString().split("T")[0];
  };

  const datosAgregados: TDatosAgregadosEle[] = useMemo(() => {
    const filtrados: TDatosAgregados = gastos
      .filter((datos: IResumenGastoPorCategoria) => {
        const coincidenCategorias =
          categoriaSeleccionada === "Todas" ||
          datos.categoria === categoriaSeleccionada;
        const fechaDatos = convertirFecha(datos.fecha);
        const coincidenFechas =
          !fechaInicial ||
          !fechaFinal ||
          (fechaDatos >= fechaInicial && fechaDatos <= fechaFinal);
        return coincidenCategorias && coincidenFechas;
      })
      .reduce((acc: TDatosAgregados, datos: IResumenGastoPorCategoria) => {
        const monto = parseInt(datos.monto);
        if (!acc[datos.categoria]) {
          acc[datos.categoria] = { name: datos.categoria, amount: 0 };
          acc[datos.categoria].color = `#${Math.floor(
            Math.random() * 16777215
          ).toString(16)}`;
        }
        acc[datos.categoria].amount += monto;
        return acc;
      }, {});
    return Object.values(filtrados);
  }, [gastos, categoriaSeleccionada, fechaInicial, fechaFinal]);

  const classNames = {
    label: "block text-sm font-medium text-gray-700",
    selectInput:
      "mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md",
  };

  if (isLoading) {
    return (
      <div className="h-[80vh]">
        <CargadorSpinner />
      </div>
    );
  }

  if (isError || !datosGastosPorcategoria) {
    return (
      <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
        <div className="text-center text-red-500">
          <h2 className="text-lg font-semibold mb-2 px-7 pt-5">Atención:</h2>
          ¡Falló la obtención de gastos de la API!
          <br />
          Asegúrate de que el backend este funcionando
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* ENCABEZADO */}
      <div className="mb-5">
        <Encabezado nombre="Gastos" />
        <p className="text-sm text-gray-500">
          Representación visual de los gastos en el tiempo.
        </p>
      </div>

      {/* FILTROS */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div className="w-full md:w-1/3 bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold mb-4">
            Filtra por categoría y/o fecha
          </h3>
          <div className="space-y-4">
            {/* CATEGORIA*/}
            <div>
              <label htmlFor="categoria" className={classNames.label}>
                Categoría
              </label>
              <select
                id="categoria"
                name="categoria"
                className={classNames.selectInput}
                defaultValue="All"
                onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              >
                <option>Todas</option>
                <option>Office</option>
                <option>Professional</option>
                <option>Salaries</option>
              </select>
            </div>
            {/* FECHA INICIAL */}
            <div>
              <label htmlFor="fecha-inicial" className={classNames.label}>
                Fecha Inicial
              </label>
              <input
                type="date"
                id="fecha-inicial"
                name="fecha-inicial"
                className={classNames.selectInput}
                onChange={(e) => setFechaInicial(e.target.value)}
              />
            </div>
            {/* FECHA FINAL */}
            <div>
              <label htmlFor="fecha-final" className={classNames.label}>
                Fecha Final
              </label>
              <input
                type="date"
                id="fecha-final"
                name="fecha-final"
                className={classNames.selectInput}
                onChange={(e) => setFechaFinal(e.target.value)}
              />
            </div>
          </div>
        </div>
        {/* GRAFICO DE PASTEL */}
        <div className="flex-grow bg-white shadow rounded-lg p-4 md:p-6">
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={datosAgregados}
                cx="50%"
                cy="50%"
                label
                outerRadius={150}
                fill="#8884d8"
                dataKey="amount"
                onMouseEnter={(_, index) => setIndiceActivo(index)}
              >
                {datosAgregados.map(
                  (entry: TDatosAgregadosEle, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index === indiceActivo
                          ? "rgb(29, 78, 216)"
                          : entry.color
                      }
                    />
                  )
                )}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Gastos;
