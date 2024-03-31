const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RansomCoin", function () {
  let RansomCoin;
  let RansomCoin;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    RansomCoin = await ethers.getContractFactory("RansomCoin");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    RansomCoin = await CodeWithJoe.deploy();
    await codeWithJoe.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right total supply", async function () {
      const ownerBalance = await codeWithJoe.balanceOf(owner.address);
      expect(await codeWithJoe.totalSupply()).to.equal(ownerBalance);
    });

    it("Should assign the total supply to the owner", async function () {
      const ownerBalance = await codeWithJoe.balanceOf(owner.address);
      expect(await codeWithJoe.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transactions", function () {
    it("Should transfer tokens between accounts", async function () {
      await RansomCoin.transfer(addr1.address, 50);
      const addr1Balance = await RansomCoin.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await RansomCoin.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await RansomCoin.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await RansomCoin.balanceOf(owner.address);

      await expect(
        RansomCoin.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await RansomCoin.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});
