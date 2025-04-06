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
