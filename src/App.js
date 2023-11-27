import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import EditPage from './components/Editpage';
import LandingPage from './components/Landingpage';
import LoginPage from './components/Login'

function App() {

  
  return (
    <Router>
      <div className="container">
        <Routes>
        <Route path="/" element={<LandingPage />} />
          <Route path="add" element={<EditPage />} />

          <Route path="login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
