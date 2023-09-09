
import { ethers } from 'ethers';
import { Alchemy } from "alchemy-sdk";
import env from './environment';
import abi from './abi.json';
import alchemy_config from './alchemy_config';

const alchemy = new Alchemy(alchemy_config);

const provider = new ethers.JsonRpcProvider(env.RPC_URL);
const wallet = new ethers.Wallet(env.ADMIN_PRIV_KEY, provider);

export var contract = new ethers.Contract(env.SMART_CONTRACT_ADDRESS,
    abi,
    wallet)

export const getMaxSupply = async () => {
    if (env.MAX_SUPPLY_NAME) {
        // todo: resolve function name while calling
        return (parseInt(await contract.MAX_SUPPLY()));
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