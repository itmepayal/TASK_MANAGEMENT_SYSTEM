import path from "path";
import multer, { FileFilterCallback, StorageEngine } from "multer";
import { Request } from "express";
import { AppError } from "@/middleware/error.middleware";
import { StatusCodes } from "http-status-codes";

/* =========================================================
STORAGE CONFIG
========================================================= */
const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, "public/temp");
  },

  filename: (req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);

    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

/* =========================================================
FILE FILTER
========================================================= */
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback,
) => {
  const allowedMimeTypes = [
    "image/png",
    "image/jpg",
    "image/jpeg",
    "image/webp",
  ];

  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError("Only image files are allowed", StatusCodes.BAD_REQUEST));
  }
};

/* =========================================================
MULTER CONFIG
========================================================= */
export const upload = multer({
  storage,

  fileFilter,

  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
