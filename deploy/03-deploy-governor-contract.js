const {
    networkConfig,
    developmentChains,
    MIN_DELAY,
    VOTING_DELAY,
    VOTING_PERIOD,
    QUROUM_PERCENTAGE,
} = require("../helper-hardhat-config")
const { ethers, network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log, get } = deployments
    const { deployer } = await getNamedAccounts()
    const governanceToken = await get("GovernanceToken")
    const timeLock = await get("TimeLock")

    let args = [
        governanceToken.address,
        timeLock.address,
        VOTING_DELAY,
        VOTING_PERIOD,
        QUROUM_PERCENTAGE,
    ]

    const governorContract = await deploy("GovernorContract", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
        gasLimit: "18446744073709551615",
    })

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(basicNft.address, args)
    }

    log("--------------------------------------------")
}
module.exports.tags = ["all", "basicnft"]
