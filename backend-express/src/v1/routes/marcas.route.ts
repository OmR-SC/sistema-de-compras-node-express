import { getMarcas } from "../../controllers/marcas.controller";

const { Router } = require("express");

export const route = Router();

route.get("/marcas", getMarcas);
