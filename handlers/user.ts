import News from "../utils/news";
import { getNewsNavMenu } from "../keyboards/inline";
import { parseMode } from "../bot";

import { Context } from "grammy";

const newsHandler = async () => { }

const headlinesHandler = async (ctx: Context): Promise<void> => {
    try {
        const headlines: string[] = await News.getTopHeadlinesFormatted({
            country: "us",
        });

        if (headlines.length === 0) throw new Error("There is no headlines");

        ctx.reply(headlines[0], {
            parse_mode: parseMode,
            reply_markup: getNewsNavMenu(headlines.length - 1, 1),
        });
    } catch (error) {
        ctx.reply("Oops! Something went wrong.");

        console.log(error);
    }
}

const headlinesCallbackHandler = async (ctx: Context): Promise<void> => {
    try {
        const headlines: string[] = await News.getTopHeadlinesFormatted({
            country: "us",
        });

        if (headlines.length === 0) throw new Error("There is no headlines");

        if (typeof ctx.callbackQuery === "undefined" || typeof ctx.callbackQuery.data === "undefined") {
            throw new Error("Can't get current index");
        }

        const currentIndex: number = parseInt(ctx.callbackQuery.data.split(" ")[1]);
        let nextIndex: number = currentIndex + 1;
        let prevIndex: number = currentIndex - 1;

        if (nextIndex >= headlines.length) nextIndex = 0;
        if (prevIndex <= -1) prevIndex = headlines.length - 1;

        ctx.reply(headlines[currentIndex], {
            parse_mode: parseMode,
            reply_markup: getNewsNavMenu(prevIndex, nextIndex)
        });
    } catch (error) {
        ctx.reply("Oops! Something went wrong.");

        console.log(error);
    }
}

export default { newsHandler, headlinesHandler, headlinesCallbackHandler }