import { createContext } from "react";
import { Marca } from "../../types/api";

interface Props {
  marcas: Marca[];
  setMarcas: Function;
  marca: Marca;
  setMarca: Function;
}

export const MarcasContext = createContext<Props>({} as Props);
