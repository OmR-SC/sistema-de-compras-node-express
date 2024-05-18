/**
 * @openapi
 * components:
 *   schemas:
 *     Marcas:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         estado:
 *           type: boolean
 *           example: true
 *         nombre:
 *           type: string
 *           example: Carlos
 *     Marca:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         estado:
 *           type: boolean
 *           example: true
 *         nombre:
 *           type: string
 *           example: Carlos
 *     CreateMarca:
 *       type: object
 *       required:
 *         - nombre
 *         - estado
 *       properties:
 *         estado:
 *           type: boolean
 *           example: true
 *         nombre:
 *           type: string
 *           example: Carlos
 *     UpdateMarca:
 *       type: object
 *       required:
 *         - id
 *         - nombre
 *         - estado
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         estado:
 *           type: boolean
 *           example: true
 *
 *         nombre:
 *           type: string
 *           example: Carlos
 *
 */

import { object, boolean, string, number, TypeOf } from "zod";

const payload = {
  estado: boolean({
    required_error: "El estado es requerido",
  }),
  nombre: string({
    required_error: "El nombre es requerido",
  })
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .max(30, "El nombre no debe exceder los 30 caracteres"),
};

const params = {
  id: string({
    required_error: "El id es requerido",
  })
    .regex(/^[1-9]\d*$/, "El id debe ser un número válido")
    .min(1, "El id no puede estar vacío"),
};

export const getMarcaSchema = object({
  params: object({
    ...params,
  }),
});

export const createMarcaSchema = object({
  body: object({ ...payload }),
});

export const updateMarcaSchema = object({
  body: object({
    ...payload,
    id: number({
      required_error: "El id es requerido",
    })
      .int("El id debe ser un número entero")
      .nonnegative("El id debe ser un número no negativo"),
  }),
  params: object({
    ...params,
  }),
}).refine((data) => data.body.id.toString() === data.params.id, {
  message: "Los IDs no concuerdan",
  path: ["body", "id"],
});

export const removeMarcaSchema = object({
  params: object({
    ...params,
  }),
});

export type GetMarcasInput = TypeOf<typeof getMarcaSchema>;

export type CreateMarcasInput = TypeOf<typeof createMarcaSchema>;

export type UpdateMarcasInput = TypeOf<typeof updateMarcaSchema>;

export type RemoveMarcasInput = TypeOf<typeof removeMarcaSchema>;
