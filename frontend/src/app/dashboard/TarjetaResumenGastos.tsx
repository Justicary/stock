import {
  IResumenGastoPorCategoria,
  useGetMetricosDashboardQuery,
} from "@/estado/api";
import { TrendingUp } from "lucide-react";
import CargadorSpinner from "../(componentes)/CargadorSpinner";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type TSumasGastos = {
  [categoria: string]: number;
};

const colores = ["#00C49F", "#0088FE", "#FFBB28"];

const TarjetaResumenGastos = () => {
  const { data: metricosDashboard, isLoading } = useGetMetricosDashboardQuery();

  const resumenGastos = metricosDashboard?.resumenGastos[0];

  const resumenGastosPorCategoria =
    metricosDashboard?.resumenGastosPorCategoria || [];

  const sumasGastos = resumenGastosPorCategoria.reduce(
    (acc: TSumasGastos, ele: IResumenGastoPorCategoria) => {
      const categoria = "Gastos de " + ele.categoria;
      const monto = parseInt(ele.monto, 10);
      if (!acc[categoria]) acc[categoria] = 0;
      acc[categoria] += monto;
      return acc;
    },
    {}
  );

  const categoriasGasto = Object.entries(sumasGastos).map(
    ([nombre, valor]) => ({
      nombre,
      valor,
    })
  );

  const gastosTotales = categoriasGasto.reduce(
    (acc, categoria: { valor: number }) => acc + categoria.valor,
    0
  );
  const gastosTotalesFormateados = gastosTotales.toFixed(2);

  return (
    <div className="row-span-3 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <CargadorSpinner />
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Resumen de Gastos
            </h2>
            <hr />
          </div>
          {/* BODY */}
          <div className="xl:flex justify-between pr-7">
            {/* CHART */}
            <div className="relative basis-3/5">
              <ResponsiveContainer width="100%" height={140}>
                <PieChart>
                  <Pie
                    data={categoriasGasto}
                    innerRadius={50}
                    outerRadius={60}
                    fill="#8884d8"
                    dataKey="valor"
                    nameKey="nombre"
                    cx="50%"
                    cy="50%"
                  >
                    {categoriasGasto.map((entry, i) => (
                      <Cell
                        key={`cell-${i}`}
                        fill={colores[i % colores.length]}
                      />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center basis-2/5">
                <span className="font-bold text-xl">
                  ${gastosTotalesFormateados}
                </span>
              </div>
            </div>
            {/* LABELS */}
            <ul className="flex flex-col justify-around items-center xl:items-start py-5 gap-3">
              {categoriasGasto.map((ele, i) => (
                <li key={`legend-${i}`} className="flex items-center text-xs">
                  <span
                    className="mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colores[i % colores.length] }}
                  ></span>
                  {ele.nombre}
                </li>
              ))}
            </ul>
          </div>
          {/* FOOTER */}
          <div>
            <hr />
            {resumenGastos && (
              <div className="mt-3 flex justify-between items-center px-7 mb-4">
                <div className="pt-2">
                  <p className="text-sm">
                    Promedio:{" "}
                    <span className="font-semibold">
                      ${resumenGastos.gastosTotales.toFixed(2)}
                    </span>
                  </p>
                </div>
                <span className="flex items-center mt-2">
                  <TrendingUp className="mr-2 text-green-500" />
                  30%
                </span>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TarjetaResumenGastos;
