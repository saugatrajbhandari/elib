import dotenv from "dotenv";

dotenv.config();

const _config = {
  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  env: process.env.NODE_ENV,
  jwtSecret: process.env.JWT_SECRET,
  cloudinary_secret: process.env.CLOUDINARY_API_SECRET,
  cloudinary_key: process.env.CLOUDINARY_API_KEY,
};

export const config = Object.freeze(_config);
