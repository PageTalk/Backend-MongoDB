import { Document } from "mongoose";

export interface queryInterface extends Document {
    query_id: { type: number; required: true; unique: true; default: () => Promise<number>; };
    user_id: number;
    pdf_id: number;
    query_text: string;
    query_response: string;
    query_timestamp: Date;
    response_timestamp: Date;
    is_answered: boolean;
}