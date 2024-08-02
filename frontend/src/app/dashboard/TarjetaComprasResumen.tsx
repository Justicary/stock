import { useGetDashboardMetricsQuery } from "@/estado/api";
import { TrendingDown, TrendingUp } from "lucide-react";
import numeral from "numeral";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import CargadorSpinner from "../(componentes)/CargadorSpinner";

const CardPurchaseSummary = () => {
  const { data, isLoading } = useGetDashboardMetricsQuery();
  const datosCompras = data?.resumenCompras || [];

  const ultimoPuntoDatos = datosCompras[datosCompras.length - 1] || null;

  return (
    <div className="flex flex-col justify-between row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-white shadow-md rounded-2xl">
      {/* CARGANDO */}
      {isLoading ? (
        <CargadorSpinner />
      ) : (
        <>
          {/* HEADER */}
          <div>
            <h2 className="text-lg font-semibold mb-2 px-7 pt-5">
              Resumen de Compras
            </h2>
            <hr />
          </div>

          {/* BODY */}
          <div>
            {/* BODY HEADER */}
            <div className="mb-4 mt-7 px-7">
              <p className="text-xs text-gray-400">Comprado</p>
              <div className="flex items-center">
                <p className="text-2xl font-bold">
                  {ultimoPuntoDatos
                    ? numeral(ultimoPuntoDatos.totalComprado).format("$0.00a")
                    : "$0.00"}
                </p>
                {ultimoPuntoDatos && (
                  <p
                    className={`text-sm ${
                      ultimoPuntoDatos.porcentajeCambio! >= 0
                        ? "text-green-500"
                        : "text-red-500"
                    } flex ml-3`}
                  >
                    {ultimoPuntoDatos.porcentajeCambio! >= 0 ? (
                      <TrendingUp className="w-5 h-5 mr-1" />
                    ) : (
                      <TrendingDown className="w-5 h-5 mr-1" />
                    )}
                    {Math.abs(ultimoPuntoDatos.porcentajeCambio!)}%
                  </p>
                )}
              </div>
            </div>
            {/* CHART */}
            <ResponsiveContainer width="100%" height={200} className="p-2">
              <AreaChart
                data={datosCompras}
                margin={{ top: 0, right: 0, left: -50, bottom: 45 }}
              >
                <XAxis dataKey="date" tick={false} axisLine={false} />
                <YAxis tickLine={false} tick={false} axisLine={false} />
                <Tooltip
                  formatter={(value: number) => [
                    `$${value.toLocaleString("en")}`,
                  ]}
                  labelFormatter={(label) => {
                    const date = new Date(label);
                    return date.toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    });
                  }}
                />
                <Area
                  type="linear"
                  dataKey="totalPurchased"
                  stroke="#8884d8"
                  fill="#8884d8"
                  dot={true}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </div>
  );
};

export default CardPurchaseSummary;
