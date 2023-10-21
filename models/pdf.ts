import { Schema, model, Document } from "mongoose";
import { getNextSequenceValue } from "../functions/getNextSequence";
export interface pdfInterface extends Document {
    username: string;
    user_id: Schema.Types.ObjectId;
    url: string;
    downloadURL: string;
    size: string;
    title: string;
    description: string;
    upload_timestamp: Date;
    tokenized_text: string;
    pdf_metadata: {
        created_at: Date;
        updated_at: Date;
    };
}

const pdfSchema = new Schema<pdfInterface>({
    username: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    url: { type: String, required: true },
    downloadURL: { type: String, required: true },
    size: { type: String, required: true },
    title: { type: String, default: "" },
    description: String,
    upload_timestamp: {
        type: Date,
        default: Date.now,
    },
    tokenized_text: { type: String, default: "" },
    pdf_metadata: {
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
    },
});

export const pdf = model<pdfInterface>("PDF", pdfSchema);
