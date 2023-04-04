import { Context } from "grammy";
import News from "../utils/news";

const parseMode: "HTML" | "Markdown" | "MarkdownV2" = "HTML";

export const newsHandler = async (ctx: Context): Promise<void> => {
    const result = await News.getTopHeadlinesFormatted({
        country: "us",
    });

    ctx.reply(result[0], {
        parse_mode: parseMode
    });
}