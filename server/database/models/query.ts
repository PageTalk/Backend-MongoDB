import { Schema, model, Document } from "mongoose";
import { getNextSequenceValue } from "../../functions/getNextSequence";

export interface queryInterface extends Document {
    username: string;
    user_id: Schema.Types.ObjectId;
    pdf_id: Schema.Types.ObjectId;
    query_text: string;
    query_response: string;
    query_timestamp: Date;
    response_timestamp: Date;
    is_answered: boolean;
}

const querySchema = new Schema<queryInterface>({
    username: { type: String, required: true },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
    pdf_id: { type: Schema.Types.ObjectId, ref: "PDF", required: true },
    query_text: { type: String, required: true },
    query_response: String,
    query_timestamp: { type: Date, default: Date.now },
    response_timestamp: {
        type: Date,
        default: null,
    },
    is_answered: { type: Boolean, default: false },
});

export const query = model<queryInterface>("Query", querySchema);
