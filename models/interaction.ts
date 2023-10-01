import { Schema, model } from "mongoose";
import { interactionInterface } from "../interfaces/interaction";

const interactionSchema = new Schema<interactionInterface>({
    interaction_id: Number,
    user_id: Number,
    collection_id: Number,
    timestamp: Date,
    interaction_type: String,
    interaction_details: String,
});

export const interaction = model<interactionInterface>("Interaction", interactionSchema);
