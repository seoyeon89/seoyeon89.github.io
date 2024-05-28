import React from 'react';

import AppHeader from '../components/AppHeader';
import Profile from '../components/Profile';
import WorkList from '../components/WorkList';
import Contect from '../components/Contect';

const Home = () => {
    return (
        <>
            <AppHeader />
            <main>
                <Profile />
                <WorkList />
                <Contect />
            </main>
        </>
    )
};

export default Home;