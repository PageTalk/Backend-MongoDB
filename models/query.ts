import { Schema, model } from "mongoose";
import { queryInterface } from "../interfaces/query";
import { getNextSequenceValue } from "../functions/getNextSequence";

const querySchema = new Schema<queryInterface>({
    query_id: {
        type: Number,
        unique: true,
        default: async () => {
            return getNextSequenceValue("query");
        },
    },
    user_id: { type: Number, required: true },
    pdf_id: { type: Number, required: true },
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
