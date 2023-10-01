import { Document } from "mongoose";

export interface pdfInterface extends Document {
    pdf_id: {
        type: number;
        unique: true;
        default: () => Promise<number>;
    };
    user_id: number;
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
