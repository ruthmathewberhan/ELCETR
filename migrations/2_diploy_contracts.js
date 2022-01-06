const Education = artifacts.require("Education.sol");

module.exports = function(deployer) {
  deployer.deploy(Education);
};
