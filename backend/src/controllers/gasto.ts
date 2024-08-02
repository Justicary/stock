import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGastosPorCategoria = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const resumenGastoXCatCrudo = await prisma.gastoPorCategoria.findMany({
      orderBy: {
        fecha: "desc",
      },
    });
    const resumenGastoPorCategoria = resumenGastoXCatCrudo.map((item) => ({
      ...item,
      monto: item.monto.toString(),
    }));

    res.json(resumenGastoPorCategoria);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los gastos..." });
  }
};
