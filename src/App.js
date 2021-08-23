import React, { useEffect, useState } from "react";
import './App.css';
import Sitebar from "./home/Navbar";
import Auth from "./auth/Auth";
import WorkoutIndex from "./workouts/WorkoutIndex";


function App() {
  const [sessionToken, setSessionToken] = useState("");

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  };

  const clearToken = () => {
    localStorage.clear()
    setSessionToken('')
  }

  const protectViews = () => {
    return (sessionToken === localStorage.getItem('token') ? <WorkoutIndex token={sessionToken}/> : <Auth updateToken={updateToken}/>)
  }

  return (
    <div>
      <Sitebar clickLogout={clearToken}/>
      {protectViews()}
    </div>
  );
}

export default App;
