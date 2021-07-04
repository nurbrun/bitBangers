# bitBangers

Takes a hexadecimal color value and passes it through a keccak256 hash conversion function. The generated value (colorHash) is unique and used to give each bitBanger different css attributes.

EXAMPLE

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
