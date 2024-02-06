import { NavLink } from "react-router-dom";
import './Nav.scss'

const Nav = () => {

    return(
        <aside className="aside">
            <nav className="aside__nav">
                    <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to="/" >Acceuil</NavLink>
                    <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to="/favorites">Favoris</NavLink>
                    <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to="/proposal">Propositions</NavLink>
                    <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to="/historic">Historique</NavLink>
                    <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to="/recipes">Recettes</NavLink>
            </nav>
            <a className="aside__a" href="">Nouvelle proposition</a>
        </aside>
    )
};

export default Nav;