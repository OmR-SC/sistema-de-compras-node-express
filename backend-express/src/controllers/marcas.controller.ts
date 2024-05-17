import { Request, Response } from "express";
import { getAllMarcas, getOneMarca, insertMarca, removeMarca, updateMarca } from "../services/marcasService";

export const getMarcas = async (_req: Request, res: Response) => {
  try {
    const response = await getAllMarcas();
    res.status(200).json({
      status: "OK",
      data: { marcas: response },
    });
  } catch (error) {
    console.log(error);
  }
};

export const getMarca = async(req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const response = await getOneMarca(id);
    res.status(200).json({
      status: "OK",
      data: { marca: response },
    });
  } catch (error) {
    console.log(error);
    
  }
};

export const postMarca = async(req: Request, res: Response) => {
  try {
    const response = await insertMarca(req.body);
    res.status(200).json({
      status: "OK",
      data: { marca: response },
    });
  } catch (error) {
    console.log(error);
    
  }
};

export const putMarca = async(req: Request, res: Response) => {
  try {
    console.log(req.params.id);
    
    const id = parseInt(req.params.id)
    const response = await updateMarca(req.body,id);
    res.status(200).json({
      status: "OK",
      data: { marca: response },
    });
  } catch (error) {
    console.log(error);
    
  }
};

export const deleteMarca = async(req: Request, res: Response) => {
  try {
    const id = parseInt(req.params.id)
    const response = await removeMarca(id);
    res.status(200).json({
      status: "OK",
      data: { marca: response },
    });
  } catch (error) {
    console.log(error);
  }
};
