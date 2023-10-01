import { Document } from "mongoose";

export interface interactionInterface extends Document {
    interaction_id: {
        type: number;
        unique: true;
        default: () => Promise<number>;
    };
    user_id: number;
    collection_id: number;
    timestamp: Date;
    interaction_type: string;
    interaction_details: string;
}
