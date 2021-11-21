const QdropToken = artifacts.require("QdropToken");
const GameReward = artifacts.require("GameReward");
const GAME_PICK_STORETAX = "0xbAbA16AeaDF0526942Dd86F7aab53FE310A61510"

module.exports = async function (deployer, network, accounts){
    await deployer.deploy(QdropToken, GAME_PICK_STORETAX);
    const instance = await QdropToken.deployed();
    console.log(instance.address);
    await deployer.deploy(GameReward, instance.address);
}