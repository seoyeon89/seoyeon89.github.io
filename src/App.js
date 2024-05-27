import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/layout.js';
import Main from './pages/main';
import PageA from './pages/detail';

function App() {
  return (
      <Routes>
          <Route path='/' element={<Layout />} >
              <Route index element={<Main />} />
              <Route path='/pageA' element={<PageA />} />
          </Route>
      </Routes>
  );
}

export default App;
