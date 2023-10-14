import { Schema, model, Document } from "mongoose";
import { getNextSequenceValue } from "../functions/getNextSequence";

export interface interactionInterface extends Document {
    interaction_id: number;
    username: string;
    collection_id: number;
    timestamp: Date;
    interaction_type: string;
    interaction_details: string;
}

const interactionSchema = new Schema<interactionInterface>({
    interaction_id: Number,
    username: String,
    collection_id: Number,
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

interactionSchema.pre(
    "save",
    async function (this: interactionInterface, next) {
        if (this.isNew) {
            try {
                const seqValue = await getNextSequenceValue("interaction");
                this.interaction_id = seqValue;
                next();
            } catch (error: any) {
                next(error);
            }
        } else {
            next();
        }
    }
);

export const interaction = model<interactionInterface>(
    "Interaction",
    interactionSchema
);
