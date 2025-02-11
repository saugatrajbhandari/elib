import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouter";
import multer from "multer";
import path from "node:path";
import authenticate from "./middlewares/authenticate";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World!");
});

export const upload = multer({
  dest: path.resolve(__dirname, "../public/data/uploads"),
  limits: { fieldSize: 30 * 1024 * 1024 },
});

app.use("/api/users", userRouter);
app.use(
  "/api/book",
  authenticate,
  upload.fields([
    { name: "coverImage", maxCount: 1 },
    { name: "file", maxCount: 1 },
  ]),
  bookRouter
);

app.get("/api/user", (req, res) => {
  res.json({ message: "hello" });
});
app.use(globalErrorHandler);

export default app;
