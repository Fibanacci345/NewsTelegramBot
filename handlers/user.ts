import News from "../utils/news";
import { getHeadlinesNav } from "../keyboards/inline";
import { bot, commands, parseMode } from "../bot";

import { Context } from "grammy";
import { currentState, setState, stateParameters } from "../state";



const newsHandler = (ctx: Context) => {
    ctx.reply("Hello! Send me a topic.");

    setState({ newsRegime: true });
}

const newsMessageHandler = async (ctx: Context) => {
    if (currentState.newsRegime) {
        try {
            if (typeof ctx.message === "undefined") throw new Error("Invalid message");

            const articles: string[] = await News.getEverythingFormatted({ q: ctx.message.text })

            if (articles.length === 0) {
                ctx.reply("It seems like there is no news with such query. Try again.");

                return null;
            }

            ctx.reply(articles[0], {
                parse_mode: parseMode,
            });
        } catch (error) {
            ctx.reply("Oops! Something went wrong.");

            console.log(error);
        }
    } else {
        ctx.reply("Please use /help command if you don't know what to do");
    }
}

const headlinesHandler = async (ctx: Context): Promise<void> => {
    try {
        const headlines: string[] = await News.getTopHeadlinesFormatted({
            country: "us",
        });

        if (headlines.length === 0) throw new Error("There is no headlines");

        ctx.reply(headlines[0], {
            parse_mode: parseMode,
            reply_markup: getHeadlinesNav(headlines.length - 1, 1),
        });

        setState({ headlinesRegime: true });
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
            reply_markup: getHeadlinesNav(prevIndex, nextIndex)
        });
    } catch (error) {
        ctx.reply("Oops! Something went wrong.");

        console.log(error);
    }
}

export default { newsHandler, newsMessageHandler, headlinesHandler, headlinesCallbackHandler }