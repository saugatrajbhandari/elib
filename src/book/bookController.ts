import { NextFunction, Request, Response } from "express";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.files);

  res.json({ message: "Hello" });
};

export { createBook };
