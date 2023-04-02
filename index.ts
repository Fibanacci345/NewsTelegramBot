import { bot, commands } from "./bot";

bot.start().then(() => {
    bot.api.setMyCommands(commands);
});