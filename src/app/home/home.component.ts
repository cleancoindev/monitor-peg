import { Component, OnInit } from '@angular/core';
import {ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import EthereumBip44 from 'ethereum-bip44';
import Web3 from 'web3';
import _ from 'lodash';

let ABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_spender",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "version",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "standard",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_token",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "withdrawTokens",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "acceptOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "transfersEnabled",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "newOwner",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "",
        "type": "address"
      },
      {
        "name": "",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "transferOwnership",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "_name",
        "type": "string"
      },
      {
        "name": "_symbol",
        "type": "string"
      },
      {
        "name": "_decimals",
        "type": "uint8"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_token",
        "type": "address"
      }
    ],
    "name": "NewSmartToken",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "Issuance",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "Destruction",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "_prevOwner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "_newOwner",
        "type": "address"
      }
    ],
    "name": "OwnerUpdate",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_disable",
        "type": "bool"
      }
    ],
    "name": "disableTransfers",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "issue",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "destroy",
    "outputs": [],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "_from",
        "type": "address"
      },
      {
        "name": "_to",
        "type": "address"
      },
      {
        "name": "_value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "success",
        "type": "bool"
      }
    ],
    "payable": false,
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isLoading: Boolean = false;
  total: Number = 0;

  pegAddress: String = '0xA7fe5dF8FD79d64CC6db38aE690C300bad471916';
  addressCount: Number = 100;  
  xPubKey:any = 'xpub6F3UDWWniqSUcfPied5SPqhBTFuYwAS2dGPQo1Sjpen4tDN1p4cdwGQAEQRjjvpZViBs8Du6uW2YXgirbGxo8avtX54WLWwFRZnAqAj9WyH';
  wallet: any = [];
  
  network: String = 'ropsten';
  infuraKey: String = 'r1G2QY5uh1pAnHxkf8Uw';

  web3: any = new Web3();
  web3_WS: any = null;
  pegToken: any;
  pegToken_WS: any;

  constructor(
    private _toastyService: ToastyService,
    private _toastyConfig: ToastyConfig,
  ) {
    this._toastyConfig.theme = 'bootstrap';
    this.web3.setProvider(new this.web3.providers.HttpProvider(`https://${this.network}.infura.io/${this.infuraKey}`));
    this.web3_WS = new Web3(new Web3.providers.WebsocketProvider(`wss://${this.network}.infura.io/ws`));
    this.pegToken = new this.web3.eth.Contract(ABI, this.pegAddress);        
    this.pegToken_WS = new this.web3_WS.eth.Contract(ABI, this.pegAddress);        
  }

  ngOnInit() {
    this.pegToken_WS.events.Transfer((err, res) => {
      if (!err) {
        this.triggerChange(res.returnValues._to);
        this.triggerChange(res.returnValues._from);
      }
    });
  }

  monitor() {
    this.isLoading = true;
    this.getData()
    .then(_data => {
      this.wallet = _data;
      this.isLoading = false;
      this.computeTotal();
    })
    .catch(err => {
      alert('Error')
      this.isLoading = false;
    })
  }

  private computeTotal() {
    let balances = _.map(this.wallet, "currentBalance");
    this.total = _.reduce(balances, (sum, n) => {
      return sum + n;
    }, 0)
  }

  private async getData() {
      let ethWallet = EthereumBip44.fromPublicSeed(this.xPubKey);
      let wallet = [];
      for(let i=0; i<this.addressCount; i++) {
        let address = ethWallet.getAddress(i);
        let bal = await this.pegToken.methods.balanceOf(address).call();
        wallet.push({
          index: i,
          address: address,
          currentBalance: Number(bal) / 1e18,
          prevBalance: Number(bal) / 1e18,
          status: null
        })
      }
      return wallet;
  }
 
  private async triggerChange(_address) {
    let index = this.wallet.findIndex(w => w.address.toLowerCase()==_address.toLowerCase());
    if(index >= 0) {
      let temp = this.wallet[index].currentBalance;
      let changeValue = Number(await this.pegToken.methods.balanceOf(_address).call()) / 1e18;
      this.wallet[index].currentBalance = changeValue;
      this.wallet[index].prevBalance = temp;
      setTimeout(()=>{
        this.wallet[index].prevBalance = changeValue;
        if(changeValue > temp)
          this.wallet[index].status = 'up';
        if(changeValue < temp)
          this.wallet[index].status = 'down';
        if(changeValue == temp)
          this.wallet[index].status = null;
      }, 2000);
      this.computeTotal();
    }
  }

}
