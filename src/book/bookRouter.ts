import express from "express";
import { createBook } from "./bookController";

const bookRouter = express.Router();

bookRouter.post("/create-book", createBook);

export default bookRouter;
