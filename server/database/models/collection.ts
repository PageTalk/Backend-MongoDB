import { Schema, model, Document } from "mongoose";
import { getNextSequenceValue } from "../../functions/getNextSequence";

export interface collectionInterface extends Document {
    collection_id: number;
    username: string;
    pdf_id: number;
    collection_name: string;
    collection_description: string;
    collection_timestamp: Date;
}

const collectionSchema = new Schema<collectionInterface>({
    collection_id: Number,
    username: { type: String, required: true },
    pdf_id: { type: Number, required: true },
    collection_name: String,
    collection_description: String,
    collection_timestamp: {
        type: Date,
        default: Date.now,
    },
});

collectionSchema.pre("save", async function (this: collectionInterface, next) {
    if (this.isNew) {
        try {
            const seqValue = await getNextSequenceValue("collection");
            this.collection_id = seqValue;
            next();
        } catch (error: any) {
            next(error);
        }
    } else {
        next();
    }
});

export const collection = model<collectionInterface>(
    "Collection",
    collectionSchema
);
