import { Schema, model, Document } from "mongoose";

export interface MessageInterface extends Document {
    content: string;
    username: string;
    pdf_id: Schema.Types.ObjectId;
    user_id: Schema.Types.ObjectId;
    query_id: Schema.Types.ObjectId;
    isModelResponse: boolean;
    timestamp: Date;
}

const messageSchema = new Schema<MessageInterface>({
    content: { type: String, required: true },
    username: { type: String, required: true },
    pdf_id: { type: Schema.Types.ObjectId, ref: "PDF" },
    user_id: { type: Schema.Types.ObjectId, ref: "User", required: false },
    query_id: { type: Schema.Types.ObjectId, ref: "Query" },
    isModelResponse: { type: Boolean, default: false, required: true },
    timestamp: { type: Date, default: Date.now },
});

export const message = model<MessageInterface>("Message", messageSchema);
