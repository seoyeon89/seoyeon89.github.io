import AppHeader from '../module/AppHeader';
import Profile from '../module/Profile';
import WorkList from '../module/WorkList';
import Contect from '../module/Contect';

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