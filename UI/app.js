const hre = require("hardhat");

const provider = hre.ethers.getDefaultProvider("http://localhost:8545");
const wallet = new hre.ethers.Wallet(
  "your_private_key_here",
  provider
);
const signer = wallet.connect(provider);

const contractAddress = "0x6bd66c18bC1a24e939BCa1a578bF461856a75bd7";
const abi = [
  // insert the ABI of your Ransom Coin contract here
];

const contract = new hre.ethers.Contract(contractAddress, abi, signer);

async function updateBalance() {
  const balance = await contract.balanceOf(wallet.address);
  document.getElementById("balance").innerHTML = hre.ethers.utils.formatEther(
    balance
  );
}

async function transfer() {
  const toAddress = "address_to_transfer_to_here";
  const amount = hre.ethers.utils.parseEther("1");

  const tx = await contract.transfer(toAddress, amount);
  await tx.wait();

  updateBalance();
}

updateBalance();

document.getElementById("transfer").addEventListener("click", transfer);