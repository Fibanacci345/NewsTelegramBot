import dotenv from "dotenv"

dotenv.config();

interface IConfig {
    botToken: string,
    databaseConnectionString: string
}

const config: IConfig = { 
    botToken: String(process.env.BOT_TOKEN),
    databaseConnectionString: String(process.env.DB_CONNETION_STRING) 
}

export default config;