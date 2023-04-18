import News from "../utils/news";
import { getNewsNav, getHeadlinesNav } from "../keyboards/inline";
import { bot, parseMode } from "../bot";

import { Context } from "grammy";
import { currentState } from "../state";
import { setNewsRegime, setHeadlinesRegime, setBotLastMessage } from "../state/reducers";

import helpers, { IMovingButtonCallback, INewsMovingButtonCallback } from "../common/handlerHelpers";

const newsHandler = (ctx: Context) => {
    ctx.reply("Hello! Send me a topic.");

    setNewsRegime();
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

            const botMessage = await ctx.reply(articles[0], {
                parse_mode: parseMode,
                reply_markup: getNewsNav(0, articles.length, query)
            });

            setBotLastMessage(botMessage.message_id);
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

        const movingButtonCallback: INewsMovingButtonCallback = helpers.parseNewsMovingButtonCallback(ctx.callbackQuery.data);
        const articles: string[] = await News.getEverythingFormatted({ q: movingButtonCallback.query })

        if (articles.length === 0) {
            ctx.reply("It seems like there is no news with such query. Try to find another news.");

            return;
        }

        if (typeof ctx.chat === "undefined") throw new Error("ctx.chat is undefined");
        if (typeof currentState.botLastMessageId === "undefined") {
            ctx.reply("Something went wrong! Please make a new query request.");

            return;
        }

        const movingIndex: number = helpers.getValidatedIndex(movingButtonCallback.current, movingButtonCallback.direction, articles.length);
        const botLastMessageId: number = currentState.botLastMessageId;
        const chatId: number = ctx.chat.id;
        try {
            await bot.api.editMessageText(chatId, botLastMessageId, articles[movingIndex], {
                parse_mode: parseMode,
                reply_markup: getNewsNav(movingIndex, articles.length, movingButtonCallback.query),
                disable_web_page_preview: true
            });
        }
        catch (err: any) {
            if (err.error_code != 400){
                throw err;
            } 
        }

        ctx.answerCallbackQuery();

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

        const botMessage = await ctx.reply(headlines[0], {
            parse_mode: parseMode,
            reply_markup: getHeadlinesNav(0, headlines.length),
        });

        setBotLastMessage(botMessage.message_id);
        setHeadlinesRegime();
    } catch (error) {
        ctx.reply("Oops! Something went wrong.");

        console.log(error);
    }
}

const headlinesCallbackHandler = async (ctx: Context): Promise<void> => {
    const movingButtonCallback: IMovingButtonCallback = helpers.parseMovingButtonCallback(ctx.callbackQuery?.data!);

    const headlines: string[] = await News.getTopHeadlinesFormatted({
        country: "us",
    });

    if (headlines.length === 0) {
        ctx.reply("It seems like there is no headlines.");

        return;
    }

    if (typeof ctx.chat === "undefined") throw new Error("ctx.chat is undefined");
    if (typeof currentState.botLastMessageId === "undefined") {
        ctx.reply("Something went wrong! Please make a new query request.");

        return;
    }

    const movingIndex: number = helpers.getValidatedIndex(movingButtonCallback.current, movingButtonCallback.direction, headlines.length);
    const botLastMessageId: number = currentState.botLastMessageId;
    const chatId: number = ctx.chat.id;

    await bot.api.editMessageText(chatId, botLastMessageId, headlines[movingIndex], {
        parse_mode: parseMode,
        reply_markup: getHeadlinesNav(movingIndex, headlines.length)
    });
}

export default { newsHandler, newsMessageHandler, newsCallbackHandler, headlinesHandler, headlinesCallbackHandler }