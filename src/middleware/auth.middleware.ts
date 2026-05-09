import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import User from "@/models/user.model";
import { StatusCodes } from "http-status-codes";
import { ApiResponse } from "@/utils/apiResponse";
import { AppError } from "@/middleware/error.middleware";

/* =========================================================
PROTECTED ROUTE
========================================================= */
export const isProtected = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    let token;

    /* =========================================================
    GET TOKEN FROM COOKIE
    ========================================================= */
    if (req.cookies?.token) {
      token = req.cookies.token;
    } else if (
      /* =========================================================
    GET TOKEN FROM BEARER TOKEN
    ========================================================= */
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    /* =========================================================
    TOKEN NOT FOUND
    ========================================================= */
    if (!token) {
      throw new AppError("Please login first", StatusCodes.UNAUTHORIZED);
    }

    /* =========================================================
    VERIFY TOKEN
    ========================================================= */
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);

    /* =========================================================
    FIND USER
    ========================================================= */
    const user = await User.findById(decoded.id);

    if (!user) {
      throw new AppError("User not found", StatusCodes.NOT_FOUND);
    }

    req.user = user;

    next();
  } catch (error: any) {
    throw new AppError("Invalid token", StatusCodes.UNAUTHORIZED);
  }
};

/* =========================================================
ADMIN ONLY
========================================================= */
export const adminOnly = async (
  req: any,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Unauthorized access", StatusCodes.UNAUTHORIZED);
    }

    if (req.user.role !== "admin") {
      throw new AppError("Access denied. Admin only", StatusCodes.FORBIDDEN);
    }

    next();
  } catch (error: any) {
    throw new AppError(error.message, StatusCodes.FORBIDDEN);
  }
};
