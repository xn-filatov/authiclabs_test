import { HardhatEthersSigner } from "@nomicfoundation/hardhat-ethers/signers";
import {
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { expect } from "chai";
import { ethers } from "hardhat";
import { deploySettings } from "../scripts/settings"
import { DefaultNFT } from "../typechain-types";

describe("DefaultNFT Unit Test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount1, otherAccount2] = await ethers.getSigners();

    const DefaultNFT = await ethers.getContractFactory("DefaultNFT");
    const defaultNft = await DefaultNFT.deploy(deploySettings.contractName, deploySettings.contractSymbol);

    return { defaultNft, owner, otherAccount1, otherAccount2 };
  }

  let defaultNft: DefaultNFT,
    owner: HardhatEthersSigner,
    otherAccount1: HardhatEthersSigner,
    otherAccount2: HardhatEthersSigner;

  describe("Ownership", function () {
    beforeEach(async function () {
      const result = await loadFixture(deployFixture)
      defaultNft = result.defaultNft;
      owner = result.owner;
      otherAccount1 = result.otherAccount1;
      otherAccount2 = result.otherAccount2;
    });

    it("Should set the right owner", async function () {
      expect(await defaultNft.owner()).to.equal(owner.address);
    });

    it("Should transfer ownership correctly", async function () {
      await defaultNft.transferOwnership(otherAccount1.address);
      expect(await defaultNft.owner()).to.equal(otherAccount1.address);
    });

    it("Should prevent non-owners from transferring ownership", async function () {
      await expect(defaultNft.connect(otherAccount1).transferOwnership(otherAccount2.address)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });

    it("Should prevent non-owners from minting NFTs", async function () {
      const mintQuantity = 5;
      await expect(defaultNft.connect(otherAccount1).mint(mintQuantity, otherAccount2.address)).to.be.revertedWith(
        "Ownable: caller is not the owner"
      );
    });
  });

  describe("Minting", function () {
    beforeEach(async function () {
      const result = await loadFixture(deployFixture)
      defaultNft = result.defaultNft;
      owner = result.owner;
      otherAccount1 = result.otherAccount1;
    });

    it("Should mint an NFT and set the correct owner", async function () {
      const mintQuantity = 1;
      await defaultNft.connect(owner).mint(mintQuantity, otherAccount1.address);
      const ownerOfToken = await defaultNft.ownerOf(0);
      expect(ownerOfToken).to.equal(otherAccount1.address);
    });

    it("Should return the correct balance of an address", async function () {
      const mintQuantity = 5;
      await defaultNft.connect(owner).mint(mintQuantity, otherAccount1.address);
      const balanceOfAcc1 = await defaultNft.balanceOf(otherAccount1.address);
      expect(balanceOfAcc1).to.equal(mintQuantity);
    });
  });
});
