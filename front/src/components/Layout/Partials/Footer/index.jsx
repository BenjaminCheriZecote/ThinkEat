import { NavLink } from "react-router-dom";
import style from './Footer.module.css'
import { useSelector } from "react-redux";
import LogoHat from "../../UXElements/icons/LogoHat";

const Footer = () => {
    const {isAside} = useSelector((state) => state.isAside);

    return(
        <footer id="footer" className={style.footer} style={isAside? {gridColumn: '2 / -1'}:{gridColumn: '1 / -1'} }>
            <div>
                <p>©ThinkEat 2025</p>
                <NavLink>Gestion des cookies</NavLink>
                <a href='https://www.chezben.io/' target="_blank" rel="noreferrer">chezben.io</a>
            </div>
            <LogoHat size={2.8}/>
        </footer>
    )
}

export default Footer;