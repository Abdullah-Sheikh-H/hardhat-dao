import { ethers } from "ethers"

export default async function propose() {
    const governor = await ethers.getContract("GovernorContract")
    const box = await ethers.getContract("Box")
}
