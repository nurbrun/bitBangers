# bitBangers

Takes a hexadecimal color value and passes it through a keccak256 hash conversion function. The generated value (colorHash) is unique and used to give each bitBanger different css attributes.

**EXAMPLE**

  _nameColor = #b34180

  function generateValue(string memory _nameColor) private pure returns(bytes32) {
    return keccak256(abi.encodePacked(_nameColor));
  }

  colorHash = generateValue(_nameColor)

  colorHash: "0xf1d8daff6bc500a5136d594add2059f5108be58fa8d1eb2f3872456a42058775"

  RBTLR = (colorHash) => {
    const strippedHash = colorHash.substring(2).replace(/\D/g,'');
      return parseInt(strippedHash[0]+strippedHash[1])
  }

  RBTLR: 18

note: RBTLR is shorthand for "roof border top left radius"

![alt text](https://github.com/nurbrun/bitBangers/blob/master/public/bitBangerReadMe.png?raw=true)

Built using an ERC721 tutorial: https://www.youtube.com/watch?v=YPbgjPPC1d0&ab_channel=DappUniversity

**Frameworks/libraries/standards used**

- ERC 721 Standard: https://eips.ethereum.org/EIPS/eip-721
- Openzepplin-contracts: https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/token/ERC721/ERC721.sol
- web3.js: https://github.com/ChainSafe/web3.js/tree/v1.3.4
- Ganache: https://github.com/trufflesuite/ganache
- ReactJS (16.8.4): https://github.com/facebook/react/tree/16.8.4

*Compatible with MetaMask wallets.
