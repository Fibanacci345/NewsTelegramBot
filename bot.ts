import config from "./config";

import handlers from "./handlers";
import { Bot, InlineKeyboard } from "grammy";
import { BotCommand, ParseMode } from "grammy/types";

export const bot = new Bot(config.botToken);

export const commands: BotCommand[] = [
    { command: "help", description: "Show help text" },
    { command: "news", description: "Sending news by query" },
    { command: "headlines", description: "Sending headlines" },
]

export const parseMode: ParseMode = "HTML";

bot.callbackQuery(/next [0-9]*/, handlers.user.headlinesCallbackHandler);
bot.callbackQuery(/back [0-9]*/, handlers.user.headlinesCallbackHandler);
bot.command("headlines", handlers.user.headlinesHandler);
bot.command("news", handlers.user.newsHandler);