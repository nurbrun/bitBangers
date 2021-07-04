import React, { Component } from 'react';
import Web3 from 'web3';
import detectEthereumProvider from '@metamask/detect-provider'
import logo from '../logo.png';
import './App.css';
import BitBanger from '../abis/BitBanger.json'

class App extends Component {

  async componentWillMount(){
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3(){
    const provider = await detectEthereumProvider()
    if (provider) {
      console.log('Ethereum successfully detected!')
      // From now on, this should always be true:
      // provider === window.ethereum
      window.web3 = new Web3(window.web3.currentProvider)
      const chainId = await provider.request({
        method: 'eth_chainId'
      })
    } else {
      console.log('Please install MetaMask!')
    }
  }

  async loadBlockchainData(){
    const web3 = window.web3
    const accounts = await web3.eth.getAccounts();
    // const accounts = await window.ethereum.request({ method: 'eth_accounts' });
    this.setState({account: accounts[0]});

    const networkId = await web3.eth.net.getId()
    const networkData = BitBanger.networks[networkId]
    if (networkData) {
      const abi = BitBanger.abi
      const address = networkData.address
      const contract = new web3.eth.Contract(abi, address)
      this.setState({ contract })
      const totalSupply = await contract.methods.totalSupply().call()
      this.setState({ totalSupply})
      console.log(totalSupply)
      // debugger;
      for (var i = 1; i <= totalSupply; i++){
        const bitBanger = await contract.methods.bitBangers(i-1).call()
        console.log(bitBanger)
        // debugger;
        this.setState({
          bitBangers: [...this.state.bitBangers, JSON.stringify(bitBanger)]
        })
      }
      console.log(this.state.bitBangers[0])
    } else {
      window.alert('no smart contract on the network, do meta mask stuff')
    }    
  }

  mint = (bitBanger) => {
    console.log(bitBanger)
    this.state.contract.methods.mint(bitBanger).send({from: this.state.account})
    .once('receipt', (receipt) => {
      this.setState({
        bitBangers: [...this.state.bitBangers, bitBanger]
      })
    })
  }

  constructor(props){
    super(props);
    this.state = { 
      account: '',
      contract: null,
      totalSupply: 0,
      bitBangers: []
    };
  }

// "roof-border-top-left-radius":parseInt(strippedHash[0]+strippedHash[1]),
// "roof-border-top-right-radius":parseInt(strippedHash[2]+strippedHash[3]),
// "body-border-top-left-radius":parseInt(strippedHash[4]+strippedHash[5]),
// "body-border-top-right-radius":parseInt(strippedHash[6]+strippedHash[7]),
// "rim-width":parseInt(strippedHash[8]+strippedHash[9]),
// "rim-height":parseInt(strippedHash[10]+strippedHash[11]),
// "tire-width":parseInt(strippedHash[12]+strippedHash[13]),
// "tire-height":parseInt(strippedHash[14]+strippedHash[15])

  RBTLR = (colorHash) => {
    const strippedHash = colorHash.substring(2).replace(/\D/g,'');
      return parseInt(strippedHash[0]+strippedHash[1])
  }
  RBTRR = (colorHash) => {
    const strippedHash = colorHash.substring(2).replace(/\D/g,'');
      return parseInt(strippedHash[2]+strippedHash[3])
  }
  BBTRR = (colorHash) => {
    const strippedHash = colorHash.substring(2).replace(/\D/g,'');
      return parseInt(strippedHash[4]+strippedHash[5])
  }
  BBTLR = (colorHash) => {
    const strippedHash = colorHash.substring(2).replace(/\D/g,'');
      return parseInt(strippedHash[6]+strippedHash[7])
  }
  RW = (colorHash) => {
    const strippedHash = colorHash.substring(2).replace(/\D/g,'');
      return parseInt(strippedHash[8]+strippedHash[9])
  }
  RH = (colorHash) => {
    const strippedHash = colorHash.substring(2).replace(/\D/g,'');
      return parseInt(strippedHash[10]+strippedHash[11])
  }
  TH = (colorHash) => {
    const strippedHash = colorHash.substring(2).replace(/\D/g,'');
      return parseInt(strippedHash[12]+strippedHash[13])
  }
  TW = (colorHash) => {
    const strippedHash = colorHash.substring(2).replace(/\D/g,'');
      return parseInt(strippedHash[14]+strippedHash[15])
  }

  render() {
    return (
      <div>
        <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
          <a
            className="navbar-brand col-sm-3 col-md-2 mr-0"
            href="http://www.dappuniversity.com/bootcamp"
            target="_blank"
            rel="noopener noreferrer"
          >
            Bit Bangerz
          </a>
          <ul className="navbar-nav">
            <li className="nav-item active">
              <a className="nav-link" href="#">{this.state.account}<span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </nav>
        <div className="container-fluid mt-5">
          <div className="row">
            <main role="main" className="col-lg-12 d-flex text-center">
              <div className="content mr-auto ml-auto">
                <h1>Mint Bit Banger</h1>
                <form onSubmit={(event) =>{
                  event.preventDefault()
                  const bitBanger = this.bitBanger.value
                  this.mint(bitBanger)
                }}>
                  <input 
                    type="text"
                    className="form-control mb-1"
                    placeholder="e.g. #FFFFFF"
                    ref={(input) => {this.bitBanger = input}}
                  />
                  <input 
                    type="submit" 
                    className="btn btn-block btn-primary"
                    value="MINT"
                  />
                </form>
              </div>
            </main>
          </div>
          <hr/>
          <div className="row text-center">
            { this.state.bitBangers.map((bitBanger, key) =>{
              return(
                <div key={key} className="col-md-4 mb-12">
                  {/*<div className="token" style={{backgroundColor: bitBanger}}></div>*/}
                    <div className="banger">
                      <div className="roof" style={{
                          borderTopRightRadius: `${ this.RBTLR(JSON.parse(bitBanger).colorHash) }px`,
                          borderTopLeftRadius: `${ this.RBTRR(JSON.parse(bitBanger).colorHash) }%`
                        }}>
                        </div>
                      <div className="body" style={{
                          backgroundColor: JSON.parse(bitBanger).nameColor,
                          borderTopRightRadius: `${ this.BBTLR(JSON.parse(bitBanger).colorHash) }px`,
                          borderTopLeftRadius: `${ this.BBTRR(JSON.parse(bitBanger).colorHash) }px`
                      }}>
                        <div className="wheel tire left" style={{
                        width: {/*`${ this.TW(JSON.parse(bitBanger).colorHash) }%`*/},
                        height: {/*`${ this.TH(JSON.parse(bitBanger).colorHash) }%`*/}
                        }}>
                          <div className="rim" style={{
                        width: {/*`${ this.RW(JSON.parse(bitBanger).colorHash) }%`*/},
                        height: {/*`${ this.RH(JSON.parse(bitBanger).colorHash) }%`*/}
                        }}>
                          </div>
                        </div>
                        <div className="wheel tire right" style={{
                        width: {/*`${ this.TW(JSON.parse(bitBanger).colorHash) }%`*/},
                        height: {/*`${ this.TH(JSON.parse(bitBanger).colorHash) }%`*/}
                        }}>
                          <div className="rim" style={{
                        width: {/*`${ this.RW(JSON.parse(bitBanger).colorHash) }%`*/},
                        height: {/*`${ this.RH(JSON.parse(bitBanger).colorHash) }%`*/}
                        }}>
                          </div>
                        </div>
                      </div>
                    </div>    
                    <div>Color: {JSON.parse(bitBanger).nameColor}</div>
                    <div>RBTLR: {this.RBTLR(JSON.parse(bitBanger).colorHash)}</div>
                    <div>RBTRR: {this.RBTRR(JSON.parse(bitBanger).colorHash)}</div>
                    <div>BBTLR: {this.BBTLR(JSON.parse(bitBanger).colorHash)}</div>
                    <div>BBTRR: {this.BBTRR(JSON.parse(bitBanger).colorHash)}</div>
                    <div>RW: {this.RW(JSON.parse(bitBanger).colorHash)}</div>
                    <div>RH: {this.RH(JSON.parse(bitBanger).colorHash)}</div>
                    <div>TH: {this.TH(JSON.parse(bitBanger).colorHash)}</div>
                    <div>TW: {this.TW(JSON.parse(bitBanger).colorHash)}</div>
                    <div>Body: {JSON.parse(bitBanger).body}</div>
                    <div>Rims: {JSON.parse(bitBanger).rims}</div>
                    <div>Miles: {JSON.parse(bitBanger).miles}</div>
                    <div>ColorHash: {JSON.parse(bitBanger).colorHash}</div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default App;
