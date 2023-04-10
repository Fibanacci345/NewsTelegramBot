import config from "./config";
import { connect } from "mongoose";

import { Bot } from "grammy";
import { BotCommand } from "grammy/types";
import handlers from "./handlers";
const bot = new Bot(config.botToken);

const commands: BotCommand[] = [
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Show help text" },
    { command: "news", description: "Sending news" },
]

connect(config.databaseConnectionString);

bot.command("news", handlers.user.newsHandler);

const startBot = async () => {
    console.log("Started");
    await bot.start();

    bot.api.deleteMyCommands();
    bot.api.setMyCommands(commands);
}

startBot();