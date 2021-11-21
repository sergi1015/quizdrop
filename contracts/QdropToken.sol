// SPDX-License-Identifier: --🦉--

pragma solidity =0.7.6;

import "./SafeMath.sol";
import "./Context.sol";
import "./Ownable.sol";
import "./Declaration.sol";
import "./GameReward.sol";

contract QdropToken is Context, Ownable, Declaration {

    using SafeMath for uint256;

    mapping (address => uint256) private _balances;
    mapping (address => mapping (address => uint256)) private _allowances;

    /**
     * @dev initial private
     */
    string private _name = "Quiz drop";
    string private _symbol = "Qdrop";
    uint8 private _decimals = 18;
    
    address public TaxAddress;
    /**
     * @dev 👻 ghost supply - unclaimable
     */
    uint256 private _totalSupply = 2000000 ether;
    // address public TaxAddress;
    event Transfer(
        address indexed from,
        address indexed to,
        uint256 value
    );

    event Approval(
        address indexed owner,
        address indexed spender,
        uint256 value
    );

    // constructor (address payable vestingContract) {
    constructor (address payable _TaxAddress) {
        _balances[_owner] = _totalSupply;
        TaxAddress  = _TaxAddress;
        emit Transfer(address(0x0), _owner, _totalSupply);
        // emit Transfer(address(0x0), vestingContract, _totalSupply);
    }
    
    function getTaxAddress() public view returns (address){
        return TaxAddress;
    }
    /**
     * @dev Returns the name of the token.
     */
    function name() public view returns (string memory) {
        return _name;
    }

    /**
     * @dev Returns the symbol of the token.
     */
    function symbol() public view returns (string memory) {
        return _symbol;
    }

    /**
     * @dev Returns the decimals of the token.
     */
    function decimals() public view returns (uint8) {
        return _decimals;
    }

    /**
     * @dev Returns the total supply of the token.
     */
    function totalSupply() public view returns (uint256) {
        return _totalSupply;
    }

    /**
     * @dev Returns the token balance of specific address.
     */
    function balanceOf(address account) public view returns (uint256) {
        return _balances[account];
    }

    function mint(address account, uint256 amount) public returns (bool) {
        _mint(account, amount);
        return true;
    }

    function transfer(
        address recipient,
        uint256 amount
    )
        public
        returns (bool)
    {
        require(amount != 0, "can not transfer 0 amount");
        uint256 tax = amount.mul(PERCENTAGE_TAX).div(100);
        
        //send user amount except tax
        _transfer(
            _msgSender(),
            recipient,
            amount.sub(tax)
        );
        
        //send tax to Tax address
        _transfer(
            _msgSender(),
            TaxAddress,
            tax
        );
        
        return true;
    }

    /**
     * @dev Returns approved balance to be spent by another address
     * by using transferFrom method
     */
    function allowance(
        address owner,
        address spender
    )
        public
        view
        returns (uint256)
    {
        return _allowances[owner][spender];
    }

    /**
     * @dev Sets the token allowance to another spender
     */
    function approve(
        address spender,
        uint256 amount
    )
        public
        returns (bool)
    {
        _approve(
            _msgSender(),
            spender,
            amount
        );

        return true;
    }

    /**
     * @dev Allows to transfer tokens on senders behalf
     * based on allowance approved for the executer
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    )
        public
        returns (bool)
    {
        require(amount <= _allowances[_msgSender()][recipient], "there's now allowed ballance");
        _approve(_msgSender(),
            recipient, _allowances[_msgSender()][recipient].sub(
                amount
            )
        );

        _transfer(
            sender,
            recipient,
            amount
        );
        return true;
    }

    /**
     * @dev Moves tokens `amount` from `sender` to `recipient`.
     *
     * Emits a {Transfer} event.
     * Requirements:
     *
     * - `sender` cannot be the zero address.
     * - `recipient` cannot be the zero address.
     * - `sender` must have a balance of at least `amount`.
     */
    function _transfer(
        address sender,
        address recipient,
        uint256 amount
    )
        internal
        virtual
    {
        require(
            sender != address(0x0)
        );

        require(
            recipient != address(0x0)
        );

        _balances[sender] =
        _balances[sender].sub(amount);

        _balances[recipient] =
        _balances[recipient].add(amount);

        emit Transfer(
            sender,
            recipient,
            amount
        );
    }

    /** @dev Creates `amount` tokens and assigns them to `account`, increasing
     * the total supply.
     *
     * Emits a {Transfer} event with `from` set to the zero address.
     * Requirements:
     *
     * - `to` cannot be the zero address.
     */
    function _mint(
        address account,
        uint256 amount
    )
        internal
        virtual
    {
        require(
            account != address(0x0)
        );

        _totalSupply =
        _totalSupply.add(amount);

        _balances[account] =
        _balances[account].add(amount);

        emit Transfer(
            address(0x0),
            account,
            amount
        );
    }

    /**
     * @dev Allows to burn tokens if token sender
     * wants to reduce totalSupply() of the token
     */
    function burn(
        uint256 amount
    )
        external
    {
        _burn(msg.sender, amount);
    }

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the
     * total supply.
     *
     * Emits a {Transfer} event with `to` set to the zero address.
     *
     * Requirements:
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     */
    function _burn(
        address account,
        uint256 amount
    )
        internal
        virtual
    {
        require(
            account != address(0x0)
        );

        _balances[account] =
        _balances[account].sub(amount);

        _totalSupply =
        _totalSupply.sub(amount);

        emit Transfer(
            account,
            address(0x0),
            amount
        );
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner`s tokens.
     * Emits an {Approval} event.
     *
     * Requirements:
     *
     * - `owner` cannot be the zero address.
     * - `spender` cannot be the zero address.
     */
    function _approve(
        address owner,
        address spender,
        uint256 amount
    )
        internal
        virtual
    {
        require(
            owner != address(0x0)
        );

        require(
            spender != address(0x0)
        );

        _allowances[owner][spender] = amount;

        emit Approval(
            owner,
            spender,
            amount
        );
    }


}