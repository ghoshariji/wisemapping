// App.js
import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ReactFlowProvider  } from '@xyflow/react';
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import CanvasPage from './pages/CanvasPage';
import UserDashboard from './pages/UserDashboard';

function App() {
  return (
    <ReactFlowProvider >
      <Router>
        <div className="App" >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path="/canvas" element={<CanvasPage/>} />
            <Route path='/forgot-password' element={<ForgotPassword/>}/>
            <Route path='/dashboard' element={<UserDashboard/>}/>
          </Routes>
        </div>
      </Router>
    </ReactFlowProvider >
  )
}

export default App;