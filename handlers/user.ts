import News from "../utils/news";
import { getNewsNav, getHeadlinesNav, movingDirection } from "../keyboards/inline";
import { parseMode } from "../bot";

import { Context } from "grammy";
import { currentState, setState } from "../state";

enum CallbackParamsIndexes {
    commandTitle = 0,
    currentIndex,
    direction,
    query
}

interface IMovingButtonCallback {
    current: number,
    direction: movingDirection
}

interface INewsMovingButtonCallback extends IMovingButtonCallback {
    query: string,
}

const parseMovingButtonCallback = (callback: string): IMovingButtonCallback => {
    let params: string[]
    let current: number;
    let direction: movingDirection;

    try {
        params = callback.split(" ");
        current = parseInt(params[CallbackParamsIndexes.currentIndex]);
        direction = params[CallbackParamsIndexes.direction] as movingDirection;
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
    let query;

    try {
        query = callback.split(" ")[CallbackParamsIndexes.query];
    } catch (err) {
        throw new Error("Can't parse query from callback");
    }

    return {
        ...baseParams,
        query,
    };
}

const getValidatedIndex = (currentIndex: number, currentDirection: movingDirection, maxSize: number): number => {
    currentDirection == 'f' ? currentIndex++ : currentIndex--;

    if (currentIndex >= maxSize) currentIndex = 0;
    else if (currentIndex == -1) currentIndex = maxSize - 1;

    return currentIndex;
}

const newsHandler = (ctx: Context) => {
    ctx.reply("Hello! Send me a topic.");

    setState({ newsRegime: true });
}

const newsMessageHandler = async (ctx: Context): Promise<void> => {
    if (currentState.newsRegime) {
        try {
            if (typeof ctx.message === "undefined" || typeof ctx.message.text === "undefined") {
                ctx.reply("The message is incorrect. Please send me a text.");

                return;
            }

            const query: string = ctx.message.text;
            const articles: string[] = await News.getEverythingFormatted({ q: query })

            if (articles.length === 0) {
                ctx.reply("It seems like there is no news with such query. Try to find another news.");

                return;
            }

            ctx.reply(articles[0], {
                parse_mode: parseMode,
                reply_markup: getNewsNav(0, articles.length, query)
            });
        } catch (err) {
            ctx.reply("Oops! Something went wrong.");

            console.log(err);
        }
    } else {
        ctx.reply("Please use /help command if you don't know what to do");
    }
}

const newsCallbackHandler = async (ctx: Context): Promise<void> => {
    try {
        if (typeof ctx.callbackQuery === "undefined") throw new Error("There is no callbackQuery in newsCallbackHandler");
        if (typeof ctx.callbackQuery.data === "undefined") throw new Error("There is no callbackQuery data in newsCallbackHandler");

        const movingButtonCallback: INewsMovingButtonCallback = parseNewsMovingButtonCallback(ctx.callbackQuery.data);

        const articles: string[] = await News.getEverythingFormatted({ q: movingButtonCallback.query })

        if (articles.length === 0) {
            ctx.reply("It seems like there is no news with such query. Try to find another news.");

            return;
        }

        let movingIndex = getValidatedIndex(movingButtonCallback.current, movingButtonCallback.direction, articles.length);

        ctx.reply(articles[movingIndex], {
            parse_mode: parseMode,
            reply_markup: getNewsNav(movingIndex, articles.length, movingButtonCallback.query)
        })
    } catch (err) {
        ctx.reply("Oops! Something went wrong.");

        console.log(err);
    }

}

const headlinesHandler = async (ctx: Context): Promise<void> => {
    try {
        const headlines: string[] = await News.getTopHeadlinesFormatted({
            country: "us",
        });

        if (headlines.length === 0) {
            ctx.reply("It seems like there is no headlines.");

            return;
        }

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

    if (headlines.length === 0) {
        ctx.reply("It seems like there is no headlines.");

        return;
    }

    let movingIndex = getValidatedIndex(movingButtonCallback.current, movingButtonCallback.direction, headlines.length);

    ctx.reply(headlines[movingIndex], {
        parse_mode: parseMode,
        reply_markup: getHeadlinesNav(movingIndex, headlines.length)
    })
}

export default { newsHandler, newsMessageHandler, newsCallbackHandler, headlinesHandler, headlinesCallbackHandler }