import { NavLink } from "react-router-dom";
import '../Profile.scss';




const Nav = () => {

    return(
        <nav className="sectionProfile sectionProfile--Nav">
            <h2>Menu</h2>
            <ul className="nav__ulContainer"> 
                <NavLink to={"/profil"}>Profil</NavLink> 
                <NavLink to={"/profil/diet-preferences"}>Préférences utilisateurs</NavLink>
                <NavLink to={"/profil/account"}>Compte</NavLink>
            </ul>
        </nav>
    )
}

export default Nav;