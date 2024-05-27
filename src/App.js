import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoPage from './pages/NoPage';

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home />}>
              <Route path="/Detail/:id" element={<Detail />} />
              <Route path="*" element={<NoPage />} />
          </Route>
      </Routes>
  );
}

export default App;
