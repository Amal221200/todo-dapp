import merge from 'lodash.merge';
import {
  RainbowKitProvider,
  Theme,
  darkTheme
} from '@rainbow-me/rainbowkit';
import { WagmiProvider } from 'wagmi';
import {
  QueryClientProvider,
  QueryClient,
} from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { config } from '../config';

const queryClient = new QueryClient()

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
interface BlockchainContextProps extends PropsWithChildren {

}

const myTheme = merge(darkTheme(), {
  colors: {
    accentColor: '#0d3c99',
  },
} as Theme);

const BlockchainContext = ({ children }: BlockchainContextProps) => {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider theme={myTheme}>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}

export default BlockchainContext