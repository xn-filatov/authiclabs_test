import * as dotenv from 'dotenv'
dotenv.config()

export default {
    // App settings
    DEPLOY_RPC_URL: process.env.DEPLOY_RPC_URL as string,
    DEPLOY_PRIV_KEY: process.env.DEPLOY_PRIV_KEY as string
}