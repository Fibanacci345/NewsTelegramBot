import { Schema, model } from "mongoose";

export interface IUser {
    telegramId: string
}

const userSchema = new Schema<IUser>({
    telegramId: {
        type: String,
        required: true
    }
});

export const User = model<IUser>('User', userSchema);