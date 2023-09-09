import { Network } from "alchemy-sdk";
import env from './environment';

export default {
    apiKey: env.ALCHEMY_API_KEY,
    network: Network.MATIC_MUMBAI,
};