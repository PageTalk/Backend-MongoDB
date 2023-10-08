import { Schema, model } from "mongoose";
import { pdfInterface } from "../interfaces/pdf";
import { getNextSequenceValue } from "../functions/getNextSequence";

const pdfSchema = new Schema<pdfInterface>({
    pdf_id: Number,
    username: { type: String, required: true },
    url: { type: String, required: true },
    title: { type: String, default: "" },
    description: String,
    upload_timestamp: { 
        type: Date, 
        default: Date.now
    },
    tokenized_text: { type: String, default: "" },
    pdf_metadata: {
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
    },
});

pdfSchema.pre("save", async function (this: pdfInterface, next) {
    if(this.isNew) {
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
