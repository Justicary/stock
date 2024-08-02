import { useGetMetricosDashboardQuery } from "@/estado/api";
import { TrendingUp } from "lucide-react";
import React, { useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CargadorSpinner from "../(componentes)/CargadorSpinner";

const TarjetaResumenVentas = () => {
  const { data, isLoading, isError } = useGetMetricosDashboardQuery();
  const datosVentas = data?.resumenVentas || [];

  const [periodicidad, setPeriodicidad] = useState("semanal");

  const sumaValorTotal =
    datosVentas.reduce((acc, curr) => acc + curr.valorTotal, 0) || 0;

  const averageChangePercentage =
    datosVentas.reduce((acc, curr, _, array) => {
      return acc + curr.porcentajeCambio! / array.length;
    }, 0) || 0;

  const datoValorMayor = datosVentas.reduce((acc, curr) => {
    return acc.valorTotal > curr.valorTotal ? acc : curr;
  }, datosVentas[0] || {});

  const fechaValorMayor = datoValorMayor.fecha
    ? new Date(datoValorMayor.fecha).toLocaleDateString("es-MX", {
        month: "numeric",
        day: "numeric",
        year: "2-digit",
      })
    : "N/A";

  if (isError) {
    return (
      <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
        <div className="text-center text-red-500">
          <h2 className="text-lg font-semibold mb-2 px-7 pt-5 text-white">
            Resumen de Ventas
          </h2>
          Falló la obtención de las datos de la API.
          <br />
          Asegúrate de que el backend este levantado.
        </div>
      </div>
    );
  }

  return (
    <div className="row-span-3 xl:row-span-6 bg-white shadow-md rounded-2xl flex flex-col justify-between">
      {isLoading ? (
        <CargadorSpinner />
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Resumen de Ventas
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="flex justify-between items-center mb-6 px-7 mt-5">
              <div className="text-lg font-medium">
                <p className="text-xs text-gray-400">Valor</p>
                <span className="text-2xl font-extrabold">
                  $
                  {(sumaValorTotal / 1000000).toLocaleString("es", {
                    maximumFractionDigits: 2,
                  })}
                  m
                </span>
                <span className="text-green-500 text-sm ml-2">
                  <TrendingUp className="inline w-4 h-4 mr-1" />
                  {averageChangePercentage.toFixed(2)}%
                </span>
              </div>
              <select
                className="shadow-sm border border-gray-300 bg-white p-2 rounded"
                value={periodicidad}
                onChange={(e) => {
                  setPeriodicidad(e.target.value);
                }}
              >
                <option value="diario">Diario</option>
                <option value="semanal">Semanal</option>
                <option value="mensual">Mensual</option>
              </select>
            </div>
            {/* CHART */}
            <ResponsiveContainer width="100%" height={350} className="px-7">
              <BarChart
                data={datosVentas}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="" vertical={false} />
                <XAxis
                  dataKey="fecha"
                  tickFormatter={(value) => {
                    const fecha = new Date(value);
                    return `${fecha.getMonth() + 1}/${fecha.getDate()}`;
                  }}
                />
                <YAxis
                  tickFormatter={(value) => {
                    return `$${(value / 1000000).toFixed(0)}m`;
                  }}
                  tick={{ fontSize: 12, dx: -1 }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("es-MX", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Bar
                  dataKey="valorTotal"
                  fill="#3182ce"
                  barSize={10}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* FOOTER */}
          <div>
            <hr />
            <div className="flex justify-between items-center mt-6 text-sm px-7 mb-4">
              <p>{datosVentas.length || 0} dias</p>
              <p className="text-sm">
                Fecha Mejores Ventas:{" "}
                <span className="font-bold">{fechaValorMayor}</span>
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TarjetaResumenVentas;
