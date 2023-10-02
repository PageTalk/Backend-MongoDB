import { Document, Error } from "mongoose";
import { sequence } from "../models/sequence";
import { sequenceInterface } from "../interfaces/sequence";

export async function getNextSequenceValue(collectionName: string): Promise<number> {
  const filter = { collectionName }; // Use collectionName as the _id
  const update = { $inc: { sequenceValue: 1 } };
  const options = { new: true, upsert: true };

  const retrievedSequence = await sequence.findOneAndUpdate(filter, update, options);
  return retrievedSequence?.sequenceValue ?? 1;
}
