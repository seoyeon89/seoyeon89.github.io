import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

const AppHeader = () => {
    return (
        <>
            <header>
                <div className="inner">
                    <h1><Link to="/">Seoyeon,Jang</Link></h1>
                    <nav>
                        <ul>
                            <li>
                                <HashLink to="/#a">Profile</HashLink>
                            </li>
                            <li>
                                <HashLink to="/#works">Works</HashLink>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default AppHeader;