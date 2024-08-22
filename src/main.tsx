import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import BlockchainContext from './blockchain/context/BlockchainContext.tsx'
import { MyConnectButton } from './components/ConnectButton.tsx'
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BlockchainContext>
      <App />
      <MyConnectButton />
      <Toaster />
    </BlockchainContext>
  </StrictMode>,
)
