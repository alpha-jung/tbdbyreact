import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import LoginForm from './routes/login/LoginForm';
import Register from './routes/login/Register';
import Home from './routes/Home';
import axios from 'axios';
import OAuth2Login from './routes/login/OAuth2Login';

function App() {
  const at = sessionStorage.getItem("at");

  useEffect(() => {
    if(at != null) {
      silentRefresh();
    }
  }, []);

  function silentRefresh() {
    axios
      .post("http://localhost:9080/mongo/users/silentRefresh", {},
      {
        withCredentials: true
      })
      .then((res) => {
        const newAt = res.headers.authorization;
        const newExpireAt = res.headers.expireat;
        refreshSuccess(newAt, newExpireAt);
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  }

  function refreshSuccess(newAt: string, newExpireAt: string) {
    sessionStorage.setItem('at', newAt);
    sessionStorage.setItem('expireAt', newExpireAt);

    let now = new Date();
    let refreshTime = parseInt(newExpireAt) - now.getTime() - 60000;

    setTimeout(silentRefresh, refreshTime);
  }

  return (
    <div className="App">
      <Routes>
        {
          !at ?
          <Route path="/" element={ <LoginForm></LoginForm> } />
          :
          <Route path="/" element={ <Home></Home> } />
        }
        
        <Route path="/register" element={ <Register></Register> } />
        <Route path="/oauth2Login" element={ <OAuth2Login></OAuth2Login> } />
      </Routes>
    </div>
  );
}

export default App;
