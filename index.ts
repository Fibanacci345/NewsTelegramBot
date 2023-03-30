import { config } from "./config";
import { connect } from "mongoose";
import { Bot } from "grammy";

const bot = new Bot(config.botToken);

bot.command("start", (ctx) => ctx.reply("Welcome! Up and running."));
bot.on("message", (ctx) => ctx.reply("Nice"));

connect(config.databaseConnectionString);

bot.start();