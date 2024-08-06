"use client";

import * as React from "react";
import { ThemeProvider as ProveedorTemaNext } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";

// NOTA: No se está utilizando este "approach", ya que implementé el control para el tema claro/oscuro directamente en tailwind.config.ts
//       Para habilitar esta funcionalidad, basta con integrar el ProveedorTema al layout.tsx  abajo del body en lugar del DashboardWrapper.

export function ProveedorTema({ children, ...props }: ThemeProviderProps) {
  return <ProveedorTemaNext {...props}>{children}</ProveedorTemaNext>;
}
