import { Schema, model } from "mongoose";
import { interactionInterface } from "../interfaces/interaction";
import { getNextSequenceValue } from "../functions/getNextSequence";

const interactionSchema = new Schema<interactionInterface>({
    interaction_id: { 
        type: Number, 
        unique: true,
        default: async () => {
            return getNextSequenceValue("interaction");
        }
    },
    user_id: Number,
    collection_id: Number,
    timestamp: { 
        type: Date, 
        default: Date.now 
    },
    interaction_type: {
        type: String,
        default: ""
    },
    interaction_details: {
        type: String,
        default: ""
    },
});

export const interaction = model<interactionInterface>("Interaction", interactionSchema);
