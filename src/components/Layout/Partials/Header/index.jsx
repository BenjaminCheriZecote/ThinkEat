import './Header.css';
import { useRef, useState } from 'react';
import store from '../../../../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CgProfile } from "react-icons/cg";
import { IoIosSettings } from "react-icons/io";

import { NavLink } from "react-router-dom";

import BurgerMenu from '../../UXElements/components/BurgerMenu';

const Header = () => {
    const {isAside} = useSelector((state) => state.isAside);

    const boxProfile = useRef();
    const headerRightSideElement = useRef();
    const {isConnected} = useSelector((state) => state.session);
    const {name} = useSelector((state) => state.session);
    const {isAdmin} =useSelector((state) => state.session);
    const [isBox, setBox] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    const navigate=  useNavigate()

    const handleClick = (event) => {
        
        const widthBox = boxProfile.current.offsetWidth;
        setBox(!isBox)
        console.log(isBox)
        
        if (isBox) {
            boxProfile.current.style.transform = `translateX(${widthBox+10}px)`;
            event.target.style.color = 'inherit'

        } else {
            boxProfile.current.style.transform = `translateX(-${widthBox+17}px)`;
            event.target.style.color = 'var(--colorOrange)'
        }
        
    }

    const handleClickBurgerMenu = () => {
        console.log(menuOpen)
        setMenuOpen((prevMenuOpen) => !prevMenuOpen)
    };

    const handleClickDeconnexion = () => {
        localStorage.removeItem("user");
        store.dispatch({type:"SIGNOUT"})
        location.reload();
        navigate("/");
    };


    return(
        <>
            <header id="header" className="header" style={isAside? {gridColumn: '2 / -1'}:{gridColumn: '1 / -1'} }>
                <h1>KoiKon<span>Mange</span></h1>
                <h2 className="headerH1initial hidden">KK<span>M</span></h2>
                <div ref={headerRightSideElement} className={menuOpen?'header__rightSide':'header__rightSide hideNav'}>
                    <nav className="header-rightSide__nav">
                        <NavLink className={({isActive}) => isActive? "menu-link menu-link--active":"menulink aside-nav__navLink"} to="/" >Accueil</NavLink>
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
                    
                    <div>
                        <CgProfile onClick={handleClick}  className="iconProfile"/>
                        {isConnected?
                            <div ref={boxProfile} className='header-rightSide__boxProfile '>
                                
                                <p>{name}</p> 
                                <NavLink className="header-rightSide-boxProfile__settings" to="/profil">Paramètres <IoIosSettings/></NavLink>
                                <button className="btnBoxProfil" onClick={handleClickDeconnexion}>Se déconnecter</button>
                            
                            </div>
                            :
                            <div ref={boxProfile} className='header-rightSide__boxProfile'>
                                
                                <NavLink to="/signin">
                                    <button className="btnBoxProfil">Se connecter</button>
                                </NavLink>
                                
                                <NavLink to="/signup">
                                    <button className="btnBoxProfil">Créer un compte</button>
                                </NavLink>
                            </div> 
                            }
                        
                    </div>
                </div>

                <BurgerMenu handleClick={handleClickBurgerMenu} color={{background:"var(--colorOrange)"}}/>
                
            </header>
        </>
    )
}

export default Header;