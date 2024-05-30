import React from 'react';
// import { ScrollRestoration, Outlet} from 'react-router-dom';
import { Outlet} from 'react-router-dom';

import AppHeader from '../components/AppHeader';
import Profile from '../components/Profile';
import WorkList from '../components/WorkList';

const Home = () => {
    return (
        <>
            <AppHeader />
            {/*<ScrollRestoration getKey={(location, matches) => {*/}
            {/*        return location.key;*/}
            {/*    }}*/}
            {/*>*/}
                <main className="container">
                    <div className="container__background">

                    </div>
                    <div className="container__inner">
                        <Profile />
                        <WorkList />
                    </div>
                </main>
            {/*</ScrollRestoration>*/}
            <Outlet />
        </>
    );
};

export default Home;