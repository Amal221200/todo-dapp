import '@rainbow-me/rainbowkit/styles.css';
import {
    getDefaultConfig
} from '@rainbow-me/rainbowkit';
import { sepolia } from 'wagmi/chains';
import { http } from "wagmi"
import { PROJECT_ID } from './constants';

export const config = getDefaultConfig({
    appName: 'My RainbowKit App',
    projectId: PROJECT_ID,
    chains: [sepolia],
    transports: {
        [sepolia.id]: http('https://eth-sepolia.g.alchemy.com/v2/2WgmYnBXqWCkpDaHOXaSZnyTRuCbzodv'),
    },
});