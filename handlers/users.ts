import { Context } from "grammy";
import News from "../utils/news";

export const test = async (ctx: Context): Promise<void> => {
    const result = await News.getEverythingFormatted({
        q: ctx!.message!.text,
        language: "en"
    });

    ctx.reply(result[0], {
        parse_mode: "HTML"
    });
}