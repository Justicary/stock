import React from "react";
import { LucideIcon } from "lucide-react";

type TDetalle = {
  titulo: string;
  monto: string;
  cambiarPorcentaje: number;
  ComponenteIcono: LucideIcon;
};

type TarjetaEstadisticasProps = {
  titulo: string;
  iconoPrimario: JSX.Element;
  detalles: TDetalle[];
  rangoFechas: string;
};

const TarjetaEstadisticas = ({
  titulo,
  iconoPrimario,
  detalles,
  rangoFechas,
}: TarjetaEstadisticasProps) => {
  const formatearPorcentaje = (valor: number) => {
    const signo = valor >= 0 ? "+" : "";
    return `${signo}${valor.toFixed()}%`;
  };

  const getCambioColor = (valor: number) =>
    valor >= 0 ? "text-green-500" : "text-red-500";

  return (
    <div className="md:row-span-1 xl:row-span-2 bg-white col-span-1 shadow-md rounded-2xl flex flex-col justify-between">
      {/* HEADER */}
      <div>
        <div className="flex justify-between items-center mb-2 px-5 pt-4">
          <h2 className="font-semibold text-lg text-gray-700">{titulo}</h2>
          <span className="text-xs text-gray-400">{rangoFechas}</span>
        </div>
        <hr />
      </div>

      {/* BODY */}
      <div className="flex mb-6 items-center justify-around gap-4 px-5">
        <div className="rounded-full p-5 bg-blue-50 border-sky-300 border-[1px]">
          {iconoPrimario}
        </div>
        <div className="flex-1">
          {detalles.map((detalle, i) => (
            <React.Fragment key={i}>
              <div className="flex items-center justify-between my-4">
                <span className="text-gray-500">{detalle.titulo}</span>
                <span className="font-bold text-gray-800">{detalle.monto}</span>
                <div className="flex items-center">
                  <detalle.ComponenteIcono
                    className={`w-4 h-4 mr-1 ${getCambioColor(
                      detalle.cambiarPorcentaje
                    )}`}
                  />

                  <span
                    className={`font-medium ${getCambioColor(
                      detalle.cambiarPorcentaje
                    )}`}
                  >
                    {formatearPorcentaje(detalle.cambiarPorcentaje)}
                  </span>
                </div>
              </div>
              {i < detalles.length - 1 && <hr />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TarjetaEstadisticas;
