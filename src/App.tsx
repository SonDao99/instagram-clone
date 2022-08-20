import React from 'react';
import './App.scss';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from './pages/Home';
import Profile from "./pages/Profile";
import Login from './pages/Login';

import RequireAuth from './components/RequireAuth/RequireAuth';


function App():JSX.Element {

  return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path="/" element={
            <RequireAuth>
              <Home />
            </RequireAuth>
          } />
          
          <Route path="/profile" element={
            <RequireAuth>
              <Profile />
            </RequireAuth>
          } />

          <Route path="/login" element={<Login />} />
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
