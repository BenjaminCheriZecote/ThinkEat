import { NavLink, useLocation } from "react-router-dom";
import style from "./index.module.css";

export default function Nav() {
  const location = useLocation();
  const search = location.search;

  return(
    <nav className={`${style.nav} sectionProfile sectionProfile--Nav`}>
      <h2>Menu</h2>
      <div> 
        <NavLink to={`/profil${search && search}`}>Profil</NavLink> 
        <NavLink to={`/profil/diet-preferences${search && search}`}>Préférences utilisateurs</NavLink>
        <NavLink to={`/profil/account${search && search}`}>Compte</NavLink>
      </div>
    </nav>
  )
}