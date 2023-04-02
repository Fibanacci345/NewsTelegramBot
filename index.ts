import config from "./config";

import { Bot } from "grammy";
import { newsHandler } from "./handlers/users";
import { BotCommand } from "grammy/types";

const bot = new Bot(config.botToken);



const commands: BotCommand[] = [
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Show help text" },
    { command: "news", description: "Sending news" },
]

bot.command("news", newsHandler);

bot.start().then(() => {
    bot.api.setMyCommands(commands);
});