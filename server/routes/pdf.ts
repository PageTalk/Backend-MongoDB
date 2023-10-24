import express from "express";
const router = express.Router();

import {
    uploadPDF,
    uploadForm,
    retrievePDF,
    retrieveSinglePDF,
} from "../controllers/pdf";

router.route("/").get(uploadForm).post(uploadPDF);
router.route("/:username/all").get(retrievePDF);
router.route("/:username/:pdf_id").get(retrieveSinglePDF);

export default router;

// TODO: Add PDF routes
