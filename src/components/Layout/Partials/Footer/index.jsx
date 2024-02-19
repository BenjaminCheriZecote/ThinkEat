import { NavLink } from "react-router-dom";
import style from './Footer.module.css'

const Footer = () => {

    return(
        <footer className={style.footer}>
           <p>©Koikonmange 2024</p>
            <NavLink>Gestion des cookies</NavLink>
            <NavLink>Contact</NavLink>
        </footer>
    )
}

export default Footer;