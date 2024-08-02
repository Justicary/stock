import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getMetricosDashboard = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const productosPopulares = await prisma.productos.findMany({
      take: 15,
      orderBy: {
        existencias: "desc",
      },
    });
    const resumenVentas = await prisma.resumenVentas.findMany({
      take: 5,
      orderBy: {
        fecha: "desc",
      },
    });
    const resumenCompras = await prisma.resumenCompras.findMany({
      take: 5,
      orderBy: {
        fecha: "desc",
      },
    });
    const resumenGastos = await prisma.resumenGastos.findMany({
      take: 5,
      orderBy: {
        fecha: "desc",
      },
    });
    const gastosXCategoriaCrudos = await prisma.gastoPorCategoria.findMany({
      take: 5,
      orderBy: {
        fecha: "desc",
      },
    });
    const resumenGastosPorCategoria = gastosXCategoriaCrudos.map((item) => ({
      ...item,
      monto: item.monto.toString(),
    }));

    res.json({
      productosPopulares,
      resumenVentas,
      resumenCompras,
      resumenGastos,
      resumenGastosPorCategoria,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los métricos del dashboard..." });
  }
};
