import express from "express";
const router = express.Router();

import {
    createUserMessage,
    createModelMessage,
    getMessagesByDocument,
} from "../controllers/message";

router.route("/user").post(createUserMessage);
router.route("/model").post(createModelMessage);
router.route("/:pdf_id").get(getMessagesByDocument);

export default router;
