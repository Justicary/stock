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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs_extra_1 = require("fs-extra");
const path_1 = __importDefault(require("path"));
const prisma = new client_1.PrismaClient();
function eliminarDatosBD(archivos) {
    return __awaiter(this, void 0, void 0, function* () {
        const nombresModelos = archivos.map((archivo) => {
            const nombreModelo = path_1.default.basename(archivo, path_1.default.extname(archivo));
            return nombreModelo.charAt(0).toUpperCase() + nombreModelo.slice(1);
        });
        for (const nombreModelo of nombresModelos) {
            const modelo = prisma[nombreModelo];
            if (modelo) {
                yield modelo.deleteMany({});
                console.log(`Se eliminaron todos los datos del modelo ${nombreModelo}.`);
            }
            else {
                console.error(`No se encontró el modelo ${nombreModelo}. Verifica su existencia en la BD.`);
            }
        }
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const directorioDatos = path_1.default.join(__dirname, "seedData");
        // OJO: Es importante el orden de los archivos al crearlos, debido a las dependencias entre ellos.
        //      Por ejemplo, el archivo 'ventas.json' depende de 'productos.json'
        const archivosOrdenados = [
            "productos.json",
            "resumenGastos.json",
            "ventas.json",
            "resumenVentas.json",
            "compras.json",
            "resumenCompras.json",
            "usuarios.json",
            "gastos.json",
            "gastoPorCategoria.json",
        ];
        yield eliminarDatosBD(archivosOrdenados);
        for (const archivo of archivosOrdenados) {
            const rutaArchivo = path_1.default.join(directorioDatos, archivo);
            const datosJson = JSON.parse((0, fs_extra_1.readFileSync)(rutaArchivo, "utf-8"));
            const nombreModelo = path_1.default.basename(archivo, path_1.default.extname(archivo));
            const modelo = prisma[nombreModelo];
            if (!modelo) {
                console.error(`El modelo de Prisma NO coincide con el archivo: ${archivo}.`);
                continue;
            }
            for (const datos of datosJson) {
                yield modelo.create({
                    data: datos,
                });
            }
            console.log(`✔ Datos sembrados en ${nombreModelo} con los contenidos de ${archivo}.`);
        }
    });
}
// IMPORTANTE: Este script se ejecuta desde el package.json al escribir:
// pnpm seed ⏎
// El cual sube los datos muestra definidos en archivosOrdenados al modelo previamente definido y creado en
// prisma/schema.prisma
// OJO: En caso de errores, se podrán ver en la consola y seguramente obedecen a inconsistencias entre el modelo y los datos.
main()
    .catch((e) => {
    console.error(e);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
