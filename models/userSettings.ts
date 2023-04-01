import { Schema, model } from "mongoose";

export interface IUserSettings {
    country: string
}

const userSettingsSchema = new Schema<IUserSettings>({
    country: {
        type: String,
        required: false
    }
});

export const UserSettings = model<IUserSettings>('UserSettings', userSettingsSchema);