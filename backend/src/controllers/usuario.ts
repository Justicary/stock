import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUsuarios = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const usuarios = await prisma.usuarios.findMany();
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los usuarios..." });
  }
};
