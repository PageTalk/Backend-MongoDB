import { Document } from "mongoose";

export interface queryInterface extends Document {
    query_id: number;
    username: string;
    pdf_id: number;
    query_text: string;
    query_response: string;
    query_timestamp: Date;
    response_timestamp: Date;
    is_answered: boolean;
}