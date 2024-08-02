import {
  IResumenGastoPorCategoria,
  useGetDashboardMetricsQuery,
} from "@/estado/api";
import { TrendingUp } from "lucide-react";
import CargadorSpinner from "../(componentes)/CargadorSpinner";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

type TSumasGastos = {
  [category: string]: number;
};

const colores = ["#00C49F", "#0088FE", "#FFBB28"];

const TarjetaResumenGastos = () => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();

  const resumenGastos = dashboardMetrics?.resumenGastos[0];

  const resumenGastosPorCategoria =
    dashboardMetrics?.resumenGastosPorCategoria || [];

  const sumasGastos = resumenGastosPorCategoria.reduce(
    (acc: TSumasGastos, ele: IResumenGastoPorCategoria) => {
      const category = "Gastos de " + ele.categoria;
      const amount = parseInt(ele.monto, 10);
      if (!acc[category]) acc[category] = 0;
      acc[category] += amount;
      return acc;
    },
    {}
  );

  const categoriasGasto = Object.entries(sumasGastos).map(([name, value]) => ({
    name,
    value,
  }));

  const gastosTotales = categoriasGasto.reduce(
    (acc, category: { value: number }) => acc + category.value,
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
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                  >
                    {categoriasGasto.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={colores[index % colores.length]}
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
              {categoriasGasto.map((entry, index) => (
                <li
                  key={`legend-${index}`}
                  className="flex items-center text-xs"
                >
                  <span
                    className="mr-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: colores[index % colores.length] }}
                  ></span>
                  {entry.name}
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
                    Average:{" "}
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
