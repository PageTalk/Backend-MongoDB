import { Schema, model } from "mongoose";
import { userInterface } from "../interfaces/user";

const userSchema = new Schema<userInterface>({
    username: { type: String, required: true, unique: true },
    first_name: { type: String, required: true },
    last_name: String,
    role: { type: String, default: "user" },
    phone: { type: Number, required: true },
    email: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    password: { type: String, required: true },
    user_metadata: {
        created_at: { type: Date, default: Date.now },
        updated_at: { type: Date, default: Date.now },
    },
    last_login: { type: Date, default: Date.now },
});

export const user = model<userInterface>("User", userSchema);
