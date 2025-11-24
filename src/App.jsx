import React from 'react';
import {Route, Routes} from 'react-router-dom';
import Home from './pages/Home.jsx';
import Detail from './pages/Detail.jsx';
import NoPage from './pages/NoPage.jsx';

function App() {
    return (
        <Routes>
            <Route path="/" element={<Home/> }>
                <Route path="/detail/:id" element={<Detail/>} />
            </Route>
            <Route path="*" element={<NoPage/>} />
            <Route path={"/*"} element={<NoPage language={"NULL"} />} />
        </Routes>
    );
}

export default App;