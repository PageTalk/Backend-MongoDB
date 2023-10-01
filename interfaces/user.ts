import { Document } from 'mongoose';

export interface userInterface extends Document {
    user_id: number;
    username: string;
    first_name: string;
    last_name: string;
    role: string,
    phone: number;
    email: string;
    isVerified: boolean;
    password: string;
    user_metadata: {
        created_at: Date;
        updated_at: Date;
    };
    last_login: Date;
}