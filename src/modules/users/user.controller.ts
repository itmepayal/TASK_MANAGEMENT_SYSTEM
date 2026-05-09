import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as userService from "@/modules/users/user.service";
import { ApiResponse } from "@/utils/apiResponse";
import generateToken from "@/utils/generateToken";
import logger from "@/config/logger.config";
import { uploadImage, deleteImage } from "@/config/cloudinary.config";

/* =========================================================
REGISTER USER
========================================================= */
export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  const user: any = await userService.registerService(name, email, password);
  const token = generateToken(user._id.toString());

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  logger.info(`User registered: ${user.email}`);

  return res.status(StatusCodes.CREATED).json(
    ApiResponse.success("User registered successfully", {
      user,
      token,
    }),
  );
};

/* =========================================================
LOGIN USER
========================================================= */
export const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user: any = await userService.loginService(email, password);

  const token = generateToken(user._id.toString());

  res.cookie("token", token, {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  logger.info(`User login: ${user.email}`);

  return res.status(StatusCodes.OK).json(
    ApiResponse.success("Login successful", {
      user,
      token,
    }),
  );
};

/* =========================================================
LOGOUT USER
========================================================= */
export const logoutUser = async (req: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
  });

  logger.info("User logout");

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("Logout successful"));
};

/* =========================================================
GET CURRENT USER
========================================================= */
export const getCurrentUser = async (req: any, res: Response) => {
  const user = await userService.getCurrentUserService(req.user.id);

  logger.info(`Fetched current user: ${req.user.id}`);

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("Current user fetched successfully", user));
};

/* =========================================================
UPDATE PROFILE
========================================================= */
export const updateProfile = async (req: any, res: Response) => {
  const { name } = req.body;

  const currentUser = await userService.getCurrentUserService(req.user.id);

  let avatarData = currentUser.avatar || {
    url: "",
    publicId: "",
  };

  if (req.file?.path) {
    if (currentUser.avatar?.publicId) {
      await deleteImage(currentUser.avatar.publicId);
    }

    const uploadedImage = await uploadImage(req.file.path, {
      folder: "users",
      width: 300,
      height: 300,
      crop: "fill",
    });

    avatarData = {
      url: uploadedImage.url,
      publicId: uploadedImage.public_id,
    };
  }

  const user = await userService.updateProfileService(req.user.id, {
    name,
    avatar: avatarData,
  });

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("Profile updated successfully", user));
};

/* =========================================================
GET ALL USERS
========================================================= */
export const getAllUsers = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await userService.getAllUsers(page, limit);

  logger.info("Fetched all users", {
    page,
    limit,
  });

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("Users fetched successfully", result));
};

/* =========================================================
DELETE USER
========================================================= */
export const deleteUser = async (req: Request, res: Response) => {
  const userId = req.params.id as string;

  const user: any = await userService.deleteUser(userId);

  logger.warn(`User deleted: ${user.email}`);

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("User deleted successfully"));
};
