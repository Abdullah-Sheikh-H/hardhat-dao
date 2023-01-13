const { networkConfig, developmentChains, MIN_DELAY } = require("../helper-hardhat-config")
const { ethers, network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    let args = [MIN_DELAY, [], []]

    const timeLock = await deploy("TimeLock", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(basicNft.address, args)
    }

    log("--------------------------------------------")
}
module.exports.tags = ["all", "basicnft"]
