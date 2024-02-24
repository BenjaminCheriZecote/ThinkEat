import { NavLink } from "react-router-dom";
import style from './Footer.module.css'
import { useSelector } from "react-redux";

const Footer = () => {
    const {isAside} = useSelector((state) => state.isAside);

    return(
        <footer id="footer" className={style.footer} style={isAside? {gridColumn: '2 / -1'}:{gridColumn: '1 / -1'} }>
           <p>©Koikonmange 2024</p>
            <NavLink>Gestion des cookies</NavLink>
            <NavLink>Contact</NavLink>
        </footer>
    )
}

export default Footer;