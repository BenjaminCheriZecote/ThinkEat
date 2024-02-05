import './Header.scss';
import { useRef } from 'react';
import store from '../../../../store';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { CgProfile } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";

const Header = () => {

    const boxProfile = useRef();
    const {isConnected} = useSelector((state) => state.session);
    const {userName} = useSelector((state) => state.session);

    const navigate=  useNavigate()

    const handleClick = () => {
        console.log("test", boxProfile.current)
        boxProfile.current.classList.toggle("hidden");
    }

    const handleClickDeconnexion = () => {
        localStorage.removeItem("user");
        store.dispatch({type:"IS_DISCONNECTED"})
        location.reload();
        navigate("/");
    };


    return(
        <>
            <header className="header">
                <h1>KoiKonMange</h1>
                <div className="header__rightSide">
                    <div><CiSearch /></div>
                    <div><CgProfile onClick={handleClick}/>
                    {isConnected?
                        <div ref={boxProfile} className='hidden header-rightSide__boxProfile'>
                        <a href="/profil">
                            <p>{userName}</p>
                        </a>
                        
                        
                        <button onClick={handleClickDeconnexion}>Se déconnecter</button>
                        
                        </div>
                        :
                        <div ref={boxProfile} className='hidden header-rightSide__boxProfile'>
                            <a href="/signIn">
                                <button >Se connecter</button>
                            </a>
                            
                            <a href="/signUp">
                                <button>Créer un compte</button>
                            </a>
                        </div> 
                        }
                    </div>
                </div>
            </header>
        </>
    )
}

export default Header;