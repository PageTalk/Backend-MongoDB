import { Document } from "mongoose";

export interface interactionInterface extends Document {
    interaction_id: number;
    username: string;
    collection_id: number;
    timestamp: Date;
    interaction_type: string;
    interaction_details: string;
}
