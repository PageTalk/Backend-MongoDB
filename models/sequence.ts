import { Schema, model } from "mongoose";
import { sequenceInterface } from "../interfaces/sequence";

const sequenceSchema = new Schema<sequenceInterface>({
    collectionName: { type: String, required: true },
    sequenceValue: { type: Number, required: true },
});

export const sequence = model<sequenceInterface>("Sequence", sequenceSchema);