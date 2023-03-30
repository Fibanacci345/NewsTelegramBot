import dotenv from "dotenv"

dotenv.config();

interface Iconfig {
    botToken: string,
}

const config: Iconfig = { botToken: String(process.env.BOT_TOKEN) }

export default config;