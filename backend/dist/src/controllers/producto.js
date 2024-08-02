"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearProducto = exports.getProductos = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const buscar = (_a = req.query.search) === null || _a === void 0 ? void 0 : _a.toString();
        const productos = yield prisma.productos.findMany({
            where: {
                nombre: {
                    contains: buscar,
                },
            },
        });
        res.json(productos);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener los productos..." });
    }
});
exports.getProductos = getProductos;
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productoId, nombre, precio, calificacion, existencias } = req.body;
        const producto = yield prisma.productos.create({
            data: {
                productoId,
                nombre,
                precio,
                calificacion,
                existencias,
            },
        });
        res.status(201).json(producto);
    }
    catch (error) {
        res.status(500).json({ message: "Error al crear el producto..." });
    }
});
exports.crearProducto = crearProducto;
