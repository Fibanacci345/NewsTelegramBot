import dotenv from "dotenv"

dotenv.config();

interface Iconfig {
    botToken: string,
    newsToken: string,
}

const config: Iconfig = {
    botToken: String(process.env.BOT_TOKEN),
    newsToken: String(process.env.NEWS_TOKEN),
}

export default config;