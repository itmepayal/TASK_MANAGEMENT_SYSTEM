import { Router } from "express";
import { userRouter } from "@/modules/users/user.routes";
import { taskRouter } from "@/modules/tasks/task.route";

// =========================================
// ROUTER INITIALIZATION
// =========================================
const router = Router();

// =========================================
// ROUTE REGISTRATION
// =========================================
router.use("/users", userRouter);
router.use("/tasks", taskRouter);

// =========================================
// EXPORT ROUTER
// =========================================
export default router;
