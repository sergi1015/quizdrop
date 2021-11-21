// SPDX-License-Identifier: --🦉--

pragma solidity =0.7.6;

import "./SafeMath.sol";
import "./SafeMath8.sol";
import "./IERC20.sol";
import "./Context.sol";
import "./Ownable.sol";
import "./Declaration.sol";
import "./Events.sol";
import "./QdropToken.sol";

contract GameReward is Ownable, Declaration, Events {
    using SafeMath for uint256;
    using SafeMath8 for uint8;

    address public qdropToken;
    address public TaxAddress;
    
    struct DataReward {
        uint lastTimeStamp;
        uint256 totalRewards;
    }

    struct DataLock{
        bool locked;
        uint8 membership;
        uint lastLockTimeStamp;
    }

    mapping (address => DataReward) private _rewards;
    mapping (address => DataLock) private _locks;

    constructor (address _qdropToken) {
        qdropToken = _qdropToken;
        QdropToken qdropContract = QdropToken(_qdropToken);
        TaxAddress = qdropContract.getTaxAddress();
    }

    function addReward(address _to, uint256 amount) public returns (bool) {
        require(_to != address(0x0));
        uint256 balance = IERC20(qdropToken).balanceOf(_owner);
        uint256 allowance = IERC20(qdropToken).allowance(address(this), _to);
        require(amount <= balance, "No available funds.");
        require(IERC20(qdropToken).approve(_to, allowance + amount), "Appove function is not work");
        _rewards[_to].totalRewards += amount;

        emit Reward(
            _to,
            amount
        );
        return true;
    }

    function claim(address _to, uint256 amount) public returns(bool){
        DataReward memory _reward = _rewards[_to];
        require(_to != address(0x0));
        uint256 balance = IERC20(qdropToken).balanceOf(_owner);
        require(_reward.totalRewards != 0 && _reward.totalRewards <= balance, "No available funds.");
        _rewards[_to].totalRewards = _rewards[_to].totalRewards.sub(amount);

        if(_reward.lastTimeStamp + 7 days > block.timestamp)
            amount = amount.sub(amount.mul(PERCENTAGE_TAX).div(100));

        _rewards[_to].lastTimeStamp = block.timestamp;
        IERC20(qdropToken).transferFrom(_owner, _to, amount);

        emit Claim(
            _to,
            amount
        );
        return true;
    }

    function lock(address _from, uint256 amount) public returns(bool){
        require(_from != address(0x0) && !_locks[_from].locked, "Something wrong in Lock");

        _locks[_from].locked = true;
        _locks[_from].membership = uint8(amount.div(1 ether).div(2));
        _locks[_from].lastLockTimeStamp = block.timestamp;

        IERC20(qdropToken).approve(TaxAddress, amount);
        IERC20(qdropToken).transferFrom(_from, TaxAddress, amount);

        emit Lock(
            _from,
            amount
        );
        return true;
    }

    function unLock(address _to) public returns(bool){
        DataLock memory _lock = _locks[_to];
        uint256 amount = uint256(_lock.membership).mul(1 ether).mul(2);
        uint256 tax;

        require(_to != address(0x0) && _lock.locked,"Wrong address or address not locked in unLock");

        if(_lock.lastLockTimeStamp + 7 days > block.timestamp){
            tax = amount.mul(PERCENTAGE_TAX).div(100);
        }

        _locks[_to].locked = false;

        IERC20(qdropToken).approve(_to, amount.sub(tax));
        IERC20(qdropToken).transferFrom(TaxAddress, _to, amount.sub(tax));

        if(tax != 0){
            IERC20(qdropToken).approve(_owner, tax);
            IERC20(qdropToken).transferFrom(TaxAddress, _owner, tax);
        }

        emit UnLock(
            _to
        );

        return true;
    }

    function reward(address _to) public view returns (uint256, uint, address, address) {
        DataReward memory _reward = _rewards[_to];
        return (_reward.totalRewards, _reward.lastTimeStamp, msg.sender, TaxAddress);
    }

    function checkLock(address _from) public view returns(bool, uint8, uint256){
        return (_locks[_from].locked, _locks[_from].membership, _locks[_from].lastLockTimeStamp);
    }
}