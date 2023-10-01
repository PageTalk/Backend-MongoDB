import { Error, Schema, model } from "mongoose";
import { userInterface } from "../interfaces/user";
import { getNextSequenceValue } from "../functions/getNextSequence";

const userSchema = new Schema<userInterface>({
    user_id: Number,
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

userSchema.pre("save", async function (this: userInterface, next) {
    if(this.isNew) {
        try {
            const seqValue = await getNextSequenceValue("user");
            this.user_id = seqValue;
            next();
        } catch (error: any) {
            next(error);
        }
    } else {
        next();
    }
});

export const user = model<userInterface>("User", userSchema);
