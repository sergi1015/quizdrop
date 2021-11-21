const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const { mnemonic, BSCSCANAPIKEY, OwnerAddress} = require('./env.json');

module.exports = {
  plugins: [
    'truffle-plugin-verify'
  ],
  api_keys: {
    bscscan: BSCSCANAPIKEY
  },
  networks: {
    development: {
        host: "127.0.0.1",     // Localhost (default: none)
        port: 8545,            // Standard BSC port (default: none)
        network_id: "*",       // Any network (default: none)
        from: OwnerAddress
      },
    bscTestnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 2000000,
      timeoutBlocks: 5000,
      networkCheckTimeout: 500000, 
      from: OwnerAddress
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true,
      gas: 4000000
    },
  },
  mocha: {
    // timeout: 500000
  },
  compilers: {
    solc: {
      version: "0.7.6",
    }
  }
};