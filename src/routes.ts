import { Router } from "express";

const router = Router();

import { createUserController } from "./controllers/createUserController";
const CreateUserController = new createUserController();

import { createTagController } from "./controllers/createTagController";
const CreateTagController = new createTagController();

import { createComplimentController } from "./controllers/createComplimentController";
const CreateComplimentController = new createComplimentController();

import { authenticateUserController } from "./controllers/authenticateUserController";
const AuthenticateUserController = new authenticateUserController();

router.post("/users", CreateUserController.handle);
router.post("/tags", CreateTagController.handle);
router.post("/login", AuthenticateUserController.handle);
router.post("/compliments/:userId", CreateComplimentController.handle);

export { router };
