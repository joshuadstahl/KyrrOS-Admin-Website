import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createStytchClient, StytchProvider} from "@stytch/react";
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Login } from './Login.jsx';

const stytch = createStytchClient("public-token-test-9a31df33-02d8-466c-8825-fae6c2893ddb");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <StytchProvider stytch={stytch}>
        <App />
        <Login />
      </StytchProvider>
    </BrowserRouter>
  </StrictMode>,
)
