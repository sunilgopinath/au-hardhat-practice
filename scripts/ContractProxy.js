const hre = require("hardhat");

async function main() {
    
    // DEPLOY TARGET CONTRACT
    const Contract = await hre.ethers.getContractFactory("Contract");
    const contract = await Contract.deploy();
    const contractAddress = await contract.getAddress();
    console.log("Contract deployed to:", contractAddress);

    const ContractProxy = await hre.ethers.getContractFactory("ContractProxy");
    const contractProxy = await ContractProxy.deploy(contractAddress);
    const proxyAddress = await contractProxy.getAddress();
    console.log("ContractProxy deployed to:", proxyAddress);

    // Interact with the deployed contract
    const tx = await contractProxy.execute();
    const receipt = await tx.wait();

    // Check for the Winner event in the logs
    for (const event of receipt.logs) {
        // Try to parse as Winner event
        try {
            // This assumes your Contract ABI is available
            const parsedLog = contract.interface.parseLog(event);
            if (parsedLog && parsedLog.name === 'Winner') {
                console.log("Winner event emitted!");
                console.log("Winner address:", parsedLog.args[0]);
            }
        } catch (e) {
            // Not this event, continue
        }
    }
    
}

main();