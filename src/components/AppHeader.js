import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const AppHeader = () => {
    return (
        <>
            <header>
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
            </header>
        </>
    )
};

export default AppHeader;