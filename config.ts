import dotenv from "dotenv"

dotenv.config();

interface IConfig {
    botToken: string,
    newsToken: string,
}

const config: IConfig = {
    botToken: String(process.env.BOT_TOKEN),
    newsToken: String(process.env.NEWS_TOKEN),
}

export default config;