import dotenv from "dotenv"

dotenv.config();

interface Environment {
    botToken: string,
    databaseConnectionString: string
}

export const config: Environment = { 
    botToken: String(process.env.BOT_TOKEN),
    databaseConnectionString: String(process.env.DB_CONNETION_STRING)
}
