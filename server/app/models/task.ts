import mongoose from 'mongoose';
import { UserSchema } from './user';

const Schema = mongoose.Schema;

export const TaskSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    user: {
        // type: mongoose.Schema.Types.ObjectId,
        type: UserSchema,
        // ref: "User",
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    complete: {
        type: Boolean,
        required: false
    }
});