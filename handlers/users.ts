import News from "../utils/news";
import { getNewsNavMenu } from "../keyboards/inline";
import { parseMode } from "../bot";

import { Context } from "grammy";

export const newsHandler = async (ctx: Context): Promise<void> => {
    const result = await News.getTopHeadlinesFormatted({
        country: "us",
    });

    ctx.reply(result[0], {
        parse_mode: parseMode,
        reply_markup: getNewsNavMenu(0, 0),
    });
}

export const newsCallbackHandler = async (ctx: Context): Promise<void> => {

    let idx = Number.parseInt(ctx.callbackQuery?.data?.split(" ")[1]!);

    const result = await News.getTopHeadlinesFormatted({
        country: "us",
    });

    ctx.reply(result[idx], {
        parse_mode: parseMode,
        reply_markup: getNewsNavMenu(idx -1, idx +1),
    });

}