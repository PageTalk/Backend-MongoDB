import express from "express";
const router = express.Router();

import { uploadPDF, uploadForm, retrievePDF } from "../controllers/pdf";

router.route("/").get(uploadForm).post(uploadPDF);
router.route('/:username/all').get(retrievePDF);

export default router;

// TODO: Add PDF routes
