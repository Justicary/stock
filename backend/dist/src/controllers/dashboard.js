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
exports.getMetricosDashboard = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getMetricosDashboard = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productosPopulares = yield prisma.productos.findMany({
            take: 15,
            orderBy: {
                existencias: "desc",
            },
        });
        const resumenVentas = yield prisma.resumenVentas.findMany({
            take: 5,
            orderBy: {
                fecha: "desc",
            },
        });
        const resumenCompras = yield prisma.resumenCompras.findMany({
            take: 5,
            orderBy: {
                fecha: "desc",
            },
        });
        const resumenGastos = yield prisma.resumenGastos.findMany({
            take: 5,
            orderBy: {
                fecha: "desc",
            },
        });
        const gastosXCategoriaCrudos = yield prisma.gastoPorCategoria.findMany({
            take: 5,
            orderBy: {
                fecha: "desc",
            },
        });
        const resumenGastosPorCategoria = gastosXCategoriaCrudos.map((item) => (Object.assign(Object.assign({}, item), { monto: item.monto.toString() })));
        res.json({
            productosPopulares,
            resumenVentas,
            resumenCompras,
            resumenGastos,
            resumenGastosPorCategoria,
        });
    }
    catch (error) {
        res
            .status(500)
            .json({ message: "Error al obtener los métricos del dashboard..." });
    }
});
exports.getMetricosDashboard = getMetricosDashboard;
