"use client";

import React, { useState } from "react";
import Encabezado from "@/app/(componentes)/Encabezado";

type TConfigUsuario = {
  etiqueta: string;
  valor: string | boolean;
  tipo: "text" | "toggle";
};

const configuracionSimulada: TConfigUsuario[] = [
  { etiqueta: "Nombre usuario", valor: "justicary", tipo: "text" },
  { etiqueta: "Email", valor: "vemancera@gmail.com", tipo: "text" },
  { etiqueta: "Notificaciónes", valor: true, tipo: "toggle" },
  { etiqueta: "Modo Oscuro", valor: false, tipo: "toggle" },
  { etiqueta: "Lenguaje", valor: "Español", tipo: "text" },
];

const Configuracion = () => {
  const [configUsuario, setConfigUsuario] = useState<TConfigUsuario[]>(
    configuracionSimulada
  );

  const controlAlternaCambio = (index: number) => {
    const copiaConfig = [...configUsuario];
    copiaConfig[index].valor = !copiaConfig[index].valor as boolean;
    setConfigUsuario(copiaConfig);
  };

  return (
    <div className="w-full">
      <Encabezado nombre="Configuración del Usuario" />
      <div className="overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Configuración
              </th>
              <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                Valor
              </th>
            </tr>
          </thead>
          <tbody>
            {configUsuario.map((config, index) => (
              <tr className="hover:bg-blue-50" key={config.etiqueta}>
                <td className="py-2 px-4">{config.etiqueta}</td>
                <td className="py-2 px-4">
                  {config.tipo === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={config.valor as boolean}
                        onChange={() => controlAlternaCambio(index)}
                      />
                      <div
                        className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-blue-400 peer-focus:ring-4 
                        transition peer-checked:after:translate-x-full peer-checked:after:border-white 
                        after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white 
                        after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all
                        peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-lg text-gray-500 focus:outline-none focus:border-blue-500"
                      value={config.valor as string}
                      onChange={(e) => {
                        const settingsCopy = [...configUsuario];
                        settingsCopy[index].valor = e.target.value;
                        setConfigUsuario(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Configuracion;
