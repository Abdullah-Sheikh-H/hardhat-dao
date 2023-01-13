const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { ethers, network } = require("hardhat")
const { verify } = require("../utils/verify")

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()

    let args = []

    const governanceToken = await deploy("GovernanceToken", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1,
    })

    await delegate(governanceToken.address, deployer)
    log("delegated")

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(nftMarketplace.address, args)
    }

    log("--------------------------------------------")
}

const delegate = async function (GovernanceTokenAddress, delegateAccount) {
    const governanceToken = await ethers.getContractAt("GovernanceToken", GovernanceTokenAddress)
    const tx = await governanceToken.delegate(delegateAccount)
    await tx.wait(1)
    console.log(`Checkpoints ${await governanceToken.numCheckpoints(delegateAccount)}`)
}

module.exports.tags = ["all", "nftmarketplace"]
