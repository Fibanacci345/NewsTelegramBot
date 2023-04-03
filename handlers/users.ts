import News from "../utils/news";
import { getNewsNavMenu } from "../keyboards/inline";
import { parseMode } from "../bot";

import { Context } from "grammy";

export const newsHandler = async (ctx: Context): Promise<void> => {
    const headlines = await News.getTopHeadlinesFormatted({
        country: "us",
    });

    ctx.reply(headlines[0], {
        parse_mode: parseMode,
        reply_markup: getNewsNavMenu(headlines.length - 1, 1),
    });
}

export const newsCallbackHandler = async (ctx: Context): Promise<void> => {
    const headlines = await News.getTopHeadlinesFormatted({
        country: "us",
    });

    if (headlines.length === 0) ctx.reply("Oops!")

    const currentIndex = parseInt(ctx.callbackQuery?.data?.split(" ")[1]!);
    let nextIndex = currentIndex + 1;
    let prevIndex = currentIndex - 1;

    if (nextIndex >= headlines.length) nextIndex = 0;
    if (prevIndex <= -1) prevIndex = headlines.length - 1;

    ctx.reply(headlines[currentIndex], {
        parse_mode: parseMode,
        reply_markup: getNewsNavMenu(prevIndex, nextIndex)
    });
}