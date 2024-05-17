import { prisma } from "../config/prisma";
import { Marca } from "../types/api";

export const getAllMarcas = async (): Promise<Marca[] | []> =>
  await prisma.marcas.findMany();

export const getOneMarca = async (id: number): Promise<Marca> =>
  await prisma.marcas.findUniqueOrThrow({ where: { id: id } });

export const insertMarca = async (marca: Omit<Marca, "id">): Promise<Marca> => {
  const { nombre, estado } = marca;
  return await prisma.marcas.create({
    data: {
      nombre,
      estado,
    },
  });
};

export const updateMarca = async (marca: Marca, id: number): Promise<Marca> => {
  const { nombre, estado } = marca;
  return await prisma.marcas.update({
    where: { id: id },
    data: {
      nombre,
      estado,
    },
  });
};

export const removeMarca = async (id: number): Promise<Marca> => {
  return await prisma.marcas.delete({
    where: { id: id },
  });
};
