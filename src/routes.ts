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

import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { ensureAdmin } from "./middleware/ensureAdmin";

router.post("/users", CreateUserController.handle);
router.post("/tags/:userId", ensureAuthenticated, ensureAdmin, CreateTagController.handle);
router.post("/login", AuthenticateUserController.handle);
router.post("/compliments/:userId", ensureAuthenticated, CreateComplimentController.handle);

export { router };
