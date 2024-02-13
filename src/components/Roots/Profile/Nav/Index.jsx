import { NavLink } from "react-router-dom";
import '../Profile.scss';




const Nav = () => {

    return(
        <nav className="nav">
            <ul className="nav__ulContainer"> 
                <NavLink to={"/profil"}>Profil</NavLink> 
                <NavLink to={"/profil/diet-preferences"}>Préférences utilisateurs</NavLink>
                <NavLink to={"/profil/account"}>Account</NavLink>
            </ul>
        </nav>
    )
}

export default Nav;