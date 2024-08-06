"use client";

import React, { useEffect } from "react";
import { getMessages } from "next-intl/server";
import BarraNavegacion from "@/app/(componentes)/BarraNavegacion";
import BarraIzquierda from "@/app/(componentes)/BarraIzquierda";
import ProveedorRedux, { useAppSelector } from "@/app/redux";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const barraColapsada = useAppSelector((state) => state.global.barraColpsada);
  const modoOscuro = useAppSelector((state) => state.global.modoOscuro);

  useEffect(() => {
    if (modoOscuro) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.add("light");
    }
  });

  return (
    <div
      className={`${
        modoOscuro ? "dark" : "light"
      } flex bg-gray-50 text-gray-900 w-full min-h-screen`}
    >
      <BarraIzquierda />
      <main
        className={`flex flex-col w-full h-full py-5 px-8 bg-gray-50 ${
          barraColapsada ? "md:pl-24" : "md:pl-72"
        }`}
      >
        <BarraNavegacion />
        {children}
      </main>
    </div>
  );
};

const DashboardWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <ProveedorRedux>
      <DashboardLayout>{children}</DashboardLayout>
    </ProveedorRedux>
  );
};

export default DashboardWrapper;
