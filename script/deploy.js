const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("CodeWithJoe", function () {
  let CodeWithJoe;
  let codeWithJoe;
  let owner;
  let addr1;
  let addr2;
  let addrs;

  beforeEach(async function () {
    CodeWithJoe = await ethers.getContractFactory("CodeWithJoe");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    codeWithJoe = await CodeWithJoe.deploy();
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
      await codeWithJoe.transfer(addr1.address, 50);
      const addr1Balance = await codeWithJoe.balanceOf(addr1.address);
      expect(addr1Balance).to.equal(50);

      await codeWithJoe.connect(addr1).transfer(addr2.address, 50);
      const addr2Balance = await codeWithJoe.balanceOf(addr2.address);
      expect(addr2Balance).to.equal(50);
    });

    it("Should fail if sender doesn’t have enough tokens", async function () {
      const initialOwnerBalance = await codeWithJoe.balanceOf(owner.address);

      await expect(
        codeWithJoe.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough tokens");

      expect(await codeWithJoe.balanceOf(owner.address)).to.equal(
        initialOwnerBalance
      );
    });
  });
});
