const { loadFixture } = require('@nomicfoundation/hardhat-network-helpers');
const { assert } = require('chai');

describe('Game4', function () {
  async function deployContractAndSetVariables() {
    const Game = await ethers.getContractFactory('Game4');
    const game = await Game.deploy();

    const [address1, address2 ] = await ethers.getSigners();

    return { game, address1, address2 };
  }
  it('should be a winner', async function () {
    const { game, address1, address2 } = await loadFixture(deployContractAndSetVariables);

    // nested mappings are rough :}
    await game.connect(address2).write(address1.address);

    await game.win(address2.address);

    // leave this assertion as-is
    assert(await game.isWon(), 'You did not win the game');
  });
});
