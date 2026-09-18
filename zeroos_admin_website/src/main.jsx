import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createStytchClient, StytchProvider} from "@stytch/react";
import './index.css'
import App from './App.jsx'

const stytch = createStytchClient("public-token-here");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StytchProvider stytch={stytch}>
      <App />
    </StytchProvider>
  </StrictMode>,
)
