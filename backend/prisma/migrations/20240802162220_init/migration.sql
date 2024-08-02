-- CreateTable
CREATE TABLE "Usuarios" (
    "usuarioId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("usuarioId")
);

-- CreateTable
CREATE TABLE "Productos" (
    "productoId" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "precio" DOUBLE PRECISION NOT NULL,
    "calificacion" DOUBLE PRECISION,
    "existencias" INTEGER NOT NULL,

    CONSTRAINT "Productos_pkey" PRIMARY KEY ("productoId")
);

-- CreateTable
CREATE TABLE "Ventas" (
    "ventaId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "precioUnitario" DOUBLE PRECISION NOT NULL,
    "montoTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Ventas_pkey" PRIMARY KEY ("ventaId")
);

-- CreateTable
CREATE TABLE "Compras" (
    "compraId" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,
    "cantidad" INTEGER NOT NULL,
    "costoUnitario" DOUBLE PRECISION NOT NULL,
    "costoTotal" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Compras_pkey" PRIMARY KEY ("compraId")
);

-- CreateTable
CREATE TABLE "Gastos" (
    "gastoId" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "monto" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Gastos_pkey" PRIMARY KEY ("gastoId")
);

-- CreateTable
CREATE TABLE "ResumenVentas" (
    "resumenVentaId" TEXT NOT NULL,
    "valorTotal" DOUBLE PRECISION NOT NULL,
    "porcentajeCambio" DOUBLE PRECISION,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumenVentas_pkey" PRIMARY KEY ("resumenVentaId")
);

-- CreateTable
CREATE TABLE "ResumenCompras" (
    "resumenCompraId" TEXT NOT NULL,
    "totalComprado" DOUBLE PRECISION NOT NULL,
    "porcentajeCambio" DOUBLE PRECISION,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumenCompras_pkey" PRIMARY KEY ("resumenCompraId")
);

-- CreateTable
CREATE TABLE "ResumenGastos" (
    "resumenGastoId" TEXT NOT NULL,
    "gastosTotales" DOUBLE PRECISION NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ResumenGastos_pkey" PRIMARY KEY ("resumenGastoId")
);

-- CreateTable
CREATE TABLE "GastoPorCategoria" (
    "gastoPorCategoriaId" TEXT NOT NULL,
    "resumenGastoId" TEXT NOT NULL,
    "categoria" TEXT NOT NULL,
    "monto" BIGINT NOT NULL,
    "fecha" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GastoPorCategoria_pkey" PRIMARY KEY ("gastoPorCategoriaId")
);

-- AddForeignKey
ALTER TABLE "Ventas" ADD CONSTRAINT "Ventas_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Productos"("productoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Compras" ADD CONSTRAINT "Compras_productoId_fkey" FOREIGN KEY ("productoId") REFERENCES "Productos"("productoId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GastoPorCategoria" ADD CONSTRAINT "GastoPorCategoria_resumenGastoId_fkey" FOREIGN KEY ("resumenGastoId") REFERENCES "ResumenGastos"("resumenGastoId") ON DELETE RESTRICT ON UPDATE CASCADE;
