import React from 'react';
import { Outlet} from 'react-router-dom';

import AppHeader from '../components/AppHeader';
import Profile from '../components/Profile';
import WorkList from '../components/WorkList';

const Home = () => {
    return (
        <>
            <AppHeader />
                <main className="container" id="profile">
                    <div className="container__background"></div>
                    <div className="container__inner">
                        <Profile />
                        <WorkList />
                    </div>
                </main>
            <Outlet />
        </>
    );
};

export default Home;