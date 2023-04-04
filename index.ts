import config from "./config";
import { connect } from "mongoose";
import { bot, commands } from "./bot";

connect(config.databaseConnectionString);

const startBot = async () => {
    console.log("Started");
    await bot.start();

    bot.api.deleteMyCommands();
    bot.api.setMyCommands(commands);
}

startBot();