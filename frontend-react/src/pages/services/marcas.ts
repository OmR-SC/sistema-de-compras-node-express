import { API } from "../../constants";
import { Marca } from "../../types/api";

export const getMarcas = async () => {
  const res = await fetch(API + `/marcas`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res;
};

export const postMarca = async (marca: Omit<Marca, "id">) => {
  const res = await fetch(API + "/marcas/", {
    method: "POST",
    body: JSON.stringify(marca),
    headers: { "Content-Type": "application/json" },
  });
  return res;
};
