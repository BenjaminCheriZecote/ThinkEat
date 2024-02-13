import './Header.scss';
import { useRef } from 'react';
import store from '../../../../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";

import { NavLink } from "react-router-dom";

const Header = () => {

    const boxProfile = useRef();
    const {isConnected} = useSelector((state) => state.session);
    const {name} = useSelector((state) => state.session);
    const {isAdmin} =useSelector((state) => state.session);

    const navigate=  useNavigate()

    const handleClick = () => {
        console.log("test", boxProfile.current)
        boxProfile.current.classList.toggle("hidden");
    }

    const handleClickDeconnexion = () => {
        localStorage.removeItem("user");
        store.dispatch({type:"SIGNOUT"})
        location.reload();
        navigate("/");
    };


    return(
        <>
            <header className="header">
                <h1>KoiKonMange</h1>
                <div className="header__rightSide">
                <nav className="header-rightSide__nav">
                    <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to="/" >Acceuil</NavLink>
                    <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to="/proposal">Propositions</NavLink>
                    
                    {!isAdmin?
                        isConnected?
                        <>
                            <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to="/favorites">Favoris</NavLink>
                            <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to="/historic">Historique</NavLink>
                        </>
                            :
                            ""
                            :
                            ""}
                    
                    <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to="/recipes">Recettes</NavLink>
                </nav>
                    <div><CiSearch /></div>
                    <div><CgProfile onClick={handleClick}/>
                    {isConnected?
                        <div ref={boxProfile} className='hidden header-rightSide__boxProfile'>
                        <NavLink to="/profile">{name}</NavLink>
                        
                        
                        
                        <button onClick={handleClickDeconnexion}>Se déconnecter</button>
                        
                        </div>
                        :
                        <div ref={boxProfile} className='hidden header-rightSide__boxProfile'>
                            
                            <NavLink to="/signin">
                                <button >Se connecter</button>
                            </NavLink>
                            
                            <NavLink to="/signup">
                                <button>Créer un compte</button>
                            </NavLink>
                        </div> 
                        }
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;