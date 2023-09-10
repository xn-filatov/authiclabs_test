import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import '@typechain/hardhat'
import '@nomicfoundation/hardhat-ethers'
import '@nomicfoundation/hardhat-chai-matchers'
import env from './environment';

const config: HardhatUserConfig = {
  solidity: "0.8.19",
  defaultNetwork: "hardhat",
  networks: {
    default: {
      url: env.DEPLOY_RPC_URL,
      accounts: [env.DEPLOY_PRIV_KEY]
    }
  }
};
export default config;
