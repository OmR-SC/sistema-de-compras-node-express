import { NextFunction, Request, Response } from "express";
import { Prisma } from "../config/prisma";

const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = 500;

  if (error instanceof Prisma.PrismaClientKnownRequestError) {
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
  }
  res.status(statusCode).json({
    status: "FAILED",
    data: { error },
  });
};

export { errorHandler };
