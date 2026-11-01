
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate
} from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import NeighborhoodReport from './pages/NeighborhoodReport';
import CompareNeighborhoods from './pages/CompareNeighborhoods';
import DataSources from './pages/DataSources';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import Signup from './pages/Signup';

import './styles/variables.css';
import './styles/global.css';
import './styles/components.css';

export default function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/explore"
          element={
            <Navigate
              to="/report?lat=28.5244&lon=77.1588&radius=2&name=Vasant%20Kunj,%20South%20Delhi"
              replace
            />
          }
        />

        <Route path="/report" element={<NeighborhoodReport />} />
        <Route path="/compare" element={<CompareNeighborhoods />} />
        <Route path="/sources" element={<DataSources />} />

        {/* Authentication routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}
