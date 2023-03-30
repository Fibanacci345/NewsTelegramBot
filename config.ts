import dotenv from "dotenv"

dotenv.config();

interface Environment {
    botToken: string,
}

export const config: Environment = { botToken: String(process.env.BOT_TOKEN) }
