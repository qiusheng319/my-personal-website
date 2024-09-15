import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Web3ReactProvider } from '@web3-react/core';
import { ethers } from 'ethers';
import Header from './components/Header';
import Home from './pages/Home';
import UserProfile from './pages/UserProfile';
import { Web3Provider } from './contexts/Web3Context';
import { connectors } from './connectors'
// import ErrorBoundary from './components/ErrorBoundary';

function getLibrary(provider) {
  return new ethers.BrowserProvider(provider);
}

function App() {
  return (
    // <ErrorBoundary>
      <Web3ReactProvider getLibrary={getLibrary}>
        {/*<Web3Provider>*/}
          <Router>
            <div className="App">
              <Header />
                <Home/>
              <Routes>
                <Route path="/" element={<Home />} />
                {/*<Route path="/profile/:address" element={<UserProfile />} />*/}
              </Routes>
            </div>
          </Router>
        {/*</Web3Provider>*/}
      </Web3ReactProvider>
    // </ErrorBoundary>
  );
}

export default App;