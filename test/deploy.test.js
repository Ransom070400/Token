const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("MyToken", function () {
  let MyToken, myToken, owner, addr1, addr2, tokenCap, tokenBlockReward;

  beforeEach(async function () {
    // Get the ContractFactory and Signers here.
    MyToken = await ethers.getContractFactory("MyToken");
    [owner, addr1, addr2] = await ethers.getSigners();

    tokenCap = 100000000;
    tokenBlockReward = 50;
    myToken = await MyToken.deploy(tokenCap, tokenBlockReward);
    await myToken.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await myToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of tokens to the owner", async function () {
      const ownerBalance = await myToken.balanceOf(owner.address);
      expect(await myToken.totalSupply()).to.equal(ownerBalance);
    });

    it("Should set the max capped supply to the argument provided during deployment", async function () {
      const cap = await myToken.cap();
      expect(Number(ethers.utils.formatEther(cap))).to.equal(tokenCap);
    });

    it("Should set the blockReward to the argument provided during deployment", async function () {
      const blockReward = await myToken.blockReward();
      expect(Number(ethers.utils.formatEther(blockReward))).to.equal(tokenBlockReward);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await myToken.transfer(addr1.address, 100);
      const addr1Balance = await myToken.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(100);

      await myToken.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await myToken.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await myToken.balanceOf(owner.address);

      await expect(
        myToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await myToken.balanceOf(owner.address)).to.equal(initialOwnerBalance);
    });
  });
});
