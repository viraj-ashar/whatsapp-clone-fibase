import './App.css';
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import { useStateValue } from './components/StateProvider';

function App() {
  const [{ user }, dispatch] = useStateValue();

  return (
    <div className="app">
      {!user ? (
        <Login />
      ) : (
        <div className="app__body">
          <BrowserRouter>
            <Sidebar />
            <Routes>
              <Route path='/rooms/:roomId' element={<Chat />} />
              <Route path='/' element={<Chat />} />
            </Routes>
          </BrowserRouter>
        </div>
      )}
    </div>
  );
}

export default App;
