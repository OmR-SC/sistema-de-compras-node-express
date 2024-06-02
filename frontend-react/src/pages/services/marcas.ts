import { API } from "../../constants";
import { Marca } from "../../types/api";

export const getMarcas = async () => {
    const res = await fetch(API + `/marcas`,{
      headers: {
        "Content-Type": "application/json"
      }
    });
    return (await res.json()).data.marcas as Marca[];
  }