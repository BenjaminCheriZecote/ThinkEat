import './Header.css';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";
import ToggleDarkMode from '../../UXElements/icons/ToggleDarkMode/ToggleDarkMode';

import { NavLink } from "react-router-dom";

import BurgerMenu from '../../UXElements/components/BurgerMenu';
import types from '../../../../store/reducers/types';
import { UserApi } from '../../../../api';

const Header = () => {
    const {isAside} = useSelector((state) => state.isAside);

    const dispatch = useDispatch();
    const location = useLocation();

    const boxProfile = useRef();
    const headerRightSideElement = useRef();
    const navigate = useNavigate();

    const {isConnected} = useSelector((state) => state.session);
    const {name} = useSelector((state) => state.session);
    const {isAdmin} =useSelector((state) => state.session);
    const [isBox, setBox] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const {mode} = useSelector((state) => state.darkMode);
    const isHome = location.pathname === '/'; 
    const search = location.search;
    const objectPathName = {
        proposal: 'Propositions',
        history: 'Historique',
        recipes: 'Recettes',
        favorites: 'Favoris'
    }

    const reziseWindowWidth = () => {
        if (window.innerWidth >= 780) setMenuOpen(false);
    }

    window.addEventListener('resize', reziseWindowWidth);
    
    const handleClick = () => {
        
        const widthBox = boxProfile.current.offsetWidth;
        setBox(!isBox)
        
        if (isBox) {
            boxProfile.current.style.transform = `translateX(${widthBox+10}px)`;
        } else {
            boxProfile.current.style.transform = `translateX(-${widthBox+17}px)`;
        }
        
    }

    const handleClickBurgerMenu = () => {
        setMenuOpen((prevMenuOpen) => !prevMenuOpen)
    };

    const handleClickDeconnexion = async () => {
        localStorage.removeItem("user");
        await UserApi.signout();
        dispatch({type:types.SIGNOUT})
        navigate("/");
    };

    const handleDarkMode = () => {
        dispatch({type:types.TURN_DARK_MODE})
    }

    return(
        <>
            <header 
            id="header" 
            className={isHome?"header backgroundHome":"header"} 
            style={isAside? {gridColumn: '2 / -1'}:{gridColumn: '1 / -1'}}>
                <div className={isHome?"headerTop":"headerTop "}>

                    <h1>Think<span>Eat</span></h1>
                    <h1 className="headerH1initial hidden">T<span>ET</span></h1>
                    {objectPathName.hasOwnProperty.call(objectPathName, location.pathname.slice(1)) && <h2 className='headerH2__middleSide'>{ objectPathName[location.pathname.slice(1)] }</h2>}
                    <div ref={headerRightSideElement} className={menuOpen?'header__middleSide':'header__middleSide hideNav'}>
                        <nav className="header-middleSide__nav" style={isHome ? menuOpen ? {} : {color:"black"}:{}}>
                            <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to={`/${search && search}`} >Accueil</NavLink>
                            <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to={`/proposal${search && search}`}>Propositions</NavLink>
                            
                            {!isAdmin?
                                isConnected?
                                <>
                                    <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to={`/favorites${search && search}`}>Favoris</NavLink>
                                    <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to={`/history${search && search}`}>Historique</NavLink>
                                </>
                                    :
                                    ""
                                    :
                                    ""}
                            
                            <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to={`/recipes${search && search}`}>Recettes</NavLink>
                        </nav>
                    </div>
                    <div className='header-rightSide'>
                        <ToggleDarkMode handleClick={handleDarkMode} mode={mode}/>
                        <CgProfile onClick={handleClick}  className="iconProfile" />
                        {isConnected?
                            <div ref={boxProfile} className='header-rightSide__boxProfile'>
                                
                                <p>{name}</p> 
                                <NavLink className="header-rightSide-boxProfile__settings" to={`/profil${search && search}`} >Paramètres <IoIosSettings/></NavLink>
                                <button className="btnBoxProfil" onClick={handleClickDeconnexion}>Se déconnecter</button>
                            
                            </div>
                            :
                            <div ref={boxProfile} className='header-rightSide__boxProfile'>
                                
                                <NavLink to={`/signin${search && search}`}>
                                    <button className="btnBoxProfil">Se connecter</button>
                                </NavLink>
                                
                                <NavLink to={`/signup${search && search}`}>
                                    <button className="btnBoxProfil">Créer un compte</button>
                                </NavLink>
                            </div> 
                            }

                        <BurgerMenu handleClick={handleClickBurgerMenu} color={{background:"var(--colorOrange)"}} label={"burgerNav"}/>
                    </div>
                </div>
                {isHome &&
                    <section id="header__section-tittle">
                        <div className="header__section-tittle--container">
                        <h2>Simplifiez votre quotidien culinaire</h2>
                        <p>Trouvez votre repas en un clin d'oeil avec des idées sur mesure, chaque jour.  </p>
                        <NavLink to="/proposal" className="starterLink">Découvrir</NavLink>
                        </div>
                    </section>
                }
            </header>
        </>
    )
}

export default Header;