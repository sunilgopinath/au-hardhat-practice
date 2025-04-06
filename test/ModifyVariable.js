const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-toolbox/network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("ModifyVariable", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deploy10XFixture() {

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();
    const x = 10;

    const ModifyVariable = await ethers.getContractFactory("ModifyVariable");
    const modifyVariable = await ModifyVariable.deploy(x);

    return { modifyVariable, x, owner, otherAccount };
  }

  describe("TestModifyVariable", function () {
    it("should change x to 1337", async function () {
      const { modifyVariable } = await loadFixture(deploy10XFixture);
      await modifyVariable.modifyToLeet();
      const x = await modifyVariable.x();

      expect(x).to.equal(1337);
    });

  });

});
