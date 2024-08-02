import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface IProducto {
  productoId: string;
  nombre: string;
  precio: number;
  calificacion?: number;
  existencias: number;
}

export interface INuevoProducto {
  nombre: string;
  precio: number;
  calificacion?: number;
  existencias: number;
}

export interface IResumenVenta {
  resumenVentaId: string;
  valorTotal: number;
  porcentajeCambio?: number;
  fecha: string;
}

export interface IResumenCompra {
  resumenCompraId: string;
  totalComprado: number;
  porcentajeCambio?: number;
  fecha: string;
}

export interface IResumenGasto {
  resumenGastoId: string;
  gastosTotales: number;
  fecha: string;
}

export interface IResumenGastoPorCategoria {
  resumenGastoPorCategoriaId: string;
  categoria: string;
  monto: string;
  fecha: string;
}

export interface IDashboardMetrics {
  productosPopulares: IProducto[];
  resumenVentas: IResumenVenta[];
  resumenCompras: IResumenCompra[];
  resumenGastos: IResumenGasto[];
  resumenGastosPorCategoria: IResumenGastoPorCategoria[];
}

export interface IUsuario {
  usuarioId: string;
  nombre: string;
  email: string;
}

// Se crea el servicio a utilizar en la aplicación.
export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  reducerPath: "api",
  tagTypes: ["DashboardMetrics", "Productos", "Usuarios", "Gastos"],
  endpoints: (build) => ({
    getDashboardMetrics: build.query<IDashboardMetrics, void>({
      query: () => "/dashboard",
      providesTags: ["DashboardMetrics"],
    }),
    getProductos: build.query<IProducto[], string | void>({
      query: (search) => ({
        url: "/productos",
        params: search ? { search } : {},
      }),
      providesTags: ["Productos"],
    }),
    crearProducto: build.mutation<IProducto, INuevoProducto>({
      query: (nuevoProducto) => ({
        url: "/productos",
        method: "POST",
        body: nuevoProducto,
      }),
      invalidatesTags: ["Productos"],
    }),
    getUsuarios: build.query<IUsuario[], void>({
      query: () => "/usuarios",
      providesTags: ["Usuarios"],
    }),
    getGastosPorCategoria: build.query<IResumenGastoPorCategoria[], void>({
      query: () => "/gastos",
      providesTags: ["Gastos"],
    }),
  }),
});

// Deconstrucción de los endpoints generados por createApi.
export const {
  useGetDashboardMetricsQuery,
  useGetProductosQuery,
  useCrearProductoMutation,
  useGetUsuariosQuery,
  useGetGastosPorCategoriaQuery,
} = api;