import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as taskService from "@/modules/tasks/task.service";
import { ApiResponse } from "@/utils/apiResponse";
import logger from "@/config/logger.config";

/* =========================================================
GET ALL TASKS
========================================================= */
export const getTasks = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const filters = {
    completed:
      req.query.completed !== undefined
        ? req.query.completed === "true"
        : undefined,

    priority: req.query.priority as "low" | "medium" | "high",

    search: req.query.search as string,

    assignedTo: req.query.assignedTo as string,

    createdBy: req.query.createdBy as string,
  };

  const result = await taskService.getAllTasks(page, limit, filters);

  logger.info("Fetched tasks successfully", {
    page,
    limit,
    filters,
  });

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("Tasks fetched successfully", result));
};

/* =========================================================
GET TASK BY ID
========================================================= */
export const getTaskById = async (req: Request, res: Response) => {
  const taskId = req.params.id as string;

  const task = await taskService.getTaskById(taskId);

  logger.info(`Fetched task: ${taskId}`);

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("Task fetched successfully", task));
};

/* =========================================================
CREATE TASK
========================================================= */
export const createTask = async (req: Request, res: Response) => {
  const task = await taskService.createTask(req.body);

  logger.info(`Task created: ${task?._id}`);

  return res
    .status(StatusCodes.CREATED)
    .json(ApiResponse.success("Task created successfully", task));
};

/* =========================================================
UPDATE TASK
========================================================= */
export const updateTask = async (req: Request, res: Response) => {
  const taskId = req.params.id as string;

  const task = await taskService.updateTask(taskId, req.body);

  logger.info(`Task updated: ${taskId}`);

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("Task updated successfully", task));
};

/* =========================================================
UPDATE TASK STATUS
========================================================= */
export const updateTaskStatus = async (req: Request, res: Response) => {
  const taskId = req.params.id as string;

  const { completed } = req.body;

  const task = await taskService.updateTaskStatus(taskId, completed);

  logger.info(`Task status updated: ${taskId}`);

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("Task status updated successfully", task));
};

/* =========================================================
UPDATE TASK CHECKLIST
========================================================= */
export const updateTaskChecklist = async (req: Request, res: Response) => {
  const taskId = req.params.id as string;

  const { todoCheckLists } = req.body;

  const task = await taskService.updateTaskChecklist(taskId, todoCheckLists);

  logger.info(`Task checklist updated: ${taskId}`);

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("Task checklist updated successfully", task));
};

/* =========================================================
DELETE TASK
========================================================= */
export const deleteTask = async (req: Request, res: Response) => {
  const taskId = req.params.id as string;

  await taskService.deleteTask(taskId);

  logger.warn(`Task deleted: ${taskId}`);

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("Task deleted successfully"));
};

/* =========================================================
GET TASKS BY USER
========================================================= */
export const getTasksByUser = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const result = await taskService.getTasksByUser(userId, page, limit);

  logger.info(`Fetched tasks for user: ${userId}`);

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("User tasks fetched successfully", result));
};

/* =========================================================
GET DASHBOARD DATA
========================================================= */
export const getDashboardData = async (req: Request, res: Response) => {
  const data = await taskService.getDashboardData();

  logger.info("Fetched dashboard data");

  return res
    .status(StatusCodes.OK)
    .json(ApiResponse.success("Dashboard data fetched successfully", data));
};

/* =========================================================
GET USER DASHBOARD DATA
========================================================= */
export const getDashboardUserData = async (req: Request, res: Response) => {
  const userId = req.params.userId as string;

  const data = await taskService.getDashboardUserData(userId);

  logger.info(`Fetched dashboard data for user: ${userId}`);

  return res
    .status(StatusCodes.OK)
    .json(
      ApiResponse.success("User dashboard data fetched successfully", data),
    );
};
