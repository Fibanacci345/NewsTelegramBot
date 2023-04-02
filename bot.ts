import config from "./config";

import { Bot, InlineKeyboard } from "grammy";
import { newsHandler } from "./handlers/users";
import { BotCommand, ParseMode } from "grammy/types";

export const bot = new Bot(config.botToken);

export const commands: BotCommand[] = [
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Show help text" },
    { command: "news", description: "Sending news" },
]

export const parseMode: ParseMode = "HTML";

bot.callbackQuery("next", (ctx) => { ctx.reply("test") });
bot.command("news", newsHandler);