import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';
import Hospitals from './pages/Hospitals';
import Donors from './pages/Donors';
import Settings from './pages/Settings';
import Organizations from './pages/Organizations';
import Login from './pages/Login';

const theme = createTheme({
  typography: {
    fontFamily: 'Poppins, sans-serif',
  },
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

const App = () => {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    setAuthenticated(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="flex flex-col h-screen">
          {authenticated && <Header handleLogout={handleLogout} />}
          <div className="flex flex-1">
            {authenticated && <Sidebar />}
            <div className="flex flex-col flex-1 p-4 overflow-auto">
              <Routes>
                <Route
                  path="/login"
                  element={authenticated ? <Navigate to="/" /> : <Login setAuthenticated={setAuthenticated} />}
                />
                <Route
                  path="/"
                  element={authenticated ? <Dashboard /> : <Navigate to="/login" />}
                />
                <Route
                  path="/hospitals"
                  element={authenticated ? <Hospitals /> : <Navigate to="/login" />}
                />
                <Route
                  path="/donors"
                  element={authenticated ? <Donors /> : <Navigate to="/login" />}
                />
                <Route
                  path="/organizations"
                  element={authenticated ? <Organizations /> : <Navigate to="/login" />}
                />
                <Route
                  path="/settings"
                  element={authenticated ? <Settings /> : <Navigate to="/login" />}
                />
              </Routes>
            </div>
          </div>
          {authenticated && <Footer />}
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;
