import {
  deleteMarca,
  getMarca,
  getMarcas,
  postMarca,
  putMarca,
} from "../../controllers/marcas.controller";
import validateResource from "../../middlewares/validateResource";
import {
  createMarcaSchema,
  getMarcaSchema,
  removeMarcaSchema,
  updateMarcaSchema,
} from "../../schemas/marca.schema";

const { Router } = require("express");

export const route = Router();

/**
 * @openapi
 * /api/v1/marcas:
 *   get:
 *     summary: Get marcas
 *     description: Get all marcas
 *     tags:
 *       - Marcas
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                    marcas:
 *                      type: array
 *                      items:
 *                        $ref: "#/components/schemas/Marcas"
 *       500:
 *         description: "Error: Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/Error"
 *
 */

route.get("/marcas", getMarcas);

/**
 * @openapi
 * /api/v1/marcas/{id}:
 *   get:
 *     summary: Get marcas
 *     description: Get one marca
 *     parameters:
 *        - in: path
 *          name: id
 *          description: The id of marca
 *          required: true
 *          schema:
 *           type: integer
 *     tags:
 *       - Marcas
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                    marca:
 *                     $ref: "#/components/schemas/Marca"
 *       404:
 *         description: "Error: Not Found"
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/Error"
 *       500:
 *         description: "Error: Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/Error"
 *
 */

route.get("/marcas/:id", validateResource(getMarcaSchema), getMarca);

/**
 * @openapi
 * /api/v1/marcas:
 *   post:
 *      summary: Create a marca
 *      description: Create a new marca.
 *      tags:
 *       - Marcas
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/CreateMarca"
 *      responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                    marca:
 *                     $ref: "#/components/schemas/Marca"
 *       400:
 *         description: "Error: Bad Request"
 *         content:
 *           application/json:
 *            schema:
 *             $ref: "#/components/schemas/Error"
 *       404:
 *         description: "Error: Not Found"
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/Error"
 *       500:
 *         description: "Error: Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/Error"
 */

route.post("/marcas", validateResource(createMarcaSchema), postMarca);

/**
 * @openapi
 * /api/v1/marcas/{id}:
 *   put:
 *      summary: Update a marca
 *      description: Update a marca.
 *      parameters:
 *        - in: path
 *          name : id
 *          description: The id of marca
 *          required: true
 *          schema:
 *           type: integer
 *      tags:
 *       - Marcas
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: "#/components/schemas/UpdateMarca"
 *      responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                    marca:
 *                     $ref: "#/components/schemas/Marca"
 *       404:
 *         description: "Error: Not Found"
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/Error"
 *       500:
 *         description: "Error: Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/Error"
 *
 */

route.put("/marcas/:id", validateResource(updateMarcaSchema), putMarca);

/**
 * @openapi
 * /api/v1/marcas/{id}:
 *   delete:
 *      summary: Delete a marca
 *      description: Delete a marca.
 *      tags:
 *       - Marcas
 *      parameters:
 *        - in: path
 *          name: id
 *          description: The id of marca
 *          required: true
 *          schema:
 *           type: integer
 *      responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                    type: string
 *                    example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                    marca:
 *                     $ref: "#/components/schemas/Marca"
 *       404:
 *         description: "Error: Not Found"
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                $ref: "#/components/schemas/Error"
 *       500:
 *         description: "Error: Internal Server Error"
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               $ref: "#/components/schemas/Error"
 *
 */

route.delete("/marcas/:id", validateResource(removeMarcaSchema), deleteMarca);
