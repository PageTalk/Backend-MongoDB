import { Schema, model, Document } from "mongoose";

export interface sequenceInterface extends Document {
    collectionName: string;
    sequenceValue: number;
}

const sequenceSchema = new Schema<sequenceInterface>({
    collectionName: { type: String, required: true },
    sequenceValue: { type: Number, required: true },
});

export const sequence = model<sequenceInterface>("Sequence", sequenceSchema);
