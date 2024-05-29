import React from 'react';
import { Outlet } from 'react-router-dom';

import AppHeader from '../components/AppHeader';
import Profile from '../components/Profile';
import WorkList from '../components/WorkList';

const Home = () => {
    return (
        <>
            <AppHeader/>
            <main>
                <div className="profile-background">

                </div>
                <div className="inner">
                    <Profile/>
                    <WorkList/>
                </div>
            </main>

            <Outlet/>
        </>
    );
};

export default Home;