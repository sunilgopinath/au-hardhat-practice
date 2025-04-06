// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract ModifyVariable {
    uint256 public x;

    constructor(uint256 _x) {
        x = _x;
    }

    function modifyToLeet() public {
        x = 1337;
    }
}
