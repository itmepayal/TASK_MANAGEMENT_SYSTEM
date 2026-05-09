import { Router } from "express";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: User authentication and profile APIs
 */

/**
 * @swagger
 * components:
 *   schemas:
 *
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 6821d2c1c8a45d98f1234567
 *
 *         name:
 *           type: string
 *           example: Payal
 *
 *         email:
 *           type: string
 *           example: payal@gmail.com
 *
 *         role:
 *           type: string
 *           example: user
 *
 *         avatar:
 *           type: object
 *           properties:
 *             url:
 *               type: string
 *               example: https://res.cloudinary.com/demo/image/upload/avatar.jpg
 *
 *             publicId:
 *               type: string
 *               example: users/avatar_123
 *
 *         createdAt:
 *           type: string
 *           format: date-time
 *
 *         updatedAt:
 *           type: string
 *           format: date-time
 *
 *     RegisterInput:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *
 *       properties:
 *         name:
 *           type: string
 *           example: Payal
 *
 *         email:
 *           type: string
 *           example: payal@gmail.com
 *
 *         password:
 *           type: string
 *           example: Payal@123
 *
 *     LoginInput:
 *       type: object
 *       required:
 *         - email
 *         - password
 *
 *       properties:
 *         email:
 *           type: string
 *           example: payal@gmail.com
 *
 *         password:
 *           type: string
 *           example: Payal@123
 *
 *     UpdateProfileInput:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: Payal Sharma
 */

/**
 * @swagger
 * /api/users/register:
 *   post:
 *     summary: Register new user
 *     tags: [Users]
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterInput'
 *
 *     responses:
 *       201:
 *         description: User registered successfully
 *
 *       409:
 *         description: User already exists
 */

/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Login user
 *     tags: [Users]
 *
 *     requestBody:
 *       required: true
 *
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginInput'
 *
 *     responses:
 *       200:
 *         description: Login successful
 *
 *       401:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /api/users/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Logout successful
 */

/**
 * @swagger
 * /api/users/me:
 *   get:
 *     summary: Get current logged in user
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     responses:
 *       200:
 *         description: Current user fetched successfully
 *
 *   put:
 *     summary: Update current user profile
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *
 *     requestBody:
 *       required: false
 *
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *
 *             properties:
 *               name:
 *                 type: string
 *                 example: Payal Sharma
 *
 *               avatar:
 *                 type: string
 *                 format: binary
 *
 *     responses:
 *       200:
 *         description: Profile updated successfully
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
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
 *     responses:
 *       200:
 *         description: Users fetched successfully
 */

/**
 * @swagger
 * /api/users/{id}:
 *   delete:
 *     summary: Delete user
 *     tags: [Users]
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
 *         description: User deleted successfully
 *
 *       404:
 *         description: User not found
 */

export default router;
