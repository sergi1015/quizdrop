// SPDX-License-Identifier: --🦉--

pragma solidity =0.7.6;

library SafeMath8 {

    function add(uint8 a, uint8 b) internal pure returns (uint8) {
        uint8 c = a + b;
        require(c >= a);
        return c;
    }

    function sub(uint8 a, uint8 b) internal pure returns (uint8) {
        require(b <= a);
        uint8 c = a - b;
        return c;
    }

    function mul(uint8 a, uint8 b) internal pure returns (uint8) {

        if (a == 0) {
            return 0;
        }

        uint8 c = a * b;
        require(c / a == b);
        return c;
    }

    function div(uint8 a, uint8 b) internal pure returns (uint8) {
        require(b > 0);
        uint8 c = a / b;
        return c;
    }

    function mod(uint8 a, uint8 b) internal pure returns (uint8) {
        require(b != 0);
        return a % b;
    }
}
