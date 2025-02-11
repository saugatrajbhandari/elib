import { NextFunction, Request, Response } from "express";
import cloudinary from "../config/cloudinary";
import path from "node:path";
import createHttpError from "http-errors";
import bookModel from "./bookModel";
import fs from "node:fs";

const createBook = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.files);
  const { title, genre } = req.body;

  const files = req.files as { [filename: string]: Express.Multer.File[] };

  const coverImageMimetype = files.coverImage[0].mimetype.split("/").at(-1);

  const fileName = files.coverImage[0].filename;

  const filePath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    fileName
  );

  const bookFileName = files.file[0].filename;
  const fileBookPath = path.resolve(
    __dirname,
    "../../public/data/uploads",
    bookFileName
  );

  try {
    const uploadResult = await cloudinary.uploader.upload(filePath, {
      filename_override: fileName,
      folder: "book-covers",
      format: coverImageMimetype,
    });

    const bookFileUploadResult = await cloudinary.uploader.upload(
      fileBookPath,
      {
        filename_override: fileName,
        folder: "book-files",
        resource_type: "raw",
        format: "pdf",
      }
    );

    const book = await bookModel.create({
      title,
      genre,
      coverImage: uploadResult.secure_url,
      file: bookFileUploadResult.secure_url,
      author: "dsfaafds",
    });

    // delete temp files
    await fs.promises.unlink(filePath);
    await fs.promises.unlink(fileBookPath);

    res.status(201).json({ id: book._id });
  } catch (error) {
    console.log(error);
    return next(createHttpError(500, "Error uploading files"));
  }
};

export { createBook };
