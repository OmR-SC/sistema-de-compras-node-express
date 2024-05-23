import { expect } from "@jest/globals";

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

export {
  marcaId,
  marcasPayload,
  initialMarcasPayload,
  expectedMarca,
  expectedMarcas,
};
