import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import cloudflareLogo from './assets/cloudflare.svg'
import './App.css'
import { useNavigate } from "react-router";
import { useStytchUser } from "@stytch/react";
import {useState, useEffect} from 'react';


function App() {
  const navigate = useNavigate()
  const {user} = useStytchUser();
  const [apps, setApps] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await fetch('/api/web/apps');
        const data = await response.json();
        setApps(data);
      } catch (error) {
        console.error('Failed to fetch apps:', error);
      }
    }

    const fetchDevices = async () => {
      try {
        const response = await fetch('/api/web/devices');
        const data = await response.json();
        setDevices(data);
      } catch (error) {
        console.error('Failed to fetch devices:', error);
      }
    }
    
    if (user) {
      fetchApps();
      fetchDevices();
    }
  }, []);

  return (
    <>
      <section id="center">
        <div>
          <h1>KyrrOS Dashboard</h1>
          <p>
            {user ? `Welcome, you are logged in as ${user.emails[0].email}` : "You are not logged in."}
          </p>
        </div>
        <ul style={{ display: 'flex', gap: '1rem', listStyle: 'none', padding: 0 }}>
          <li>
          <button
            className="counter"
            onClick={() => {navigate('/login')}}
          >
            Login
          </button>
          <button
            className="counter"
            onClick={() => {navigate('/logout')}}
          >
            Logout
          </button>
          </li>
        </ul>
        <div>
          {apps ? apps.map(app => (
            <div key={app.displayname}>
              <h2>{app.displayname}</h2>
              <img height="100" width="100" src={app.imageLink} alt={app.displayname} />
            </div>
          )) : null}
          {devices ? devices.map(device => (
            <div key={device.id}>
              <h2>{device.name}</h2>
              <p>{device.imei}</p>
            </div>
          )) : null}
        </div>


      </section>

      <div className="ticks"></div>

      <section id="next-steps">
        <div id="docs">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#documentation-icon"></use>
          </svg>
          <h2>Documentation</h2>
          <p>Your questions, answered</p>
          <ul>
            <li>
              <a href="https://vite.dev/" target="_blank">
                <img className="logo" src={viteLogo} alt="" />
                Explore Vite
              </a>
            </li>
            <li>
              <a href="https://react.dev/" target="_blank">
                <img className="button-icon" src={reactLogo} alt="" />
                Learn more
              </a>
            </li>
            <li>
              <a href="https://workers.cloudflare.com/" target="_blank">
                <img className="button-icon" src={cloudflareLogo} alt="" />
                Workers Docs
              </a>
            </li>
          </ul>
        </div>
        <div id="social">
          <svg className="icon" role="presentation" aria-hidden="true">
            <use href="/icons.svg#social-icon"></use>
          </svg>
          <h2>Connect with us</h2>
          <p>Join the Vite community</p>
          <ul>
            <li>
              <a href="https://github.com/vitejs/vite" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#github-icon"></use>
                </svg>
                GitHub
              </a>
            </li>
            <li>
              <a href="https://chat.vite.dev/" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#discord-icon"></use>
                </svg>
                Discord
              </a>
            </li>
            <li>
              <a href="https://x.com/vite_js" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#x-icon"></use>
                </svg>
                X.com
              </a>
            </li>
            <li>
              <a href="https://bsky.app/profile/vite.dev" target="_blank">
                <svg
                  className="button-icon"
                  role="presentation"
                  aria-hidden="true"
                >
                  <use href="/icons.svg#bluesky-icon"></use>
                </svg>
                Bluesky
              </a>
            </li>
          </ul>
        </div>
      </section>

      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
