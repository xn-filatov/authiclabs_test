import * as dotenv from 'dotenv'
dotenv.config()

export default {
    // App settings
    PORT: process.env.PORT as string,
    ADMIN_PRIV_KEY: process.env.ADMIN_PRIV_KEY as string,
    SMART_CONTRACT_ADDRESS: process.env.SMART_CONTRACT_ADDRESS as string,
    MAX_SUPPLY_NAME: process.env.MAX_SUPPLY_NAME as string,
    RPC_URL: process.env.RPC_URL as string,
    ALCHEMY_API_KEY: process.env.ALCHEMY_API_KEY as string
}