import { Request, Response } from "express";
import swaggerJSDoc, {
  OAS3Definition,
  OAS3Options,
  Options,
} from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition: OAS3Definition = {
  openapi: "3.0.0",
  info: {
    title: "Documentacion Sistema de Compras",
    version: "1.0.0",
  },
  servers: [
    {
      url: "http://localhost:3000/",
      description: "Development server",
    },
  ],
};

const swaggerOptions: OAS3Options = {
  swaggerDefinition,
  apis: ["./src/v1/routes/*.ts", "./src/schemas/*.ts"],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export const swaggerDocs = (app: Express, port: string) => {
  app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get("/api/v1/docs.json", (req: Request, res: Response) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/docs`
  );
};
