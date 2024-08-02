import { PrismaClient } from "@prisma/client";
import { readFileSync } from "fs-extra";
import path from "path";
const prisma = new PrismaClient();

async function eliminarDatosBD(archivos: string[]) {
  const nombresModelos = archivos.map((archivo) => {
    const nombreModelo = path.basename(archivo, path.extname(archivo));
    return nombreModelo.charAt(0).toUpperCase() + nombreModelo.slice(1);
  });

  for (const nombreModelo of nombresModelos) {
    const modelo: any = prisma[nombreModelo as keyof typeof prisma];
    if (modelo) {
      await modelo.deleteMany({});
      console.log(`Se eliminaron todos los datos del modelo ${nombreModelo}.`);
    } else {
      console.error(
        `No se encontró el modelo ${nombreModelo}. Verifica su existencia en la BD.`
      );
    }
  }
}

async function main() {
  const directorioDatos = path.join(__dirname, "seedData");

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

  await eliminarDatosBD(archivosOrdenados);

  for (const archivo of archivosOrdenados) {
    const rutaArchivo = path.join(directorioDatos, archivo);
    const datosJson = JSON.parse(readFileSync(rutaArchivo, "utf-8"));
    const nombreModelo = path.basename(archivo, path.extname(archivo));
    const modelo: any = prisma[nombreModelo as keyof typeof prisma];

    if (!modelo) {
      console.error(
        `Ningun modelo de Prisma coincide con el archivo: ${archivo}.`
      );
      continue;
    }

    for (const datos of datosJson) {
      await modelo.create({
        data: datos,
      });
    }

    console.log(
      `Datos generados en ${nombreModelo} con los contenidos de ${archivo}.`
    );
  }
}

// Ejecuta el script
main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
