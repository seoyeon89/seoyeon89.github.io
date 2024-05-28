import { Outlet, Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const AppHeader = () => {
    return (
        <>
            <header>
                <h1><span></span></h1>
                <nav>
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <HashLink to="/#a">Link to Hash Fragment</HashLink>
                        </li>
                        <li>
                            <Link to="/detail">detail</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                    </ul>
                </nav>
            </header>
            <Outlet/>
        </>
    )
};

export default AppHeader;