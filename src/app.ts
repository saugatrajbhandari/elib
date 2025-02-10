import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello World!");
});

app.use("/api/users", userRouter);

app.get("/api/user", (req, res) => {
  res.json({ message: "hello" });
});
app.use(globalErrorHandler);

export default app;
