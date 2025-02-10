import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";
let newUser: User;

const createUser = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  //  validation

  if (!name || !email || !password) {
    const error = createHttpError(400, "All fields are required");
    return next(error);
  }

  // database call

  try {
    const user = await userModel.find({ email });

    console.log(user);

    if (user?.length > 0) {
      const error = createHttpError(400, "User already exists");
      return next(error);
    }
  } catch (error) {
    return next(createHttpError(500, "Error while getting user"));
  }

  //   password hash
  const hashedPassword = await bcrypt.hash(password, 10);

  //   create user

  try {
    newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });
  } catch (error) {
    return next(createHttpError(500, "Error while creating error"));
  }
  // token generation
  const token = sign(
    {
      sub: newUser._id,
    },
    config.jwtSecret as string,
    {
      expiresIn: "1d",
    }
  );
  // response
  res.json({
    status: "success",
    message: "User created successfully",
    accessToken: token,
  });
};

export { createUser };
