import { InlineKeyboard } from "grammy";

export enum MovingDirection {
    Forward = 'f',
    Backward = 'b'
}

export const getHeadlinesNav = (currentIndex: number, size: number): InlineKeyboard => {
    return new InlineKeyboard()
        .text("next", `moveHeadlines ${currentIndex} f`)
        .text(`${currentIndex + 1} - ${size}`)
        .text("back", `moveHeadlines ${currentIndex} b`);
}

export const getNewsNav = (currentIndex: number, size: number, query: string): InlineKeyboard => {
    return new InlineKeyboard()
        .text("next", `moveNews ${currentIndex} f ${query}`)
        .text(`${currentIndex + 1} - ${size}`)
        .text("back", `moveNews ${currentIndex} b ${query}`);
}