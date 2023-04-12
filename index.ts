import config from "./config";
import { connect } from "mongoose";

import { Bot } from "grammy";
import { BotCommand } from "grammy/types";
import { bot } from "./bot";

connect(config.databaseConnectionString);

const startBot = async () => {
    console.log("Starting...");
    await bot.start();
    console.log("Started");
}

startBot();