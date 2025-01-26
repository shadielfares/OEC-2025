import React from 'react'
import MainPage from './mainPage/MainPage.jsx'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

import 'mapbox-gl/dist/mapbox-gl.css';

import './App.css'

function App() {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
        
    </div>
  )
}

export default App