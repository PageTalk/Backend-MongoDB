import { Document } from "mongoose";

export interface collectionInterface extends Document {
    collection_id: number;
    username: string;
    pdf_id: number;
    collection_name: string;
    collection_description: string;
    collection_timestamp: Date;
}