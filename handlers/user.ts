import News from "../utils/news";
import { getNewsNav, getHeadlinesNav, MovingDirection } from "../keyboards/inline";
import { bot, commands, parseMode } from "../bot";

import { Context } from "grammy";
import { currentState, setState, stateParameters } from "../state";

enum CallbackParamsIndexes {
    commandTitle = 0,
    currentIndex,
    direction,
    query
}

interface IMovingButtonCallback {
    current: number,
    direction: string
}

interface INewsMovingButtonCallback extends IMovingButtonCallback {
    query: string,
}

const parseMovingButtonCallback = (callback: string): IMovingButtonCallback => {
    let params: string[]
    let current: number;
    let direction: string;

    try {
        params = callback.split(" ");
        current = parseInt(params[CallbackParamsIndexes.currentIndex]);
        direction = params[CallbackParamsIndexes.direction];
    } catch (err) {
        throw new Error("Can't parse callback");
    }
    return {
        current: current,
        direction: direction
    }
}

const parseNewsMovingButtonCallback = (callback: string): INewsMovingButtonCallback => {
    const baseParams: IMovingButtonCallback = parseMovingButtonCallback(callback);

    const query = callback.split(" ")[CallbackParamsIndexes.query];

    const fullParams = {
        ...baseParams,
        query,
    }

    return fullParams;
}

const newsHandler = (ctx: Context) => {
    ctx.reply("Hello! Send me a topic.");

    setState({ newsRegime: true });
}

const newsMessageHandler = async (ctx: Context) => {
    if (currentState.newsRegime) {
        try {
            if (typeof ctx.message === "undefined") throw new Error("Invalid message");

            const query = ctx.message.text;

            if (typeof query === "undefined") throw new Error("Invalid message");

            const articles: string[] = await News.getEverythingFormatted({ q: query })

            if (articles.length === 0) {
                ctx.reply("It seems like there is no news with such query. Try again.");

                return null;
            }

            ctx.reply(articles[0], {
                parse_mode: parseMode,
                reply_markup: getNewsNav(0, articles.length, query)
            });
        } catch (error) {
            ctx.reply("Oops! Something went wrong.");

            console.log(error);
        }
    } else {
        ctx.reply("Please use /help command if you don't know what to do");
    }
}

const newsCallbackHandler = async (ctx: Context): Promise<void> => {
    const movingButtonCallback: INewsMovingButtonCallback = parseNewsMovingButtonCallback(ctx.callbackQuery?.data!);
    console.log(movingButtonCallback);
    const articles: string[] = await News.getEverythingFormatted({ q: movingButtonCallback.query })

    if (articles.length === 0) throw new Error("There is no news for this query.");

    let movingIndex = movingButtonCallback.direction == 'f'
        ? movingButtonCallback.current + 1
        : movingButtonCallback.current - 1

    if (movingIndex >= articles.length) movingIndex = 0;
    else if (movingIndex == -1) movingIndex = articles.length - 1;

    ctx.reply(articles[movingIndex], {
        parse_mode: parseMode,
        reply_markup: getNewsNav(movingIndex, articles.length, movingButtonCallback.query)
    })
}

const headlinesHandler = async (ctx: Context): Promise<void> => {
    try {
        const headlines: string[] = await News.getTopHeadlinesFormatted({
            country: "us",
        });

        if (headlines.length === 0) throw new Error("There is no headlines");

        ctx.reply(headlines[0], {
            parse_mode: parseMode,
            reply_markup: getHeadlinesNav(0, headlines.length),
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
        reply_markup: getHeadlinesNav(movingIndex, headlines.length)
    })
}
export default { newsHandler, newsMessageHandler, newsCallbackHandler, headlinesHandler, headlinesCallbackHandler }