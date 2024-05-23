import { describe, expect, it, jest } from "@jest/globals";
import { prisma } from "../../src/config/prisma";
import {
  deleteMarca,
  getMarca,
  getMarcas,
  postMarca,
  putMarca,
} from "../../src/controllers/marcas.controller";
import * as marcasService from "../../src/services/marcasService";
import {
  expectedMarca,
  expectedMarcas,
  initialMarcasPayload,
  marcaId,
  marcasPayload,
} from "../utils/test_data";

const mockRequest = {
  params: { id: 1 },
  body: { estado: true, nombre: "Marcos" },
};

const mockResponse: any = {
  status: jest.fn(() => mockResponse),
  json: jest.fn(() => mockResponse),
};

const mockNext = jest.fn();

jest.mock("../../src/services/marcasService");

jest.mock("../../src/config/prisma", () => {
  return {
    __esModule: true,
    ...(jest.requireActual("../../src/config/prisma") as {
      [key: string]: any;
    }),
    prisma: {
      marcas: {
        findMany: jest.fn(),
        findUniqueOrThrow: jest.fn(),
        create: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    },
  };
});

const mockPrisma = jest.mocked(prisma);

describe("marcas", () => {
  describe("marcas controller", () => {
    const mockMarcasService = jest.mocked(marcasService);
    describe("getMarcas", () => {
      describe("The service is working correctly", () => {
        it("should return all marcas", async () => {
          mockMarcasService.getAllMarcas.mockResolvedValueOnce([]);

          //@ts-ignore
          await getMarcas(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.status).toHaveBeenCalledTimes(1);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: { marcas: [] },
          });

          mockResponse.status.mockClear();
          mockResponse.json.mockClear();
          mockNext.mockClear();

          mockMarcasService.getAllMarcas.mockResolvedValueOnce([marcasPayload]);

          //@ts-ignore
          await getMarcas(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.status).toHaveBeenCalledTimes(1);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: { marcas: expectedMarcas },
          });
        });
      });
      describe("The service is not working correctly", () => {
        it("should call the mockNext function with the error as an argument", async () => {
          mockMarcasService.getAllMarcas.mockRejectedValueOnce(
            new Error("Service Error")
          );

          await expect(
            //@ts-ignore
            getMarcas(mockRequest, mockResponse, mockNext)
          ).resolves.toBeUndefined();
          expect(mockNext).toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
          expect(mockNext).toHaveBeenCalledTimes(1);
          expect(mockResponse.status).not.toHaveBeenCalled();
        });
      });
    });

    describe("getMarca", () => {
      describe("the service is working correctly", () => {
        it("should return the marca", async () => {
          mockMarcasService.getOneMarca.mockResolvedValueOnce(marcasPayload);

          //@ts-ignore
          await getMarca(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.status).toHaveBeenCalledTimes(1);

          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: {
              marca: expectedMarca,
            },
          });
        });
      });

      describe("the service has rejected the request", () => {
        it("should call the mockNext function with the error as an argument", async () => {
          mockMarcasService.getOneMarca.mockRejectedValueOnce(
            new Error("Service Error")
          );
          await expect(
            //@ts-ignore
            getMarca(mockRequest, mockResponse, mockNext)
          ).resolves.toBeUndefined();
          expect(mockNext).toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
          expect(mockNext).toHaveBeenCalledTimes(1);
          expect(mockResponse.status).not.toHaveBeenCalled();
        });
      });
    });

    describe("postMarca", () => {
      describe("given marca has been accepted by the service", () => {
        it("should create a marca", async () => {
          mockMarcasService.insertMarca.mockResolvedValueOnce(marcasPayload);
          //@ts-ignore
          await postMarca(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledTimes(1);
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: {
              marca: expectedMarca,
            },
          });
        });
      });
      describe("given marca has been rejected by the service", () => {
        it("should call the mockNext function with the error as an argument", async () => {
          mockMarcasService.insertMarca.mockRejectedValueOnce(
            new Error("Service Error")
          );
          await expect(
            //@ts-ignore
            postMarca(mockRequest, mockResponse, mockNext)
          ).resolves.toBeUndefined();
          expect(mockNext).toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
          expect(mockNext).toHaveBeenCalledTimes(1);
          expect(mockResponse.status).not.toHaveBeenCalled();
        });
      });
    });
    describe("putMarca", () => {
      describe("given marca has been accepted by the server", () => {
        it("should update the marca", async () => {
          mockMarcasService.updateMarca.mockResolvedValueOnce(marcasPayload);
          //@ts-ignore
          await putMarca(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledTimes(1);
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: {
              marca: expectedMarca,
            },
          });
        });
      });
      describe("given marca has been rejected by the service", () => {
        it("should call the mockNext function with the error as an argument", async () => {
          mockMarcasService.updateMarca.mockRejectedValueOnce(
            new Error("Service Error")
          );
          await expect(
            //@ts-ignore
            putMarca(mockRequest, mockResponse, mockNext)
          ).resolves.toBeUndefined();
          expect(mockNext).toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
          expect(mockNext).toHaveBeenCalledTimes(1);
          expect(mockResponse.status).not.toHaveBeenCalled();
        });
      });
    });
    describe("deleteMarca", () => {
      describe("the service has accepted the request", () => {
        it("should return the deleted marca", async () => {
          mockMarcasService.removeMarca.mockResolvedValueOnce(marcasPayload);
          //@ts-ignore
          await deleteMarca(mockRequest, mockResponse, mockNext);
          expect(mockNext).not.toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalled();
          expect(mockResponse.status).toHaveBeenCalledWith(200);
          expect(mockResponse.status).toHaveBeenCalledTimes(1);
          expect(mockResponse.json).toHaveBeenCalledWith({
            status: "OK",
            data: {
              marca: expectedMarca,
            },
          });
        });
      });
      describe("the service has rejected the request", () => {
        it("should call the mockNext function with the error as an argument", async () => {
          mockMarcasService.removeMarca.mockRejectedValueOnce(
            new Error("Service Error")
          );
          await expect(
            //@ts-ignore
            deleteMarca(mockRequest, mockResponse, mockNext)
          ).resolves.toBeUndefined();
          expect(mockNext).toHaveBeenCalled();
          expect(mockNext).toHaveBeenCalledWith(expect.any(Error));
          expect(mockNext).toHaveBeenCalledTimes(1);
          expect(mockResponse.status).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe("marcas service", () => {
    const marcasService: typeof import("../../src/services/marcasService") =
      jest.requireActual("../../src/services/marcasService");
    describe("getAllMarcas", () => {
      describe("the prisma ORM has accepted the request", () => {
        it("should return all marcas", async () => {
          mockPrisma.marcas.findMany.mockResolvedValueOnce([marcasPayload]);
          const response = await marcasService.getAllMarcas();
          expect(mockPrisma.marcas.findMany).toHaveBeenCalled();
          expect(mockPrisma.marcas.findMany).toHaveBeenCalledTimes(1);
          expect(response).toEqual(expectedMarcas);
        });
      });

      describe("the prisma ORM has rejected the request", () => {
        it("should throw an exception", async () => {
          mockPrisma.marcas.findMany.mockRejectedValueOnce(
            new Error("Prisma Error")
          );
          await expect(marcasService.getAllMarcas()).rejects.toThrow(
            new Error("Prisma Error")
          );
          expect(mockPrisma.marcas.findMany).toHaveBeenCalled();
          expect(mockPrisma.marcas.findMany).toHaveBeenCalledTimes(1);
        });
      });
    });

    describe("getOneMarca", () => {
      describe("the prisma ORM has accepted the request", () => {
        it("should return the marca", async () => {
          mockPrisma.marcas.findUniqueOrThrow.mockResolvedValueOnce(
            marcasPayload
          );
          const response = await marcasService.getOneMarca(marcaId);
          expect(mockPrisma.marcas.findUniqueOrThrow).toHaveBeenCalled();
          expect(mockPrisma.marcas.findUniqueOrThrow).toHaveBeenCalledWith(
            expect.objectContaining({ where: { id: marcaId } })
          );
          expect(mockPrisma.marcas.findUniqueOrThrow).toHaveBeenCalledTimes(1);
          expect(response).toEqual(expectedMarca);
        });
      });

      describe("the prisma ORM has rejected the request", () => {
        it("should throw an exception", async () => {
          mockPrisma.marcas.findUniqueOrThrow.mockRejectedValueOnce(
            new Error("Prisma Error")
          );
          await expect(
            marcasService.getOneMarca(Number.MAX_SAFE_INTEGER)
          ).rejects.toThrow(new Error("Prisma Error"));
          expect(mockPrisma.marcas.findUniqueOrThrow).toHaveBeenCalled();
          expect(mockPrisma.marcas.findUniqueOrThrow).toHaveBeenCalledWith(
            expect.objectContaining({
              where: {
                id: Number.MAX_SAFE_INTEGER,
              },
            })
          );
          expect(mockPrisma.marcas.findUniqueOrThrow).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe("insertMarca", () => {
      describe("given marca has been accepted by the ORM", () => {
        it("should create the marca", async () => {
          mockPrisma.marcas.create.mockResolvedValueOnce(marcasPayload);
          const response = await marcasService.insertMarca(
            initialMarcasPayload
          );
          expect(mockPrisma.marcas.create).toHaveBeenCalled();
          expect(mockPrisma.marcas.create).toHaveBeenCalledWith(
            expect.objectContaining({
              data: {
                estado: expect.any(Boolean),
                nombre: expect.any(String),
              },
            })
          );
          expect(mockPrisma.marcas.create).toHaveBeenCalledTimes(1);

          expect(response).toEqual(expectedMarca);
        });
      });
      describe("given marca has been rejected by the ORM", () => {
        it("should throw an exception", async () => {
          mockPrisma.marcas.create.mockRejectedValueOnce(
            new Error("Prisma Error")
          );

          await expect(
            marcasService.insertMarca(initialMarcasPayload)
          ).rejects.toThrow(new Error("Prisma Error"));
          expect(mockPrisma.marcas.create).toHaveBeenCalled();
          expect(mockPrisma.marcas.create).toHaveBeenCalledWith(
            expect.objectContaining({
              data: expect.objectContaining({
                estado: expect.any(Boolean),
                nombre: expect.any(String),
              }),
            })
          );
          expect(prisma.marcas.create).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe("updateMarca", () => {
      describe("given marca has been accepted by the ORM", () => {
        it("should update the marca", async () => {
          mockPrisma.marcas.update.mockResolvedValueOnce(marcasPayload);

          const response = await marcasService.updateMarca(
            marcasPayload,
            marcaId
          );
          expect(mockPrisma.marcas.update).toHaveBeenCalled();
          expect(mockPrisma.marcas.update).toHaveBeenCalledWith(
            expect.objectContaining({
              where: {
                id: marcasPayload.id,
              },
              data: expect.objectContaining({
                nombre: expect.any(String),
                estado: expect.any(Boolean),
              }),
            })
          );
          expect(mockPrisma.marcas.update).toHaveBeenCalledTimes(1);

          expect(response).toEqual(expectedMarca);
        });
      });
      describe("given marca has been rejected by the ORM", () => {
        it("should throw an exception", async () => {
          mockPrisma.marcas.update.mockRejectedValueOnce(
            new Error("Prisma Error")
          );
          await expect(
            marcasService.updateMarca(marcasPayload, marcaId)
          ).rejects.toThrow(new Error("Prisma Error"));
          expect(mockPrisma.marcas.update).toHaveBeenCalled();
          expect(mockPrisma.marcas.update).toHaveBeenCalledWith(
            expect.objectContaining({
              where: {
                id: marcasPayload.id,
              },
              data: expect.objectContaining({
                nombre: expect.any(String),
                estado: expect.any(Boolean),
              }),
            })
          );
          expect(mockPrisma.marcas.update).toHaveBeenCalledTimes(1);
        });
      });
    });
    describe("removeMarca", () => {
      describe("the prisma ORM has accepted the request", () => {
        it("should return the deleted marca", async () => {
          mockPrisma.marcas.delete.mockResolvedValueOnce(marcasPayload);

          const response = await marcasService.removeMarca(marcaId);
          expect(mockPrisma.marcas.delete).toHaveBeenCalled();
          expect(mockPrisma.marcas.delete).toHaveBeenCalledWith(
            expect.objectContaining({
              where: {
                id: marcaId,
              },
            })
          );
          expect(mockPrisma.marcas.delete).toHaveBeenCalledTimes(1);
          expect(response).toEqual(expectedMarca);
        });
      });

      describe("the prisma ORM has rejected the request", () => {
        it("should throw an exception", async () => {
          mockPrisma.marcas.delete.mockRejectedValueOnce(
            new Error("Prisma Error")
          );

          await expect(marcasService.removeMarca(marcaId)).rejects.toThrow(
            new Error("Prisma Error")
          );
          expect(mockPrisma.marcas.delete).toHaveBeenCalled();
          expect(mockPrisma.marcas.delete).toHaveBeenCalledWith(
            expect.objectContaining({
              where: {
                id: marcaId,
              },
            })
          );
          expect(mockPrisma.marcas.delete).toHaveBeenCalledTimes(1);
        });
      });
    });
  });
});
