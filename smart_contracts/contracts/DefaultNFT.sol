// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Uncomment this line to use console.log
// import "hardhat/console.sol";

import "./ERC721.sol";

contract DefaultNFT is Ownable, ERC721 {
    constructor(
        string memory _name,
        string memory _symbol
    ) ERC721(_name, _symbol) {}

    uint256 public constant MAX_SUPPLY = 1000;
    uint256 public totalSupply = 0;

    function mint(uint256 _quantity, address to) external onlyOwner {
        require(
            totalSupply < MAX_SUPPLY,
            "DefaultNFT::mint: Maximum supply is reached."
        );
        require(_quantity > 0, "DefaultNFT::mint: Quantity cannot be zero.");
        require(
            totalSupply + _quantity <= MAX_SUPPLY,
            "DefaultNFT::mint: Sold out."
        );
        require(
            to != address(0),
            "DefaultNFT::mint: Receiver address can not be zero."
        );

        for (uint256 i = 0; i < _quantity; i++) {
            _safeMint(to, totalSupply);
            totalSupply++;
        }
    }
}
