const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game3', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game3');
    const game = await Game.deploy();

    // Hardhat will create 10 accounts for you by default
    // you can get one of this accounts with ethers.provider.getSigner
    // and passing in the zero-based indexed of the signer you want:
    // Contracts are deployed using the first signer/account by default
    const [signer, address1, address2 ] = await ethers.getSigners();

    // you can get that signer's address via .getAddress()
    // this variable is NOT used for Contract 3, just here as an example
    const address = await signer.getAddress();

    return { game, signer, address1, address2 };
  }

  it('should be a winner', async function () {
    const { game, signer, address1, address2 } = await loadFixture(deployContractAndSetVariables);

    // you'll need to update the `balances` mapping to win this stage

    // to call a contract as a signer you can use contract.connect
  // send ETH to the contract
  await game.connect(signer).buy({ value: ethers.parseEther("2") });
  await game.connect(address1).buy({ value: ethers.parseEther("3") }); // must be greater than signer
  await game.connect(address2).buy({ value: ethers.parseEther("1") }); // must be less than signer


    // TODO: win expects three arguments
    await game.win(signer.address, address1.address, address2.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
