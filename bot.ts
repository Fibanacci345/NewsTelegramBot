import config from "./config";

import handlers from "./handlers";
import { Bot } from "grammy";
import { BotCommand, ParseMode } from "grammy/types";

export const bot = new Bot(config.botToken);

export const commands: BotCommand[] = [
    { command: "news", description: "Sending news by query" },
    { command: "headlines", description: "Sending headlines" },
]

export const parseMode: ParseMode = "HTML";

bot.callbackQuery(/nextHeadlines [0-9]*/, handlers.user.headlinesCallbackHandler);
bot.callbackQuery(/backHeadlines [0-9]*/, handlers.user.headlinesHandler);
bot.command("headlines", handlers.user.headlinesHandler);
bot.command("news", handlers.user.newsHandler);
bot.on("message", handlers.user.newsMessageHandler)