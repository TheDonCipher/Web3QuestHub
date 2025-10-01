import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { injected, walletConnect, coinbaseWallet } from 'wagmi/connectors';

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || 'demo-project-id';

export const wagmiConfig = createConfig({
  chains: [sepolia],
  connectors: [
    injected({ target: 'metaMask' }),
    walletConnect({ projectId }),
    coinbaseWallet({ appName: 'Web3 Quest Hub' }),
  ],
  transports: {
    [sepolia.id]: http(),
  },
});
