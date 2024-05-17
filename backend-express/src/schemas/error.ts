/**
 * @openapi
 * components:
 *   schemas:
 *     Error:
 *      type: object
 *      properties:
 *       status:
 *        type: string
 *        enum: [FAILED]
 *        description: "The status of the response."
 *        example: FAILED
 *       data:
 *         type: object
 *         properties:
 *           error:
 *             type: string
 *             example: error message
 *
 * */
