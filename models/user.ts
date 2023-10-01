import { Schema, model } from "mongoose";
import { userInterface } from "../interfaces/user";

const userSchema = new Schema<userInterface>({
    user_id: { type: Number, required: true },
    username: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: String,
    role: { type: String, required: true },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, required: true },
    password: { type: String, required: true },
    user_metadata: {
        created_at: { type: Date, required: true },
        updated_at: { type: Date, required: true },
    },
    last_login: { type: Date, required: true },
});

export const user = model<userInterface>("User", userSchema);
