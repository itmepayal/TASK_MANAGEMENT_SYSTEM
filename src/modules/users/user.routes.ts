import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateProfile,
  getAllUsers,
  deleteUser,
} from "@/modules/users/user.controller";
import { isProtected, adminOnly } from "@/middleware/auth.middleware";
import { upload } from "@/middleware/multer.middleware";

/* =========================================================
USERS ROUTES
========================================================= */
export const userRouter = Router();

/* =========================================================
AUTH ROUTES
========================================================= */
userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);

/* =========================================================
CURRENT USER
========================================================= */
userRouter.get("/me", isProtected, getCurrentUser);

/* =========================================================
UPDATE PROFILE
========================================================= */
userRouter.put("/me", isProtected, upload.single("avatar"), updateProfile);

/* =========================================================
GET ALL USERS
========================================================= */
userRouter.get("/", isProtected, adminOnly, getAllUsers);

/* =========================================================
DELETE USER
========================================================= */
userRouter.delete("/:id", isProtected, adminOnly, deleteUser);

export default userRouter;
