import { sequence } from "../models/sequence";

export async function getNextSequenceValue(collectionName: string): Promise<number> {
    const retrievedSequence = await sequence.findOneAndUpdate(
      { collectionName },
      { $inc: { sequenceValue: 1 } },
      { new: true, upsert: true }
    );
    return retrievedSequence?.sequenceValue ?? 1;
}