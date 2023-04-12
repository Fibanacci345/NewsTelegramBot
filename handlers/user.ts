import News from "../utils/news";
import { getNewsNav, getHeadlinesNav, MovingDirection } from "../keyboards/inline";
import { bot, commands, parseMode } from "../bot";

import { Context } from "grammy";
import { currentState, setState, stateParameters } from "../state";

interface IMovingButtonCallback {
    current: number,
    direction: string
}

const parseMovingButtonCallback = (callback: string): IMovingButtonCallback => {
    let params: string[]
    let current: number;
    let direction: string;

    try {
        params = callback.split(" ");
        current = parseInt(params[1]);
        direction = params[2];
    } catch (err) {
        throw new Error("Can't parse callback");
    }
    return {
        current: current,
        direction: direction
    }
}

const newsHandler = (ctx: Context) => {
    ctx.reply("Hello! Send me a topic.");
    console.log("asd");
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
            reply_markup: getHeadlinesNav(0),
        });

        setState({ headlinesRegime: true });
    } catch (error) {
        ctx.reply("Oops! Something went wrong.");

        console.log(error);
    }
}

const headlinesCallbackHandler = async (ctx: Context): Promise<void> => {
    const movingButtonCallback = parseMovingButtonCallback(ctx.callbackQuery?.data!);

    const headlines: string[] = await News.getTopHeadlinesFormatted({
        country: "us",
    });

    if (headlines.length === 0) throw new Error("There is no headlines");

    let movingIndex = movingButtonCallback.direction == 'f'
        ? movingButtonCallback.current + 1
        : movingButtonCallback.current - 1

    if (movingIndex >= headlines.length) movingIndex = 0;
    else if (movingIndex == -1) movingIndex = headlines.length - 1;

    ctx.reply(headlines[movingIndex], {
        parse_mode: parseMode,
        reply_markup: getHeadlinesNav(movingIndex)
    })
}
export default { newsHandler, newsMessageHandler, headlinesHandler, headlinesCallbackHandler }