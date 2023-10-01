
import { Schema, model } from 'mongoose';
import { queryInterface } from '../interfaces/query';

const querySchema = new Schema<queryInterface>({
    query_id: { type: Number, required: true },
    user_id: { type: Number, required: true },
    pdf_id: { type: Number, required: true },
    query_text: { type: String, required: true },
    query_response: String,
    query_timestamp: { type: Date, required: true },
    response_timestamp: Date,
    is_answered: { type: Boolean, required: true },
});

export const query = model<queryInterface>('Query', querySchema);