import { Schema, model } from "mongoose";
import { interactionInterface } from "../interfaces/interaction";
import { getNextSequenceValue } from "../functions/getNextSequence";

const interactionSchema = new Schema<interactionInterface>({
    interaction_id: { 
        type: Number, 
        required: true,
        unique: true,
        default: async () => {
            return getNextSequenceValue("interaction");
        }
    },
    user_id: Number,
    collection_id: Number,
    timestamp: Date,
    interaction_type: String,
    interaction_details: String,
});

export const interaction = model<interactionInterface>("Interaction", interactionSchema);
