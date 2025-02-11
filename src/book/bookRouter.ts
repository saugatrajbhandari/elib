import express from "express";
import { createBook, updateBook } from "./bookController";

const bookRouter = express.Router();

bookRouter.post("/create-book", createBook);
bookRouter.patch("/update-book/:id", updateBook);

export default bookRouter;
