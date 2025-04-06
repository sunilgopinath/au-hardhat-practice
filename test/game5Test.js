const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');
const { Wallet } = require('ethers');

describe('Game5', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game5');
    const game = await Game.deploy();

    return { game };
  }
  it('should be a winner', async function () {
    const { game } = await loadFixture(deployContractAndSetVariables);
    // Get Hardhat signer and provider
    const [signer] = await ethers.getSigners();
    const provider = ethers.provider;

    // good luck
    let wallet;
    do {
      wallet = Wallet.createRandom().connect(provider);
    } while (BigInt(wallet.address) >= BigInt("0x00FfFFfFFFfFFFFFfFfFfffFFFfffFfFffFfFFFf"));
    
    // Fund it so it can send a transaction
    await signer.sendTransaction({
      to: wallet.address,
      value: ethers.parseEther("1"),
    });

    await game.connect(wallet).win();

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
