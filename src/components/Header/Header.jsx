import { NavLink } from 'react-router-dom'
import './Header.css'

const Header = () => {
    return (
        <header className="header">
            <div className="title-container">
                <h1>Pokédex</h1>
                <div className="title-decoration"></div>
            </div>
            <nav>
                <ul>
                    <li>
                        <NavLink to="/pokedex" activeClassName="active-link">
                            Pokédex
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/favourites" activeClassName="active-link">
                            Favourites
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;