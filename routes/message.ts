import express from "express";
const router = express.Router();

import { createUserMessage, createModelMessage } from "../controllers/message";

router.route("/user").post(createUserMessage);
router.route("/model").post(createModelMessage);

export default router;
