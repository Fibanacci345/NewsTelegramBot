import config from "./config";
import { connect } from "mongoose";
import { bot, commands } from "./bot";

connect(config.databaseConnectionString);

bot.start().then(() => {
    bot.api.setMyCommands(commands)
});