type EncabezadoProps = {
  nombre: string;
};

const Encabezado = ({ nombre }: EncabezadoProps) => {
  return <h1 className="text-2xl font-semibold text-gray-700">{nombre}</h1>;
};

export default Encabezado;
