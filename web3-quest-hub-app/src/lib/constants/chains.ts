import { Chain } from 'viem';
import { sepolia } from 'viem/chains';

export const supportedChains: Chain[] = [sepolia];

export const sepoliaTestnet: Chain = sepolia;

export const chainConfig = {
  sepolia: {
    chainId: 11155111,
    name: 'Sepolia',
    nativeCurrency: {
      name: 'Sepolia ETH',
      symbol: 'ETH',
      decimals: 18,
    },
    rpcUrls: {
      default: {
        http: ['https://rpc.sepolia.org'],
      },
      public: {
        http: ['https://rpc.sepolia.org'],
      },
    },
    blockExplorers: {
      default: {
        name: 'Etherscan',
        url: 'https://sepolia.etherscan.io',
      },
    },
    testnet: true,
  },
};

export const faucetUrls = {
  sepolia: 'https://sepolia-faucet.pk910.de/',
};
