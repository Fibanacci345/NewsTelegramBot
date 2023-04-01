import { Schema, model } from "mongoose";
import { IUserSettings } from "./userSettings";

export interface IUser {
    telegramId: string,
    settings: IUserSettings
}

const userSchema = new Schema<IUser>({
    telegramId: {
        type: String,
        required: true
    },
    
    settings: {
        type: Schema.Types.ObjectId,
        ref: 'UserSettings'
    }
});

export const User = model<IUser>('User', userSchema);