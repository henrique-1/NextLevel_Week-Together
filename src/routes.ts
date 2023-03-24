import { Router } from "express";

const router = Router();

import { createUserController } from "./controllers/createUserController";
const CreateUserController = new createUserController();

import { createTagController } from "./controllers/createTagController";
const CreateTagController = new createTagController();

import { createComplimentController } from "./controllers/createComplimentController";
const CreateComplimentController = new createComplimentController();

router.post("/users", CreateUserController.handle);
router.post("/tags", CreateTagController.handle);
router.post("/compliments", CreateComplimentController.handle);

export { router };
