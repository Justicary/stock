import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProductos = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const buscar = req.query.search?.toString();
    const productos = await prisma.productos.findMany({
      where: {
        nombre: {
          contains: buscar,
        },
      },
    });
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos..." });
  }
};

export const crearProducto = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { productoId, nombre, precio, calificacion, existencias } = req.body;
    const producto = await prisma.productos.create({
      data: {
        productoId,
        nombre,
        precio,
        calificacion,
        existencias,
      },
    });
    res.status(201).json(producto);
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto..." });
  }
};
