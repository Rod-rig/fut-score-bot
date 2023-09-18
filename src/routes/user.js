import { Router } from "express";
import { userController } from "../controller/user.js";

const router = Router();

router.get("/users", userController.getUsers);
router.get("/users-full-info", userController.getUsersFullInfo);
router.get("/user/:id", userController.getUser);
router.post("/user", userController.createUser);
router.put("/user/:id", userController.updateUser);

export const userRouter = router;
