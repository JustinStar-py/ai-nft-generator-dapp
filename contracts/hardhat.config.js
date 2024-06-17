require("@nomicfoundation/hardhat-toolbox");
require('dotenv').config()

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  defaultNetwork: "testnet",
    networks: {
      localhost: {
        url: "http://127.0.0.1:8545",
        accounts: [process.env.LOCALHOST_ACC,]
      },
      hardhat: {
      },
      testnet: {
        url: "https://bsc-testnet.drpc.org/",
        chainId: 97,
        gasPrice: 20000000000,
        accounts: [process.env.BSC_ACC,]
      },
      mainnet: {
          url: "https://bsc-dataseed.binance.org/",
          chainId: 56,
          gasPrice: 20000000000,
          accounts: [process.env.BSC_ACC,]
      },
      ethereum: {
        url: "https://www.noderpc.xyz/rpc-mainnet/public",
        chainId: 1,
        accounts: [process.env.ETH_ACC,]
      }
  },
    etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://bscscan.com/
    apiKey: process.env.BSCSCAN_API
  },
    solidity: {
    version: "0.8.17",
    settings: {
      optimizer: {
        enabled: false
      }}
   },
    ignition: {
    blockPollingInterval: 1_000,
    timeBeforeBumpingFees: 3 * 60 * 1_000,
    maxFeeBumps: 4,
    requiredConfirmations: 5,
  },
};