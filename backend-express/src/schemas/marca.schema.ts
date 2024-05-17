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
