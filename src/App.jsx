import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Layout from './components/Layout/Layout';
import Dashboard from './pages/Dashboard';
import Analytics from './pages/Analytics';
import Topics from './pages/Topics';
import Regions from './pages/Regions';
import Filters from './pages/Filters';
import { FilterProvider } from './context/FilterContext';

function App() {
  return (
    <FilterProvider>
      <Router>
        <div className="App">
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 3000,
              style: {
                background: '#363636',
                color: '#fff',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#10b981',
                  secondary: '#fff',
                },
              },
              error: {
                duration: 4000,
                iconTheme: {
                  primary: '#ef4444',
                  secondary: '#fff',
                },
              },
            }}
          />
          <Layout>
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/topics" element={<Topics />} />
              <Route path="/regions" element={<Regions />} />
              <Route path="/filters" element={<Filters />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </FilterProvider>
  );
}

export default App;