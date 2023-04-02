import { InlineKeyboard } from "grammy";

export const getNewsNavMenu = (prevId: number, nextId: number): InlineKeyboard  => {
    return new InlineKeyboard()
    .text("next", `next ${nextId}`)
    .text("down", `down ${prevId}`);
}