import { NextFunction, Request, Response } from "express";
import { Prisma } from "../config/prisma";
import { ZodError } from "zod";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;
  let response;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    response = error?.message || error;
    const prismaErrors: { [key: string]: number } = {
      P2025: 404,
      P1001: 503,
      P2002: 409,
      P2003: 409,
    };
    for (let prismaError in prismaErrors) {
      if (prismaError == error.code) {
        statusCode = prismaErrors[prismaError];
        break;
      }
    }
  } else if (error instanceof ZodError) {
    statusCode = 400;
    response = error.issues;
  } else {
    statusCode = error?.statusCode || 500;
    response = error?.message || error;
  }
  res.status(statusCode).json({
    status: "FAILED",
    data: { error: response },
  });
};

export { errorHandler };
