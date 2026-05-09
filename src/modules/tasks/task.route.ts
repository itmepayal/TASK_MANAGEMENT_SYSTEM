import express from "express";
import {
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  updateTaskStatus,
  updateTaskChecklist,
  deleteTask,
  getTasksByUser,
  getDashboardData,
  getDashboardUserData,
} from "@/modules/tasks/task.controller";
import { isProtected, adminOnly } from "@/middleware/auth.middleware";

export const taskRouter = express.Router();

/* =========================================================
TASK ROUTES
========================================================= */
taskRouter.use(isProtected);

/* =========================================================
GET ALL TASKS
========================================================= */
taskRouter.get("/", adminOnly, getTasks);

/* =========================================================
GET SINGLE TASK
========================================================= */
taskRouter.get("/:id", getTaskById);

/* =========================================================
CREATE TASK
========================================================= */
taskRouter.post("/", adminOnly, createTask);

/* =========================================================
UPDATE TASK
========================================================= */
taskRouter.put("/:id", updateTask);

/* =========================================================
UPDATE TASK STATUS
========================================================= */
taskRouter.patch("/:id/status", updateTaskStatus);

/* =========================================================
UPDATE TASK CHECKLIST
========================================================= */
taskRouter.patch("/:id/checklist", updateTaskChecklist);

/* =========================================================
DELETE TASK
========================================================= */
taskRouter.delete("/:id", adminOnly, deleteTask);

/* =========================================================
GET TASKS BY USER
========================================================= */
taskRouter.get("/user/:userId", getTasksByUser);

/* =========================================================
DASHBOARD ROUTES
========================================================= */
taskRouter.get("/dashboard/overview", adminOnly, getDashboardData);
taskRouter.get("/dashboard/user/:userId", getDashboardUserData);
