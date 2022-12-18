import React, { useEffect, useState, useRef } from 'react';
import { MemoryRouter as Router, Route, Routes } from 'react-router-dom';
import { SignUp } from './Components/SignUp';
import { Login } from './Components/Login';
import Main from './Components/Main';
import Menu from './Components/Menu';
import {AddAppt} from './Components/AddAppt';

import 'react-calendar/dist/Calendar.css';
import './App.css';
import axios from 'axios';

const Hello = () => {
  const [page, setPage] = React.useState(false);
  function handleClick(state: boolean) {
    setPage(state);
  }

  return (
    // <div id="content">
    //   <Menu />
    //   <Main/>
    // </div>
    <div className="content">
      <div className="button-group">
        <div className="submit">
          <button onClick={() => handleClick(false)} disabled={page}>Login</button>
        </div>
        <div className="signUp">
          <button id="signUp" onClick={() => handleClick(true)} disabled={page}>
            Sign Up
          </button>
        </div>
      </div>
      {page === true ? <SignUp name={name}/> : <Login />}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
