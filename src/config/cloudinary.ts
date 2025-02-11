import { v2 as cloudinary } from "cloudinary";
import { config } from "./config";

cloudinary.config({
  cloud_name: "poshilo",
  api_key: config.cloudinary_key,
  api_secret: config.cloudinary_secret,
});

export default cloudinary;
