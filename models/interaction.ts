import { Schema, model, Document } from "mongoose";
import { getNextSequenceValue } from "../functions/getNextSequence";

export interface interactionInterface extends Document {
    username: string;
    user_id: Schema.Types.ObjectId;
    timestamp: Date;
    interaction_type: string;
    interaction_details: string;
}

const interactionSchema = new Schema<interactionInterface>({
    username: String,
    user_id: { type: Schema.Types.ObjectId, ref: "User" },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    interaction_type: {
        type: String,
        default: "",
    },
    interaction_details: {
        type: String,
        default: "",
    },
});

export const interaction = model<interactionInterface>(
    "Interaction",
    interactionSchema
);
