import React from 'react';
import './App.module.css';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import { Navbar } from './components/navbar';
import { Login } from './pages/login';
import { auth } from './config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { InputEngine } from './pages/input-engine/input-engine';
import { CasinoStatus } from './pages/casino-status';

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <Router>
      <Navbar/>
        <Routes>
        <Route path='/' element={<Login/>}/>
          <Route path='/input-engine' element={user ? <InputEngine/> : <Login/>}/>
          <Route path='/casino-status' element={user ?<CasinoStatus/> : <Login/>}/>
        </Routes>
      </Router>
    </div> 
  );
}

export default App;
