import { Document } from "mongoose";

export interface pdfInterface extends Document {
    pdf_id: number;
    username: string;
    url: string;
    title: string;
    description: string;
    upload_timestamp: Date;
    tokenized_text: string;
    pdf_metadata: {
        created_at: Date;
        updated_at: Date;
    };
}
