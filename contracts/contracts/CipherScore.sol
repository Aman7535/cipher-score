// SPDX-License-Identifier: MIT
pragma solidity ^0.8.27;

contract CipherScore {
    uint32 public lastScore;
    bool public lastApproved;

    function calculateEncryptedScore(uint32[] calldata inputs) external {
        require(inputs.length == 4, "Need 4 inputs");

        uint32 sum =
            inputs[0] +
            inputs[1] +
            inputs[2] +
            inputs[3];

        lastScore = sum;
        lastApproved = sum >= 50;
    }
}
