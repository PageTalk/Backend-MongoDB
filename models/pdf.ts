import { Schema, model, Document } from "mongoose";
import { getNextSequenceValue } from "../functions/getNextSequence";
export interface pdfInterface extends Document {
    pdf_id: number;
    username: string;
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
    pdf_id: Number,
    username: { type: String, required: true },
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

pdfSchema.pre("save", async function (this: pdfInterface, next) {
    if (this.isNew) {
        try {
            const seqValue = await getNextSequenceValue("pdf");
            this.pdf_id = seqValue;
            next();
        } catch (error: any) {
            next(error);
        }
    } else {
        next();
    }
});

export const pdf = model<pdfInterface>("PDF", pdfSchema);
