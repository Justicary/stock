"use client";

import {
  CheckCircle,
  Package,
  Tag,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import TarjetaResumenGastos from "./TarjetaResumenGastos";
import TarjetaProductosPopulares from "./TarjetaProductosPopulares";
import TarjetaComprasResumen from "./TarjetaComprasResumen";
import TarjetaResumenVentas from "./TarjetaResumenVentas";
import TarjetaEstadisticas from "./TarjetaEstadisticas";
type Props = {};

const Dashboard = (props: Props) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 xl:overflow-auto gap-10 pb-4 custom-grid-rows">
      <TarjetaProductosPopulares />
      <TarjetaResumenVentas />
      <TarjetaComprasResumen />
      <TarjetaResumenGastos />
      <TarjetaEstadisticas
        titulo="Clientes & Gastos"
        iconoPrimario={<Package className="text-blue-600 w-6 h-6" />}
        rangoFechas="22 - 29 Octubre 2023"
        detalles={[
          {
            titulo: "Clientes Crecimiento",
            monto: "175.00",
            cambiarPorcentaje: 131,
            ComponenteIcono: TrendingUp,
          },
          {
            titulo: "Gastos",
            monto: "10.00",
            cambiarPorcentaje: -56,
            ComponenteIcono: TrendingDown,
          },
        ]}
      />
      <TarjetaEstadisticas
        titulo="Vencimientos & Ordenes Pendientes"
        iconoPrimario={<CheckCircle className="text-blue-600 w-6 h-6" />}
        rangoFechas="22 - 29 Octubre 2023"
        detalles={[
          {
            titulo: "Vencimientos",
            monto: "250.00",
            cambiarPorcentaje: 131,
            ComponenteIcono: TrendingUp,
          },
          {
            titulo: "Ordenes Pendientes",
            monto: "147",
            cambiarPorcentaje: -56,
            ComponenteIcono: TrendingDown,
          },
        ]}
      />
      <TarjetaEstadisticas
        titulo="Ventas & Descuentos"
        iconoPrimario={<Tag className="text-blue-600 w-6 h-6" />}
        rangoFechas="22 - 29 Octubre 2023"
        detalles={[
          {
            titulo: "Ventas",
            monto: "1000.00",
            cambiarPorcentaje: 20,
            ComponenteIcono: TrendingUp,
          },
          {
            titulo: "Descuentos",
            monto: "200.00",
            cambiarPorcentaje: -10,
            ComponenteIcono: TrendingDown,
          },
        ]}
      />
    </div>
  );
};

export default Dashboard;
