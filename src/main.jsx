import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createStytchClient, StytchProvider} from "@stytch/react";
import { BrowserRouter, Routes, Route } from 'react-router';
import { Authenticate } from './Authenticate.jsx';
import './index.css'
import App from './App.jsx'
import { Login } from './Login.jsx';

const stytchLIVE = createStytchClient("public-token-live-db45c569-6f68-43db-bfe9-621f140e1777");
console.log("MAIN!");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <StytchProvider stytch={stytchLIVE}>
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
