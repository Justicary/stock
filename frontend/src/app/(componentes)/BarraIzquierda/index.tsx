"use client";

import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setBarraColapsada } from "@/estado";
import {
  Archive,
  CircleDollarSign,
  Clipboard,
  Layout,
  LucideIcon,
  Menu,
  SlidersHorizontal,
  User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface BarraIzqLigaProps {
  href: string;
  icono: LucideIcon;
  etiqueta: string;
  colapsada: boolean;
}

const BarraIzqLiga = ({
  href,
  icono: Icon,
  etiqueta,
  colapsada,
}: BarraIzqLigaProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`cursor-pointer flex items-center ${
          colapsada ? "justify-center py-4" : "justify-start px-8 py-4"
        }
        hover:text-blue-500 hover:bg-blue-100 gap-3 transition-colors ${
          isActive ? "bg-blue-200 text-white" : ""
        }
      }`}
      >
        <Icon className="w-6 h-6 !text-gray-700" />

        <span
          className={`${
            colapsada ? "hidden" : "block"
          } font-medium text-gray-700`}
        >
          {etiqueta}
        </span>
      </div>
    </Link>
  );
};

const BarraIzquierda = () => {
  const dispatch = useAppDispatch();
  const estaColapsada = useAppSelector((state) => state.global.barraColpsada);

  const alternaBarraIzquierda = () => {
    dispatch(setBarraColapsada(!estaColapsada));
  };

  const barraIzquierdaClassNames = `fixed flex flex-col ${
    estaColapsada ? "w-0 md:w-16" : "w-72 md:w-64"
  } bg-white transition-all duration-300 overflow-hidden h-full shadow-md z-40`;

  return (
    <div className={barraIzquierdaClassNames}>
      {/* LOGO SUPERIOR */}
      <div
        className={`flex gap-3 justify-between md:justify-normal items-center pt-8 ${
          estaColapsada ? "px-5" : "px-8"
        }`}
      >
        <Image
          src="https://s3-inventorymanagement.s3.us-east-2.amazonaws.com/logo.png"
          alt="stock-logo"
          width={27}
          height={27}
          className="rounded w-8"
        />
        <h1
          className={`${
            estaColapsada ? "hidden" : "block"
          } font-extrabold text-2xl`}
        >
          STOCK
        </h1>

        <button
          className="md:hidden px-3 py-3 bg-gray-100 rounded-full hover:bg-blue-100"
          onClick={alternaBarraIzquierda}
        >
          <Menu className="w-4 h-4" />
        </button>
      </div>

      {/* LIGAS DE NAVEGACION */}
      <div className="flex-grow mt-8">
        <BarraIzqLiga
          href="/dashboard"
          icono={Layout}
          etiqueta="Dashboard"
          colapsada={estaColapsada}
        />
        <BarraIzqLiga
          href="/inventario"
          icono={Archive}
          etiqueta="Inventario"
          colapsada={estaColapsada}
        />
        <BarraIzqLiga
          href="/productos"
          icono={Clipboard}
          etiqueta="Productos"
          colapsada={estaColapsada}
        />
        <BarraIzqLiga
          href="/usuarios"
          icono={User}
          etiqueta="Usuarios"
          colapsada={estaColapsada}
        />
        <BarraIzqLiga
          href="/configuracion"
          icono={SlidersHorizontal}
          etiqueta="Configuración"
          colapsada={estaColapsada}
        />
        <BarraIzqLiga
          href="/gastos"
          icono={CircleDollarSign}
          etiqueta="Gastos"
          colapsada={estaColapsada}
        />
      </div>

      {/* PIE DE PAGINA */}
      <div className={`${estaColapsada ? "hidden" : "block"} mb-10`}>
        <p className="text-center text-xs text-gray-500">
          &copy; 2024 Víctor Mancera
        </p>
      </div>
    </div>
  );
};

export default BarraIzquierda;
