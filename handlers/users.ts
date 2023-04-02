import { Context, InlineKeyboard } from "grammy";
import News from "../utils/news";
import { ParseMode } from "grammy/types";

const parseMode: ParseMode = "HTML";

const menu = new InlineKeyboard()
    .text("next")
    .text("down");

export const newsHandler = async (ctx: Context): Promise<void> => {
    const result = await News.getTopHeadlinesFormatted({
        country: "us",
    });

    ctx.reply(result[0], {
        parse_mode: parseMode,
        reply_markup: menu,
    });
}