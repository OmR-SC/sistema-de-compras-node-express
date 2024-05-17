import { errorHandler } from "./middlewares/error.handler";
import { route as marcas } from "./v1/routes/marcas.route";

const express = require("express");
require("dotenv").config();
const cors = require("cors");

export const app = express();

//Middleware's
app.use(express.json());
app.use(cors());

//Routes
app.use("/api/v1", marcas);

//Middlewares
app.use(errorHandler);
