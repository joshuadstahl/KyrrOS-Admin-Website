import './App.css'
import { useNavigate } from "react-router";
import { useStytchUser } from "@stytch/react";
import {useState, useEffect} from 'react';


function App() {
  const navigate = useNavigate()
  const {user} = useStytchUser();
  const [apps, setApps] = useState([]);
  const [devices, setDevices] = useState([]);
  const [pageState, setPageState] = useState("home");
  const [currDeviceId, setCurrDeviceId] = useState(null);
  const [currDeviceApps, setCurrDeviceApps] = useState([]);

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

    const fetchDeviceApps = async (currDeviceId) => {
      try {
        const response = await fetch(`/api/web/deviceApps/${currDeviceId}`);
        const data = await response.json();
        setCurrDeviceApps(data);
      } catch (error) {
        console.error('Failed to fetch device apps:', error);
      }
    }
    
    if (user) {
      fetchApps();
      fetchDevices();
      if (currDeviceId) {
        fetchDeviceApps(currDeviceId);
      }
    }
  }, [currDeviceId]);

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
          {/* {apps ? apps.map(app => (
            <div key={app.displayname}>
              <h2>{app.displayname}</h2>
              <img height="100" width="100" src={app.imageLink} alt={app.displayname} />
            </div>
          )) : null} */}
          {pageState === "home" && (devices != [] ? devices.map(device => (
            <div key={device.id} onClick={() => {setCurrDeviceId(device.id); setPageState("deviceapps")}}>
              <h2>{device.name}</h2>
              <p>ID: {device.id}</p>
              <p>IMEI: {device.imei}</p>
            </div>
          )) : <p>There are no devices associated with your account.</p>)}
          {pageState === "deviceapps" && (currDeviceApps != [] ? currDeviceApps.map(app => (
            <div key={app.displayname}>
              <h2>{app.displayname}</h2>
              <img height="100" width="100" src={app.imageLink} alt={app.displayname} />
            </div>
          )) : <p>No apps for this device.</p>)}
        </div>


      </section>

    </>
  )
}

export default App
