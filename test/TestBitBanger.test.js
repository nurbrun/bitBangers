const BitBanger = artifacts.require("BitBanger");

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('BitBanger', (accounts) => {
  let contract

  before(async () => {
    contract = await BitBanger.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = contract.address
      // console.log('address: '+address)
      assert.notEqual(address, '')
      assert.notEqual(address, '0x0')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })
    it('has a banger bro', async () => {
      const name = await contract.name()
      assert.equal(name, 'BitBanger')
    })
    it('has a symbol sis', async () => {
      const symbol = await contract.symbol()
      assert.equal(symbol, 'BITBANGER')
    })

  })

  describe('minting', async () => {
    it('creates a new banger', async () => {
      const result = await contract.mint('nurbrun')
      const totalSupply = await contract.totalSupply()
      // SUCCESS
      assert.equal(totalSupply, 1)
      // console.log(result.logs[0].args)
      const event = result.logs[0].args
      assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
      assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct')
      assert.equal(event.to, accounts[0], 'msg to is correct')
      assert.equal(totalSupply, 1)

      // FAILURE
      await contract.mint('nurbrun').should.be.rejected;
    })
  })

  describe('indexing', async () => {
    it('lists bangers', async() => {
      await contract.mint('birdman')
      await contract.mint('brio')
      const totalSupply = await contract.totalSupply()
      let bitBanger
      let result = []

      for (var i = 1; i <= totalSupply; i++){
        bitBanger = await contract.bitBangers(i-1)
        result.push(bitBanger)
      }

      let expected = ['nurbrun', 'birdman', 'brio']
      assert.equal(result.join(','), expected.join(','))
    })
  })
})