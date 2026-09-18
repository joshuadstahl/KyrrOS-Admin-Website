import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createStytchClient, StytchProvider} from "@stytch/react";
import { BrowserRouter, Routes, Route } from 'react-router';
import { Authenticate } from './Authenticate.jsx';
import './index.css'
import App from './App.jsx'
import { Login } from './Login.jsx';

const stytch = createStytchClient("public-token-test-9a31df33-02d8-466c-8825-fae6c2893ddb");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StytchProvider stytch={stytch}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/authenticate" element={<Authenticate />} />
        </Routes>        
      </BrowserRouter>
    </StytchProvider>
  </StrictMode>,
)
