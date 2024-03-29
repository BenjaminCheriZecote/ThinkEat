import { useLocation } from 'react-router-dom';
import './Home.css'
import { useEffect } from 'react';

const Home = () => {

    const location = useLocation();

    useEffect(() => {
        
        if (location.pathname === '/') {
            const rootElement = document.querySelector("#root");
            const footerElement = document.querySelector("#footer");
            const headerElement = document.querySelector("#header");
            const defaultStyles = {
            display: rootElement.style.display,
            flexDirection: rootElement.style.flexDirection,
            overflow: rootElement.style.overflow,
            header: headerElement.style.paddingBottom,
            footer: footerElement.style.padding
            };


            // Application des styles uniquement sur la page Home
            rootElement.style.display = "flex";
            rootElement.style.flexDirection = "column";
            rootElement.style.overflowY = "auto";
            headerElement.style.paddingBottom = "7rem";
            footerElement.style.padding = "1rem";

            

            // Restauration des styles par défaut en sortie de page Home
            return () => {
            rootElement.style.display = defaultStyles.display;
            rootElement.style.flexDirection = defaultStyles.flexDirection;
            rootElement.style.overflow = defaultStyles.overflow;
            headerElement.style.paddingBottom = defaultStyles.header;
            footerElement.style.padding = defaultStyles.footer
            };
        }
    }, [location.pathname]);

    return(
        <main id="home" className="section" >
            <section className="main_section_tittle">
                <h4>Des repas adaptés à vos envies à portée de clic</h4>
                <h3>COMMENT ÇA MARCHE ?</h3>
            </section>

            <section className="main_section_article">
                <article className="main_section_article--article">
                    <img src="/step1home.png" aria-label='Image, salade'/>
                    <h5>Etape 1 : Recettes</h5>
                    <p>Créez vos propres recettes ou parcourez notre liste de recettes pour définir vos favorites. </p>
                </article>

                <article className="main_section_article--article">
                    <img src="/step2home.png" aria-label='Image, casserole et assaisonnement'/>
                    <h5>Etape 2 : Critères</h5>
                    <p>Rendez-vous dans la page des propositions pour renseigner les critères du jour. Une grosse faim, peu de temps de cuisson ou un régime alimentaire spécifique? Faites le nous savoir.</p>
                </article>

                <article className="main_section_article--article">
                    <img src="/step3home.png" aria-label='Image, chef avec cloche'/>
                    <h5>Etapes 3 : Propositions</h5>
                    <p>Une fois vos envies précisées, on se charge de trouver les recettes adéquates en se basant sur celles que l'on vous a déjà proposé!</p>
                </article>
            </section>


        </main>
    )
}

export default Home;