import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { GAME_REWARD_ABI, GAME_REWARD_CONTRACT } from "common/constants";

export const lockService = async (connector, token, account) => {
    const pr = await connector.getProvider();
    const instance = new Web3(pr);
    const game = new instance.eth.Contract(GAME_REWARD_ABI as AbiItem[], GAME_REWARD_CONTRACT);
    const amount = instance.utils.toWei(token, 'ether');
    const response = await game.methods.lock(account, amount.toString()).send({ from: account });
    return response;
}

export const unlockService = async (connector, account) => {
    const pr = await connector.getProvider();
    const instance = new Web3(pr);
    const game = new instance.eth.Contract(GAME_REWARD_ABI as AbiItem[], GAME_REWARD_CONTRACT);
    const response = await game.methods.unLock(account).send({ from: account });
    return response;
}

export const checkLockService = async (connector, account) => {
    const pr = await connector.getProvider();
    const instance = new Web3(pr);
    const game = new instance.eth.Contract(GAME_REWARD_ABI as AbiItem[], GAME_REWARD_CONTRACT);
    const token = await game.methods.checkLock(account).call();
    return token;
}

export const checkRewardService = async (connector, account) => {
    const pr = await connector.getProvider();
    const instance = new Web3(pr);
    const game = new instance.eth.Contract(GAME_REWARD_ABI as AbiItem[], GAME_REWARD_CONTRACT);
    const rewards = await game.methods.reward(account).call();
    return rewards;
}

export const balanceService = async (account) => {
    const response = await fetch('/api/balance', {
        method: 'POST',
        body: JSON.stringify({ account }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export const gameExpService = async (account) => {
    const response = await fetch('/api/gameexp', {
        method: 'POST',
        body: JSON.stringify({ account }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}

export const claimService = async (connector, tokens, account) => {
    const pr = await connector.getProvider();
    const instance = new Web3(pr);
    const game = new instance.eth.Contract(GAME_REWARD_ABI as AbiItem[], GAME_REWARD_CONTRACT);
    const amount = instance.utils.toWei(tokens.toString(), 'ether');
    const response = await game.methods.claim(account, amount.toString()).send({ from: account });
    console.log(response)
    const claimResponse = await fetch('/api/claim', {
        method: 'POST',
        body: JSON.stringify({ account, tokens, hash: response.transactionHash }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    const data = await claimResponse.json();

    return response;
}

export const getClaimService = async (account) => {
    const claimResponse = await fetch(`/api/claims/${account}`);
    const data = await claimResponse.json();
    return data?.list;
}