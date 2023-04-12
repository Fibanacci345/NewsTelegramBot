import { InlineKeyboard } from "grammy";

export enum MovingDirection {
    Forward = 'f',
    Backward = 'b'
}

export const getHeadlinesNav = (currentIndex: number): InlineKeyboard => {
    return new InlineKeyboard()
        .text("next", `moveHeadlines ${currentIndex} f`)
        .text(`${currentIndex + 1}`)
        .text("back", `moveHeadlines ${currentIndex} b`);
}

export const getNewsNav = (currentIndex: number): InlineKeyboard => {
    return new InlineKeyboard()
        .text("next", `moveNews ${currentIndex} f`)
        .text("back", `moveNews ${currentIndex} b`);
}