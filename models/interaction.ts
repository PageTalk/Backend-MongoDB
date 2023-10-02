import { Schema, model } from "mongoose";
import { interactionInterface } from "../interfaces/interaction";
import { getNextSequenceValue } from "../functions/getNextSequence";

const interactionSchema = new Schema<interactionInterface>({
    interaction_id: Number,
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

interactionSchema.pre("save", async function (this: interactionInterface, next) {
    if(this.isNew) {
        try {
            const seqValue = await getNextSequenceValue("interaction");
            this.user_id = seqValue;
            next();
        } catch (error: any) {
            next(error);
        }
    } else {
        next();
    }
});

export const interaction = model<interactionInterface>("Interaction", interactionSchema);
