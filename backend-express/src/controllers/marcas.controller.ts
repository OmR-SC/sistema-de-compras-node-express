import { NextFunction, Request, Response } from "express";
import {
  getAllMarcas,
  getOneMarca,
  insertMarca,
  removeMarca,
  updateMarca,
} from "../services/marcasService";
import {
  CreateMarcasInput,
  RemoveMarcasInput,
  UpdateMarcasInput,
} from "../schemas/marca.schema";

export const getMarcas = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await getAllMarcas();
    res.status(200).json({
      status: "OK",
      data: { marcas: response },
    });
  } catch (error) {
    next(error);
  }
};

export const getMarca = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const response = await getOneMarca(id);
    res.status(200).json({
      status: "OK",
      data: { marca: response },
    });
  } catch (error) {
    next(error);
  }
};

export const postMarca = async (
  req: Request<{}, {}, CreateMarcasInput["body"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await insertMarca(req.body);
    res.status(200).json({
      status: "OK",
      data: { marca: response },
    });
  } catch (error) {
    next(error);
  }
};

export const putMarca = async (
  req: Request<UpdateMarcasInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const response = await updateMarca(req.body, id);
    res.status(200).json({
      status: "OK",
      data: { marca: response },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteMarca = async (
  req: Request<RemoveMarcasInput["params"]>,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const response = await removeMarca(id);
    res.status(200).json({
      status: "OK",
      data: { marca: response },
    });
  } catch (error) {
    next(error);
  }
};
