// SPDX-License-Identifier: --🦉--

pragma solidity =0.7.6;

contract Events {

    event Withdraw_Reward (
        address indexed withdrawOwner,
        uint256 withdrawAmount
    );

    event Withdraw_Ido (
        address indexed withdrawOwner,
        uint256 withdrawAmount
    );

    event Withdraw_Marketing (
        address indexed withdrawOwner,
        uint256 withdrawAmount
    );

    event Withdraw_Advisor (
        address indexed withdrawOwner,
        uint256 withdrawAmount
    );

    event Withdraw_Team (
        address indexed withdrawOwner,
        uint256 withdrawAmount
    );

    event Withdraw_Strategic (
        address indexed withdrawOwner,
        uint256 withdrawAmount
    );

    event Withdraw_Private_sale (
        address indexed withdrawOwner,
        uint256 withdrawAmount
    );
    
    event Reward(
        address indexed to,
        uint256 value
    );

    event Claim(
        address indexed to,
        uint256 value
    );

    event Lock(
        address indexed from,
        uint256 value
    );

    event UnLock(
        address indexed from
    );
}