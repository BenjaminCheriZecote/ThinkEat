import { NavLink } from "react-router-dom";
import style from './Footer.module.css'
import { useSelector } from "react-redux";
import LogoHat from "../../UXElements/icons/LogoHat";

const Footer = () => {
    const {isAside} = useSelector((state) => state.isAside);
    const currentYear = new Date().getFullYear()

    return(
        <footer id="footer" className={style.footer} style={isAside? {gridColumn: '2 / -1'}:{gridColumn: '1 / -1'} }>
            <div>
                <p>©ThinkEat {currentYear}</p>
                <NavLink>Gestion des cookies</NavLink>
                <a href='https://www.bczstudio.fr/' target="_blank" rel="noreferrer">bczstudio.fr</a>
            </div>
            <LogoHat size={2.8}/>
        </footer>
    )
}

export default Footer;