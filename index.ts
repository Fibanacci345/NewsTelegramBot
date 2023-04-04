import config from "./config";
import { connect } from "mongoose";

import { Bot } from "grammy";
import { newsHandler } from "./handlers/users";
import { BotCommand } from "grammy/types";

const bot = new Bot(config.botToken);



const commands: BotCommand[] = [
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Show help text" },
    { command: "news", description: "Sending news" },
]

connect(config.databaseConnectionString);

bot.command("news", newsHandler);

bot.start().then(() => {
    bot.api.setMyCommands(commands);
});
