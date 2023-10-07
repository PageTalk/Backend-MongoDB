import { Schema, model } from "mongoose";
import {collectionInterface} from "../interfaces/collection";
import { getNextSequenceValue } from "../functions/getNextSequence";

const collectionSchema = new Schema<collectionInterface>({
    collection_id: Number,
    user_id: { type: Number, required: true },
    pdf_id: { type: Number, required: true },
    collection_name: String,
    collection_description: String,
    collection_timestamp: { 
        type: Date, 
        default: Date.now 
    },
});

collectionSchema.pre("save", async function (this: collectionInterface, next) {
    if(this.isNew) {
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

export const collection = model<collectionInterface>("Collection", collectionSchema);