import config from "./config.js";
import { Bot } from "grammy";

const bot = new Bot(config.botToken);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Nice"));

bot.start();