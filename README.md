# Week 5 Challenge

Today, we will be cloning down some fun smart contract puzzles. In these challenges, you will need to analyze the source code and somehow trigger a win condition. 🏆

The objective is to set this isWon to true without modifying the smart contract.

You will need to analyze the source code of five simplified smart contracts and determine how to solve a puzzle for each one. Once you've figured out the puzzle, modify the test cases to complete the task successfully

## Solution

See the [test](./test/) files

```sh
$> npx hardhat test
```

# Week 4 Challenge

## Smart Contract Winner Challenge

This project demonstrates how to emit an event from a target contract where msg.sender != tx.origin using a proxy contract pattern.

### Overview

The challenge involves triggering the Winner event from a target contract that has a specific requirement: the function caller (msg.sender) must not be the same as the transaction originator (tx.origin).

### Project Structure

`contracts/Contract.sol` - The target contract with the attempt() function
`contracts/ContractProxy.sol` - A proxy contract that calls the target contract
`scripts/ContractProxy.js` - Script to deploy both contracts and execute the call

### How It Works

The target contract has an attempt() function that requires msg.sender != tx.origin
Our proxy contract calls this function, making:

`msg.sender` = proxy contract address
`tx.origin` = the user's wallet address


This satisfies the condition and emits the Winner event

### Contract Code

The target contract:

```solidity
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

contract Contract {
    event Winner(address);

    function attempt() external {
        require(msg.sender != tx.origin, "msg.sender is equal to tx.origin");
        emit Winner(msg.sender);
    }
}
```

Our proxy contract:

```solidity
// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IContract {
    function attempt() external;
}

contract ContractProxy {
    address public target;

    constructor(address _target) {
        target = _target;
    }

    function execute() public {
        IContract(target).attempt();
    }
}
```

### Running the Project

#### Start a local Hardhat node:

```bash
$> npx hardhat node
```

#### Deploy the contracts and execute:

```bash
npx hardhat run scripts/ContractProxy.js --network localhost
```

Check the Hardhat node's console output to see the emitted Winner event.

### Key Learning

This challenge demonstrates:

The difference between msg.sender and tx.origin in Ethereum
How to use contract interactions to meet specific requirements
The proxy pattern for smart contract interaction