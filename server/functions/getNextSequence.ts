import { sequence } from "../database/models/sequence";

export async function getNextSequenceValue(
    collectionName: string
): Promise<number> {
    const filter = { collectionName };
    const update = { $inc: { sequenceValue: 1 } };
    const options = { new: true, upsert: true };

    const retrievedSequence = await sequence.findOneAndUpdate(
        filter,
        update,
        options
    );
    return retrievedSequence?.sequenceValue ?? 1;
}
