import mongoose from "mongoose";
import { User } from "./userTypes";

const userSchema = new mongoose.Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: {
        value: 6,
        message: "Password must be at least 6 characters long",
      },
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<User>("User", userSchema);
