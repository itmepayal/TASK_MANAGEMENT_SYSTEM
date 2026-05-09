import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Tasks
 *   description: Task management APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6821d2c1c8a45d98f1234567
 *
 *         text:
 *           type: string
 *           example: Complete backend API
 *
 *         description:
 *           type: string
 *           example: Finish authentication and task APIs
 *
 *         completed:
 *           type: boolean
 *           example: false
 *
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           example: high
 *
 *         progress:
 *           type: number
 *           example: 60
 *
 *         dueDate:
 *           type: string
 *           format: date-time
 *
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *
 *         assignedTo:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             avatar:
 *               type: string
 *
 *         createdBy:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             name:
 *               type: string
 *             email:
 *               type: string
 *             avatar:
 *               type: string
 *
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               publicId:
 *                 type: string
 *               fileName:
 *                 type: string
 *               fileType:
 *                 type: string
 *               fileSize:
 *                 type: number
 *
 *         todoCheckLists:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               completed:
 *                 type: boolean
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *         updatedAt:
 *           type: string
 *           format: date-time
 */

/**
 * @swagger
 * /api/tasks:
 *   get:
 *     summary: Get all tasks
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *         example: 1
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *         example: 10
 *
 *       - in: query
 *         name: completed
 *         schema:
 *           type: boolean
 *
 *       - in: query
 *         name: priority
 *         schema:
 *           type: string
 *           enum: [low, medium, high]
 *
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Tasks fetched successfully
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   get:
 *     summary: Get task by ID
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Task fetched successfully
 */

/**
 * @swagger
 * /api/tasks:
 *   post:
 *     summary: Create new task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - dueDate
 *               - createdBy
 *
 *             properties:
 *               text:
 *                 type: string
 *
 *               description:
 *                 type: string
 *
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *
 *               tags:
 *                 type: array
 *                 items:
 *                   type: string
 *
 *               assignedTo:
 *                 type: string
 *
 *               createdBy:
 *                 type: string
 *
 *     responses:
 *       201:
 *         description: Task created successfully
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   put:
 *     summary: Update task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               text:
 *                 type: string
 *
 *               description:
 *                 type: string
 *
 *               completed:
 *                 type: boolean
 *
 *               priority:
 *                 type: string
 *                 enum: [low, medium, high]
 *
 *               progress:
 *                 type: number
 *
 *               dueDate:
 *                 type: string
 *                 format: date-time
 *
 *     responses:
 *       200:
 *         description: Task updated successfully
 */

/**
 * @swagger
 * /api/tasks/{id}/status:
 *   patch:
 *     summary: Update task status
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - completed
 *
 *             properties:
 *               completed:
 *                 type: boolean
 *
 *     responses:
 *       200:
 *         description: Task status updated successfully
 */

/**
 * @swagger
 * /api/tasks/{id}/checklist:
 *   patch:
 *     summary: Update task checklist
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *
 *             properties:
 *               todoCheckLists:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     title:
 *                       type: string
 *
 *                     completed:
 *                       type: boolean
 *
 *     responses:
 *       200:
 *         description: Checklist updated successfully
 */

/**
 * @swagger
 * /api/tasks/{id}:
 *   delete:
 *     summary: Delete task
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: Task deleted successfully
 */

/**
 * @swagger
 * /api/tasks/user/{userId}:
 *   get:
 *     summary: Get tasks by user
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: User tasks fetched successfully
 */

/**
 * @swagger
 * /api/tasks/dashboard/overview:
 *   get:
 *     summary: Get dashboard overview
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Dashboard data fetched successfully
 */

/**
 * @swagger
 * /api/tasks/dashboard/user/{userId}:
 *   get:
 *     summary: Get user dashboard data
 *     tags: [Tasks]
 *     security:
 *       - bearerAuth: []
 *
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *
 *     responses:
 *       200:
 *         description: User dashboard data fetched successfully
 */

export default router;
