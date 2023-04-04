import { InlineKeyboard } from "grammy";

export const getHeadlinesNav = (prevId: number, nextId: number): InlineKeyboard => {
    return new InlineKeyboard()
        .text("next", `nextHeadlines ${nextId}`)
        .text("back", `backHeadlines ${prevId}`);
}

export const getNewsNav = (prevId: number, nextId: number): InlineKeyboard => {
    return new InlineKeyboard()
        .text("next", `nextHeadlines ${nextId}`)
        .text("back", `backHeadlines ${prevId}`);
}