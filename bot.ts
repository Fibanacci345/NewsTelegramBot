import config from "./config";

import handlers from "./handlers";
import { Bot } from "grammy";
import { BotCommand, ParseMode } from "grammy/types";

export const bot = new Bot(config.botToken);

export const parseMode: ParseMode = "HTML";

export const commands: BotCommand[] = [
    { command: "news", description: "Sending news by query" },
    { command: "headlines", description: "Sending headlines" },
]

bot.callbackQuery(/moveHeadlines [0-9]* [f,b]/, handlers.user.headlinesCallbackHandler);
bot.callbackQuery(/moveNews [0-9]* [f,b] [\w]*/, handlers.user.newsCallbackHandler);

bot.command("headlines", handlers.user.headlinesHandler);
bot.command("news", handlers.user.newsHandler);
bot.on("message", handlers.user.newsMessageHandler);

