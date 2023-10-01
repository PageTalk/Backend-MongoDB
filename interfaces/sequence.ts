import { Document } from 'mongoose';

export interface sequenceInterface extends Document {
    collectionName: string;
    sequenceValue: number;
}