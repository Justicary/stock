import { useTranslations } from "next-intl";
const CargadorPuntos = () => {
  const t = useTranslations();
  return (
    <div className="flex space-x-4 justify-center items-center h-[85vh] dark:invert">
      <span className="sr-only">{t("1.cargando")}</span>
      <div className="h-12 w-12 bg-black rounded-full animate-bounce [animation-delay:-0.3s]"></div>
      <div className="h-12 w-12 bg-black rounded-full animate-bounce [animation-delay:-0.15s]"></div>
      <div className="h-12 w-12 bg-black rounded-full animate-bounce"></div>
    </div>
  );
};

export default CargadorPuntos;
