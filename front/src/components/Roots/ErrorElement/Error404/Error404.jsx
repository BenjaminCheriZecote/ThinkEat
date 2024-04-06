import { Link } from 'react-router-dom';
import './Error404.css'
import { useEffect } from 'react';

const Error404 = () => {
    
    useEffect(() => {
        
            const rootElement = document.querySelector("#root");
            const defaultStyles = {
            display: rootElement.style.display,
            flexDirection: rootElement.style.flexDirection,
            overflow: rootElement.style.overflow,
            };


            // Application des styles uniquement sur la page Home
            rootElement.style.display = "flex";
            rootElement.style.flexDirection = "column";
            rootElement.style.overflowY = "auto";
        
            // Restauration des styles par défaut en sortie de page Home
            return () => {
            rootElement.style.display = defaultStyles.display;
            rootElement.style.flexDirection = defaultStyles.flexDirection;
            rootElement.style.overflow = defaultStyles.overflow;
            };
        
    }, []);

    return (
        <main className="error404" >
            <section className="sectionErrorPage">
                <h1>Désolé la page que vous cherchez a été volé par Chuck Norris<br></br> et on a pas osé lui demander de nous la rendre. </h1>
                <Link href="/">Retourner à l'acceuil</Link>
            </section>
        </main>
    )
}

export default Error404;