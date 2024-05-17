import {
  deleteMarca,
  getMarca,
  getMarcas,
  postMarca,
  putMarca,
} from "../../controllers/marcas.controller";

const { Router } = require("express");

export const route = Router();

route.get("/marcas", getMarcas);

route.get("/marcas/:id", getMarca);

route.post("/marcas", postMarca);

route.put("/marcas/:id", putMarca);

route.delete("/marcas/:id", deleteMarca);
