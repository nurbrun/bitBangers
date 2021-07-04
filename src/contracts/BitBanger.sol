pragma solidity 0.5.0;

// correct version
import "@openzeppelin/contracts/token/ERC721/ERC721Full.sol";

contract BitBanger is ERC721Full  {
  BitBanger[] public bitBangers;
  struct BitBanger {
    string nameColor;
    uint miles;
    uint roof;
    uint body;
    uint rims;
    uint tires;
    bytes32 colorHash;
  }
  mapping(string => bool) _bitBangerExists;
  // contructors get run the first time a contract is run on the blockchain. similar to an initializer in OOP.
  constructor () ERC721Full("BitBanger", "BITBANGER") public {
  }

  function generateValue(string memory _nameColor) private pure returns(bytes32) {
    return keccak256(abi.encodePacked(_nameColor));
  }

  function mint(string memory _nameColor) public {
    // Require unique color
    require(!_bitBangerExists[_nameColor]);
    // generate measurement values here
    bytes32 _colorHash = generateValue(_nameColor);
    uint _id = bitBangers.push(BitBanger(_nameColor, 420, 1, 1, 1, 1, _colorHash));
    _mint(msg.sender, _id);
    _bitBangerExists[_nameColor] = true;
  }

}


// add variables to banger contract
// generate measurements on seed



// roof
// // background-color: grey to black [secret gold!?];
// RBTLR: border-top-left-radius: 0px-100px:
// RBTRR: border-top-right-radius: 50%-100%:

// body
// background-color: [user-selected, unique]:
// BBTLR: border-top-left-radius: 0px-45px
// BBTLR: border-top-right-radius: 0px-45px


// rims
// RW: width: 65% [55%-70%];
// RH: height: 65% [55%-70%];
// // background: grey to black [secret gold!?];

// tires
// TH: height: 65px [55px-70px];
// TW: width: 65px [55px-70px];
// // background: black;
