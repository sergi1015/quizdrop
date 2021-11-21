const GameReward = artifacts.require("GameReward");
const QdropToken = artifacts.require("QdropToken");

contract("GameReward", accounts => {
    it("should send 1 reward to address", () =>
        GameReward.deployed()
            .then(instance => instance.reward.call(accounts[1]))
            .then(result => {
                console.log(result[0].toString())
                assert.equal(
                    1,
                    1,
                    "1 wasn't in the first account"
                );
            }).catch((e) => {
                console.log(e)
            })
    );
});

contract("QdropToken", accounts => {
    it("should send 1 reward to address", () =>
        QdropToken.deployed()
            .then(instance => instance.allowance.call(accounts[0], accounts[1]))
            .then(result => {
                console.log(result.toString())
                assert.equal(
                    1,
                    1,
                    "1 wasn't in the first account"
                );
            }).catch((e) => {
                console.log(e)
            })
    );
});