import express, { NextFunction, Request, Response } from "express";
import createHttpError, { HttpError } from "http-errors";
import { config } from "./config/config";
import { globalErrorHandler } from "./middlewares/globalErrorHandler";

const app = express();

app.get("/", (req, res) => {
  // throw new Error("Something went wrong!");

  const error = createHttpError(400, "something went wrong!");
  throw error;
  res.json("Hello World!");
});

//global error handler
app.use(globalErrorHandler);

export default app;
