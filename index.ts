import config from "./config";
<<<<<<< HEAD

=======
import { connect } from "mongoose";
>>>>>>> origin/develop
import { Bot } from "grammy";
import { newsHandler } from "./handlers/users";
import { BotCommand } from "grammy/types";

const bot = new Bot(config.botToken);


<<<<<<< HEAD

const commands: BotCommand[] = [
    { command: "start", description: "Start the bot" },
    { command: "help", description: "Show help text" },
    { command: "news", description: "Sending news" },
]

bot.command("news", newsHandler);

bot.start().then(() => {
    bot.api.setMyCommands(commands);
});
=======
connect(config.databaseConnectionString);

bot.start();
>>>>>>> origin/develop
