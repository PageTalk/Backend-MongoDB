import { Schema, model } from "mongoose";
import { pdfInterface } from "../interfaces/pdf";

const pdfSchema = new Schema<pdfInterface>({
    pdf_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    url: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    upload_timestamp: { type: Date, required: true },
    tokenized_text: { type: String, required: true },
    pdf_metadata: {
        created_at: { type: Date, required: true },
        updated_at: { type: Date, required: true },
    },
});

export const pdf = model<pdfInterface>("Pdf", pdfSchema);
