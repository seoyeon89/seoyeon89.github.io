import {Link} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link';

const AppHeader = () => {
    return (
        <header className="header">
            <h1 className="header__logo"><Link to="/">Seoyeon,Jang</Link></h1>
            <nav className="header__navigation">
                <ul>
                    <li>
                        <HashLink to="/#profile">Profile</HashLink>
                    </li>
                    <li>
                        <HashLink to="/#works">Works</HashLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default AppHeader;