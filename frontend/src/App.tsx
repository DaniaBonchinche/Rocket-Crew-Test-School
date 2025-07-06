import React from 'react';
import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SchoolsPage from './pages/SchoolsPage';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<SchoolsPage />} />
            </Routes>
            <ToastContainer />
        </BrowserRouter>
    </div>
  );
}

export default App;
