import AppHeader from '../modules/AppHeader';
import Profile from '../modules/Profile';
import WorkList from '../modules/WorkList';
import Contect from '../modules/Contect';

const Home = () => {
    return (
        <>
            <AppHeader />
            <Profile id="profile"/>
            <WorkList id="work" />
            <Contect id="contact" />
        </>
   )
};

export default Home;