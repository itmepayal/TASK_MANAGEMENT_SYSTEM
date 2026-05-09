import fs from "fs";
import { v2 as cloudinary } from "cloudinary";
import { serverConfig } from ".";
import logger from "@/config/logger.config";
import { AppError } from "@/middleware/error.middleware";
import status from "http-status";

cloudinary.config({
  cloud_name: serverConfig.CLOUDINARY_CLOUD_NAME!,
  api_key: serverConfig.CLOUDINARY_API_KEY!,
  api_secret: serverConfig.CLOUDINARY_API_SECRET!,
});

// =========================================
// TYPES
// =========================================
interface UploadOptions {
  folder?: string;
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "scale";
}

// =========================================
// UPLOAD IMAGE
// =========================================
export const uploadImage = async (
  filePath: string,
  options?: UploadOptions,
) => {
  try {
    logger.info(`CLOUDINARY_UPLOAD_START file=${filePath}`);

    if (!filePath || !fs.existsSync(filePath)) {
      throw new AppError("File not found", status.BAD_REQUEST);
    }

    const result = await cloudinary.uploader.upload(filePath, {
      folder: options?.folder || "uploads",
      transformation: options?.width
        ? [
            {
              width: options.width,
              height: options.height,
              crop: options.crop || "fill",
            },
          ]
        : undefined,
    });

    fs.unlinkSync(filePath);

    logger.info(`CLOUDINARY_UPLOAD_SUCCESS public_id=${result.public_id}`);

    return {
      public_id: result.public_id,
      url: result.secure_url,
    };
  } catch (error: any) {
    logger.error(
      `CLOUDINARY_UPLOAD_FAIL file=${filePath} error=${error?.message}`,
    );

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Image upload failed", status.INTERNAL_SERVER_ERROR);
  }
};

// =========================================
// DELETE IMAGE
// =========================================
export const deleteImage = async (publicId: string) => {
  try {
    logger.info(`CLOUDINARY_DELETE_START public_id=${publicId}`);

    if (!publicId) {
      throw new AppError("Public ID is required", status.BAD_REQUEST);
    }

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== "ok" && result.result !== "not found") {
      throw new AppError("Failed to delete image", status.BAD_GATEWAY);
    }

    logger.info(
      `CLOUDINARY_DELETE_SUCCESS public_id=${publicId} result=${result.result}`,
    );

    return result;
  } catch (error: any) {
    logger.error(
      `CLOUDINARY_DELETE_FAIL public_id=${publicId} error=${error?.message}`,
    );

    if (error instanceof AppError) {
      throw error;
    }

    throw new AppError("Image deletion failed", status.INTERNAL_SERVER_ERROR);
  }
};
