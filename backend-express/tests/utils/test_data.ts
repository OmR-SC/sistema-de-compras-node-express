import { expect } from "@jest/globals";
import { Marca } from "../../src/types/api";

// Unit testing payloads

//Marcas

const marcaId = 2;

const marcasPayload = {
  id: marcaId,
  estado: true,
  nombre: "Marco",
};
const initialMarcasPayload = {
  estado: true,
  nombre: "Marco",
};

const expectedMarca = expect.objectContaining({
  id: expect.any(Number),
  estado: expect.any(Boolean),
  nombre: expect.any(String),
});

const expectedMarcas = expect.arrayContaining([
  expect.objectContaining({
    id: expect.any(Number),
    estado: expect.any(Boolean),
    nombre: expect.any(String),
  }),
]);

//Integration testing payloads

//Marcas

const primeraMarca: Omit<Marca, "id"> = { estado: false, nombre: "marcaTest1" };
const segundaMarca: Omit<Marca, "id"> = { estado: false, nombre: "marcaTest2" };
const terceraMarca: Omit<Marca, "id"> = { estado: false, nombre: "marcaTest3" };

export {
  marcaId,
  marcasPayload,
  initialMarcasPayload,
  expectedMarca,
  expectedMarcas,
  primeraMarca,
  segundaMarca,
  terceraMarca,
};
