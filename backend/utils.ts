
import { ethers } from 'ethers';
import { Alchemy } from "alchemy-sdk";
import env from './environment';
import alchemy_config from './alchemy_config';
import { DefaultNFT__factory } from "./typechain-types/factories/contracts/DefaultNFT__factory"

const alchemy = new Alchemy(alchemy_config);

const provider = new ethers.JsonRpcProvider(env.RPC_URL);
const wallet = new ethers.Wallet(env.ADMIN_PRIV_KEY, provider);

export var contract = DefaultNFT__factory.connect(env.SMART_CONTRACT_ADDRESS, wallet)

export const getMaxSupply = async () => {
    if (env.MAX_SUPPLY_NAME) {
        return parseInt((await contract.getFunction(env.MAX_SUPPLY_NAME).staticCall()) as string)
    }
    else return null
}

export const getCollectionNfts = async () => {
    const response = await alchemy.nft.getNftsForContract(env.SMART_CONTRACT_ADDRESS, {
        omitMetadata: false,
    });

    var nfts = response.nfts;

    return nfts;

}