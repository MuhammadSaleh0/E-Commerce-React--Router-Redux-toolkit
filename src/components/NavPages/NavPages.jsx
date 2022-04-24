import { Link } from 'react-router-dom';
import './NavPages.css';

const NavPages = (props) => {
    const scrollTopHandler = () => {
        window.scrollTo(0, 0);
    };

    return (
        <div className="NavPages">
            <ul className="Nav_ul">
                <Link to="/products/all/page_1" onClick={scrollTopHandler}>
                    1
                </Link>
                <Link to="/products/all/page_2" onClick={scrollTopHandler}>
                    2
                </Link>
                <Link to="/products/all/page_3" onClick={scrollTopHandler}>
                    3
                </Link>
            </ul>
        </div>
    );
};

export default NavPages;
