import News from "../utils/news";
import { newsNavMenu } from "../keyboards/inline";
import { parseMode } from "../bot";

import { Context } from "grammy";

export const newsHandler = async (ctx: Context): Promise<void> => {
    const result = await News.getTopHeadlinesFormatted({
        country: "us",
    });

    ctx.reply(result[0], {
        parse_mode: parseMode,
        reply_markup: newsNavMenu,
    });
}