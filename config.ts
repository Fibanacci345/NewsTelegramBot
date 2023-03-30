import dotenv from "dotenv"

dotenv.config();

interface configInterface {
    botToken: string,
}

const config: configInterface = { botToken: String(process.env.BOT_TOKEN) }

export default config;