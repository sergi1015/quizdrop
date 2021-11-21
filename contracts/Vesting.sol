// SPDX-License-Identifier: --🦉--

pragma solidity =0.7.6;

import "./SafeMath.sol";
import "./IERC20.sol";
import "./Ownable.sol";
import "./Declaration.sol";
import "./Events.sol";

contract Vesting is Ownable, Declaration, Events {
    using SafeMath for uint256;

    address public qdropToken;
    address public owner_reward;
    address public owner_ido;
    address public owner_marketing;
    address public owner_advisor;
    address public owner_team;
    address public owner_strategic;
    address public owner_private_sale;

    uint256 public LAUNCH_TIME;

    struct DataReward {
        uint256 available;
        uint256 withdrawn;
    }

    struct DataOther {
        uint256[] available;
        bool[] isWithdrawn;
        uint256 counter;
    }

    DataReward dataReward;
    DataOther dataIDO;
    DataOther dataPrivateSale;
    DataOther dataMarketing;
    DataOther dataAdvisors;
    DataOther dataTeam;
    DataOther dataStrategy;

    constructor(
        address _owner_reward,
        address _owner_ido,
        address _owner_marketing,
        address _owner_advisor,
        address _owner_team,
        address _owner_strategic,
        address _owner_private_sale
    ) {
        owner_reward = _owner_reward;
        owner_ido = _owner_ido;
        owner_marketing = _owner_marketing;
        owner_advisor = _owner_advisor;
        owner_team = _owner_team;
        owner_strategic = _owner_strategic;
        owner_private_sale = _owner_private_sale;
        LAUNCH_TIME = block.timestamp;
    }

    function setQdropTokenAddress(address _qdropToken) public onlyOwner {
        qdropToken = _qdropToken;
    }

    function initialize() public onlyOwner {
        uint256 totalSupply = IERC20(qdropToken).totalSupply();
        dataReward = DataReward(
            totalSupply.mul(PERCENTAGE_REWARD).div(100),
            block.timestamp
        );

        dataIDO.available.push(
            totalSupply.mul(PERCENTAGE_IDO).mul(PERCENTAGE_IDO_TGE).div(10000)
        );
        dataIDO.available.push(
            totalSupply.mul(PERCENTAGE_IDO).mul(PERCENTAGE_IDO_MONTH).div(10000)
        );
        dataIDO.available.push(
            totalSupply.mul(PERCENTAGE_IDO).mul(PERCENTAGE_IDO_MONTH).div(10000)
        );

        dataIDO.isWithdrawn.push(false);
        dataIDO.isWithdrawn.push(false);
        dataIDO.isWithdrawn.push(false);

        dataIDO.counter = 0;

        dataPrivateSale.available.push(
            totalSupply
                .mul(PERCENTAGE_PRIVATE_SALE)
                .mul(PERCENTAGE_PRIVATE_SALE_TGE)
                .div(10000)
        );

        dataPrivateSale.available.push(
            totalSupply
                .mul(PERCENTAGE_PRIVATE_SALE)
                .mul(PERCENTAGE_PRIVATE_SALE_MONTH)
                .div(10000)
        );

        dataPrivateSale.available.push(
            totalSupply
                .mul(PERCENTAGE_PRIVATE_SALE)
                .mul(PERCENTAGE_PRIVATE_SALE_MONTH)
                .div(10000)
        );

        dataPrivateSale.isWithdrawn.push(false);
        dataPrivateSale.isWithdrawn.push(false);
        dataPrivateSale.isWithdrawn.push(false);

        dataPrivateSale.counter = 0;

        dataMarketing.available.push(
            totalSupply
                .mul(PERCENTAGE_MARKETING)
                .mul(PERCENTAGE_MARKETING_MONTH)
                .div(10000)
        );
        dataMarketing.available.push(
            totalSupply
                .mul(PERCENTAGE_MARKETING)
                .mul(PERCENTAGE_MARKETING_MONTH)
                .div(10000)
        );
        dataMarketing.available.push(
            totalSupply
                .mul(PERCENTAGE_MARKETING)
                .mul(PERCENTAGE_MARKETING_MONTH)
                .div(10000)
        );
        dataMarketing.available.push(
            totalSupply
                .mul(PERCENTAGE_MARKETING)
                .mul(PERCENTAGE_MARKETING_MONTH)
                .div(10000)
        );
        dataMarketing.available.push(
            totalSupply
                .mul(PERCENTAGE_MARKETING)
                .mul(PERCENTAGE_MARKETING_MONTH)
                .div(10000)
        );
        dataMarketing.available.push(
            totalSupply
                .mul(PERCENTAGE_MARKETING)
                .mul(PERCENTAGE_MARKETING_MONTH)
                .div(10000)
        );
        dataMarketing.available.push(
            totalSupply
                .mul(PERCENTAGE_MARKETING)
                .mul(PERCENTAGE_MARKETING_MONTH)
                .div(10000)
        );
        dataMarketing.available.push(
            totalSupply
                .mul(PERCENTAGE_MARKETING)
                .mul(PERCENTAGE_MARKETING_MONTH)
                .div(10000)
        );
        dataMarketing.available.push(
            totalSupply
                .mul(PERCENTAGE_MARKETING)
                .mul(PERCENTAGE_MARKETING_MONTH)
                .div(10000)
        );
        dataMarketing.available.push(
            totalSupply
                .mul(PERCENTAGE_MARKETING)
                .mul(PERCENTAGE_MARKETING_MONTH)
                .div(10000)
        );

        dataMarketing.isWithdrawn.push(false);
        dataMarketing.isWithdrawn.push(false);
        dataMarketing.isWithdrawn.push(false);
        dataMarketing.isWithdrawn.push(false);
        dataMarketing.isWithdrawn.push(false);
        dataMarketing.isWithdrawn.push(false);
        dataMarketing.isWithdrawn.push(false);
        dataMarketing.isWithdrawn.push(false);
        dataMarketing.isWithdrawn.push(false);
        dataMarketing.isWithdrawn.push(false);

        dataMarketing.counter = 0;

        dataTeam.available.push(
            totalSupply.mul(PERCENTAGE_TEAM).mul(PERCENTAGE_TEAM_MONTH).div(
                10000
            )
        );
        dataTeam.available.push(
            totalSupply.mul(PERCENTAGE_TEAM).mul(PERCENTAGE_TEAM_MONTH).div(
                10000
            )
        );
        dataTeam.available.push(
            totalSupply.mul(PERCENTAGE_TEAM).mul(PERCENTAGE_TEAM_MONTH).div(
                10000
            )
        );
        dataTeam.available.push(
            totalSupply.mul(PERCENTAGE_TEAM).mul(PERCENTAGE_TEAM_MONTH).div(
                10000
            )
        );
        dataTeam.available.push(
            totalSupply.mul(PERCENTAGE_TEAM).mul(PERCENTAGE_TEAM_MONTH).div(
                10000
            )
        );
        dataTeam.available.push(
            totalSupply.mul(PERCENTAGE_TEAM).mul(PERCENTAGE_TEAM_MONTH).div(
                10000
            )
        );
        dataTeam.available.push(
            totalSupply.mul(PERCENTAGE_TEAM).mul(PERCENTAGE_TEAM_MONTH).div(
                10000
            )
        );
        dataTeam.available.push(
            totalSupply.mul(PERCENTAGE_TEAM).mul(PERCENTAGE_TEAM_MONTH).div(
                10000
            )
        );
        dataTeam.available.push(
            totalSupply.mul(PERCENTAGE_TEAM).mul(PERCENTAGE_TEAM_MONTH).div(
                10000
            )
        );
        dataTeam.available.push(
            totalSupply.mul(PERCENTAGE_TEAM).mul(PERCENTAGE_TEAM_MONTH).div(
                10000
            )
        );

        dataTeam.isWithdrawn.push(false);
        dataTeam.isWithdrawn.push(false);
        dataTeam.isWithdrawn.push(false);
        dataTeam.isWithdrawn.push(false);
        dataTeam.isWithdrawn.push(false);
        dataTeam.isWithdrawn.push(false);
        dataTeam.isWithdrawn.push(false);
        dataTeam.isWithdrawn.push(false);
        dataTeam.isWithdrawn.push(false);
        dataTeam.isWithdrawn.push(false);

        dataTeam.counter = 0;

        dataAdvisors.available.push(
            totalSupply
                .mul(PERCENTAGE_ADVIOSORS_PARTNERS)
                .mul(PERCENTAGE_ADVISORS_PARTNERS_TGE)
                .div(10000)
        );
        dataAdvisors.available.push(
            totalSupply
                .mul(PERCENTAGE_ADVIOSORS_PARTNERS)
                .mul(PERCENTAGE_ADVISORS_PARTNERS_MONTH)
                .div(10000)
        );
        dataAdvisors.available.push(
            totalSupply
                .mul(PERCENTAGE_ADVIOSORS_PARTNERS)
                .mul(PERCENTAGE_ADVISORS_PARTNERS_MONTH)
                .div(10000)
        );
        dataAdvisors.available.push(
            totalSupply
                .mul(PERCENTAGE_ADVIOSORS_PARTNERS)
                .mul(PERCENTAGE_ADVISORS_PARTNERS_MONTH)
                .div(10000)
        );
        dataAdvisors.available.push(
            totalSupply
                .mul(PERCENTAGE_ADVIOSORS_PARTNERS)
                .mul(PERCENTAGE_ADVISORS_PARTNERS_MONTH)
                .div(10000)
        );
        dataAdvisors.available.push(
            totalSupply
                .mul(PERCENTAGE_ADVIOSORS_PARTNERS)
                .mul(PERCENTAGE_ADVISORS_PARTNERS_MONTH)
                .div(10000)
        );
        dataAdvisors.available.push(
            totalSupply
                .mul(PERCENTAGE_ADVIOSORS_PARTNERS)
                .mul(PERCENTAGE_ADVISORS_PARTNERS_MONTH)
                .div(10000)
        );
        dataAdvisors.available.push(
            totalSupply
                .mul(PERCENTAGE_ADVIOSORS_PARTNERS)
                .mul(PERCENTAGE_ADVISORS_PARTNERS_MONTH)
                .div(10000)
        );
        dataAdvisors.available.push(
            totalSupply
                .mul(PERCENTAGE_ADVIOSORS_PARTNERS)
                .mul(PERCENTAGE_ADVISORS_PARTNERS_MONTH)
                .div(10000)
        );

        dataAdvisors.isWithdrawn.push(false);
        dataAdvisors.isWithdrawn.push(false);
        dataAdvisors.isWithdrawn.push(false);
        dataAdvisors.isWithdrawn.push(false);
        dataAdvisors.isWithdrawn.push(false);
        dataAdvisors.isWithdrawn.push(false);
        dataAdvisors.isWithdrawn.push(false);
        dataAdvisors.isWithdrawn.push(false);
        dataAdvisors.isWithdrawn.push(false);

        dataAdvisors.counter = 0;

        dataStrategy.available.push(
            totalSupply
                .mul(PERCENTAGE_STRATEGIC_RESERVE)
                .mul(PERCENTAGE_STRATEGIC_RESERVE_TGE)
                .div(10000)
        );
        dataStrategy.available.push(
            totalSupply
                .mul(PERCENTAGE_STRATEGIC_RESERVE)
                .mul(PERCENTAGE_STRATEGIC_RESERVE_MONTH)
                .div(10000)
        );
        dataStrategy.available.push(
            totalSupply
                .mul(PERCENTAGE_STRATEGIC_RESERVE)
                .mul(PERCENTAGE_STRATEGIC_RESERVE_MONTH)
                .div(10000)
        );
        dataStrategy.available.push(
            totalSupply
                .mul(PERCENTAGE_STRATEGIC_RESERVE)
                .mul(PERCENTAGE_STRATEGIC_RESERVE_MONTH)
                .div(10000)
        );
        dataStrategy.available.push(
            totalSupply
                .mul(PERCENTAGE_STRATEGIC_RESERVE)
                .mul(PERCENTAGE_STRATEGIC_RESERVE_MONTH)
                .div(10000)
        );
        dataStrategy.available.push(
            totalSupply
                .mul(PERCENTAGE_STRATEGIC_RESERVE)
                .mul(PERCENTAGE_STRATEGIC_RESERVE_MONTH)
                .div(10000)
        );
        dataStrategy.available.push(
            totalSupply
                .mul(PERCENTAGE_STRATEGIC_RESERVE)
                .mul(PERCENTAGE_STRATEGIC_RESERVE_MONTH)
                .div(10000)
        );
        dataStrategy.available.push(
            totalSupply
                .mul(PERCENTAGE_STRATEGIC_RESERVE)
                .mul(PERCENTAGE_STRATEGIC_RESERVE_MONTH)
                .div(10000)
        );
        dataStrategy.available.push(
            totalSupply
                .mul(PERCENTAGE_STRATEGIC_RESERVE)
                .mul(PERCENTAGE_STRATEGIC_RESERVE_MONTH)
                .div(10000)
        );

        dataStrategy.isWithdrawn.push(false);
        dataStrategy.isWithdrawn.push(false);
        dataStrategy.isWithdrawn.push(false);
        dataStrategy.isWithdrawn.push(false);
        dataStrategy.isWithdrawn.push(false);
        dataStrategy.isWithdrawn.push(false);
        dataStrategy.isWithdrawn.push(false);
        dataStrategy.isWithdrawn.push(false);
        dataStrategy.isWithdrawn.push(false);

        dataStrategy.counter = 0;
    }

    function withdrawRewardToken(uint256 amount) public {
        require(
            owner_reward == _msgSender(),
            "Ownable: caller is not the reward owner"
        );
        require(amount <= dataReward.available, "Invalid amount");
        dataReward.available = dataReward.available - amount;
        IERC20(qdropToken).transfer(owner_reward, amount);
        emit Withdraw_Reward(owner_reward, amount);
    }

    function withdrawIDOToken() public {
        uint256 _counter = dataIDO.counter;
        uint256 current = block.timestamp;
        require(_counter < 3, "Already withdrawn all");
        require(
            owner_ido == _msgSender(),
            "Ownable: caller is not the ido owner"
        );
        require(
            _counter == 0 || !dataIDO.isWithdrawn[_counter],
            "Withdraw: already withdrawn for this month"
        );
        require(
            (LAUNCH_TIME + _counter * DAYS_IN_MONTH * SECONDS_IN_DAY) <
                current &&
                current <
                (LAUNCH_TIME + (_counter + 1) * DAYS_IN_MONTH * SECONDS_IN_DAY),
            "Invalid withdrawn"
        );

        IERC20(qdropToken).transfer(owner_ido, dataIDO.available[_counter]);
        dataIDO.counter = _counter + 1;
        dataIDO.isWithdrawn[_counter] = true;
        emit Withdraw_Ido(owner_ido, dataIDO.available[_counter]);
    }

    function withdrawPrivateSaleToken() public {
        uint256 _counter = dataPrivateSale.counter;
        uint256 current = block.timestamp;
        require(_counter < 3, "Already withdrawn all");
        require(
            owner_private_sale == _msgSender(),
            "Ownable: caller is not the private sale owner"
        );
        require(
            _counter == 0 || !dataPrivateSale.isWithdrawn[_counter],
            "Withdraw: already withdrawn for this month"
        );
        require(
            (LAUNCH_TIME + _counter * DAYS_IN_MONTH * SECONDS_IN_DAY) <
                current &&
                current <
                (LAUNCH_TIME + (_counter + 1) * DAYS_IN_MONTH * SECONDS_IN_DAY),
            "Invalid withdrawn"
        );

        IERC20(qdropToken).transfer(
            owner_private_sale,
            dataPrivateSale.available[_counter]
        );
        dataPrivateSale.counter = _counter + 1;
        dataPrivateSale.isWithdrawn[_counter] = true;
        emit Withdraw_Private_sale(
            owner_private_sale,
            dataPrivateSale.available[_counter]
        );
    }

    function withdrawMarketingToken() public {
        uint256 _counter = dataMarketing.counter;
        uint256 current = block.timestamp;
        require(_counter < 10, "Already withdrawn all");
        require(
            owner_marketing == _msgSender(),
            "Ownable: caller is not the marketing owner"
        );
        require(
            _counter == 0 || !dataMarketing.isWithdrawn[_counter],
            "Withdraw: already withdrawn for this month"
        );
        require(
            (LAUNCH_TIME + _counter * DAYS_IN_MONTH * SECONDS_IN_DAY) <
                current &&
                current <
                (LAUNCH_TIME + (_counter + 1) * DAYS_IN_MONTH * SECONDS_IN_DAY),
            "Invalid withdrawn"
        );

        IERC20(qdropToken).transfer(
            owner_marketing,
            dataMarketing.available[_counter]
        );
        dataMarketing.counter = _counter + 1;
        dataMarketing.isWithdrawn[_counter] = true;
        emit Withdraw_Marketing(
            owner_marketing,
            dataMarketing.available[_counter]
        );
    }

    function withdrawAdvisorToken() public {
        uint256 _counter = dataAdvisors.counter;
        uint256 current = block.timestamp;
        require(_counter < 9, "Already withdrawn all");
        require(
            owner_advisor == _msgSender(),
            "Ownable: caller is not the advisor owner"
        );
        require(
            _counter == 0 || !dataAdvisors.isWithdrawn[_counter],
            "Withdraw: already withdrawn for this month"
        );
        require(
            (LAUNCH_TIME + _counter * DAYS_IN_MONTH * SECONDS_IN_DAY) <
                current &&
                current <
                (LAUNCH_TIME + (_counter + 1) * DAYS_IN_MONTH * SECONDS_IN_DAY),
            "Invalid withdrawn"
        );

        IERC20(qdropToken).transfer(
            owner_advisor,
            dataAdvisors.available[_counter]
        );
        dataAdvisors.counter = _counter + 1;
        dataAdvisors.isWithdrawn[_counter] = true;
        emit Withdraw_Advisor(owner_advisor, dataAdvisors.available[_counter]);
    }

    function withdrawTeamToken() public {
        uint256 _counter = dataTeam.counter;
        uint256 current = block.timestamp;
        require(_counter < 10, "Already withdrawn all");
        require(
            owner_team == _msgSender(),
            "Ownable: caller is not the team owner"
        );
        require(
            _counter == 0 || !dataTeam.isWithdrawn[_counter],
            "Withdraw: already withdrawn for this month"
        );
        require(
            (LAUNCH_TIME + _counter * DAYS_IN_MONTH * SECONDS_IN_DAY) <
                current &&
                current <
                (LAUNCH_TIME + (_counter + 1) * DAYS_IN_MONTH * SECONDS_IN_DAY),
            "Invalid withdrawn"
        );

        IERC20(qdropToken).transfer(owner_team, dataTeam.available[_counter]);
        dataTeam.counter = _counter + 1;
        dataTeam.isWithdrawn[_counter] = true;
        emit Withdraw_Team(owner_team, dataTeam.available[_counter]);
    }

    function withdrawStrategyToken() public {
        uint256 _counter = dataStrategy.counter;
        uint256 current = block.timestamp;
        require(_counter < 9, "Already withdrawn all");
        require(
            owner_strategic == _msgSender(),
            "Ownable: caller is not the strategic owner"
        );
        require(
            _counter == 0 || !dataStrategy.isWithdrawn[_counter],
            "Withdraw: already withdrawn for this month"
        );
        require(
            (LAUNCH_TIME + _counter * DAYS_IN_MONTH * SECONDS_IN_DAY) <
                current &&
                current <
                (LAUNCH_TIME + (_counter + 1) * DAYS_IN_MONTH * SECONDS_IN_DAY),
            "Invalid withdrawn"
        );

        IERC20(qdropToken).transfer(
            owner_strategic,
            dataStrategy.available[_counter]
        );
        dataStrategy.counter = _counter + 1;
        dataStrategy.isWithdrawn[_counter] = true;
        emit Withdraw_Strategic(
            owner_strategic,
            dataStrategy.available[_counter]
        );
    }
}
