import { useEffect, useState } from "react";
import { Marca } from "../../types/api";
import { getMarcas } from "../../pages/services/marcas";
import { MarcasContext } from "./MarcasContext";

interface Props {
  children: JSX.Element | JSX.Element[];
}

function MarcasProvider({ children }: Props) {
  const [marcas, setMarcas] = useState<Marca[]>([]);
  const [marca, setMarca] = useState<Marca>({
    id: 0,
    estado: false,
    nombre: "",
  } as Marca);

  useEffect(() => {
    (async () => {
      const response = await getMarcas();
      setMarcas((await response.json()).data.marcas as Marca[]);
    })();
  }, []);
  return (
    <MarcasContext.Provider value={{ marcas, setMarcas, marca, setMarca }}>
      {children}
    </MarcasContext.Provider>
  );
}

export default MarcasProvider;
