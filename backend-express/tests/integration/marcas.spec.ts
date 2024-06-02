import request from "supertest";

import { afterAll, beforeAll, describe, expect, it } from "@jest/globals";
import { prisma } from "../../src/config/prisma";

import { app } from "../../src/app";
import { primeraMarca, segundaMarca, terceraMarca } from "../utils/test_data";

beforeAll(async () => {
  await prisma.marcas.createMany({
    data: [primeraMarca, segundaMarca, terceraMarca],
  });
});

afterAll(async () => {
  await prisma.marcas.deleteMany();
  await prisma.$disconnect();
});

describe("endpoints", () => {
  describe("marcas endpoint", () => {
    describe("GET api/marcas", () => {
      it("should get all marcas", async () => {
        const res = await request(app)
          .get("/api/v1/marcas")
          .expect("Content-Type", /application\/json/)
          .expect(200);

        const contents = res.body.data.marcas;

        expect(res.statusCode).toBe(200);
        expect(contents).toHaveLength(3);
        expect(contents).toContainEqual(expect.objectContaining(primeraMarca));
        expect(contents).toContainEqual(expect.objectContaining(segundaMarca));
        expect(contents).toContainEqual(expect.objectContaining(terceraMarca));
      });
    });

    describe("GET api/marcas/:id", () => {
      it("should get a marca by its id", async () => {
        const idMarca = 1;
        const res = await request(app)
          .get(`/api/v1/marcas/${idMarca}`)
          .expect("Content-Type", /application\/json/)
          .expect(200);

        const contents = res.body.data.marca;

        expect(res.statusCode).toBe(200);
        expect(contents).toEqual(expect.objectContaining(primeraMarca));
      });
    });

    describe("POST api/marcas", () => {
      it("should create a new marca", async () => {
        const marcaPost = { estado: false, nombre: "marcaTestPost" };
        const res = await request(app)
          .post("/api/v1/marcas")
          .send(marcaPost)
          .expect("Content-Type", /application\/json/)
          .expect(200);

        const contents = res.body.data.marca;

        expect(res.statusCode).toBe(200);
        expect(contents).toEqual(expect.objectContaining(marcaPost));
      });
    });

    describe("PUT api/marcas/:id", () => {
      it("should update an existing marca", async () => {
        const idMarca = 2;
        const marcaPut = {
          id: idMarca,
          estado: true,
          nombre: "marcaTestUpdated",
        };
        const res = await request(app)
          .put(`/api/v1/marcas/${idMarca}`)
          .send(marcaPut)
          .expect("Content-Type", /application\/json/)
          .expect(200);

        const contents = res.body.data.marca;
        expect(res.statusCode).toBe(200);
        expect(contents).toEqual(marcaPut);
      });
    });

    describe("DELETE api/marcas:id", () => {
      it("should delete an existing marca and returned it", async () => {
        const idMarca = 3;
        const res = await request(app)
          .delete(`/api/v1/marcas/${idMarca}`)
          .expect("Content-Type", /application\/json/)
          .expect(200);

        const contents = res.body.data.marca;

        expect(res.statusCode).toBe(200);
        expect(contents).toEqual(expect.objectContaining(terceraMarca));
      });
    });
  });
});
