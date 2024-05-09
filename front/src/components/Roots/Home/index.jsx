import { useLocation } from 'react-router-dom';
import './Home.css'
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import ArticleHome from '../../Layout/UXElements/components/ArticleHome/ArticleHome';


const Home = () => {

    const location = useLocation();
    const {mode} = useSelector((state) => state.darkMode);
    const articles = [
        {
            title:"Recettes",
            src:"/step1home.webp",
            alt:"Image, salade",
            description:"Créez vos propres recettes ou parcourez notre liste de recettes pour définir vos favorites."
        },
        {
            title:"Critères",
            src:"/step2home.webp",
            alt:"Image, casserole et assaisonnement",
            description:"Rendez-vous dans la page des propositions pour renseigner les critères du jour. Une grosse faim, peu de temps de cuisson ou un régime alimentaire spécifique? Faites le nous savoir."
        },
        {
            title:"Positions",
            src:"/step3home.webp",
            alt:"Image, chef avec cloche",
            description:"Une fois vos envies précisées, on se charge de trouver les recettes adéquates en se basant sur celles que l'on vous a déjà proposé."
        },

    ]
    

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
                {articles && articles.map((article, index) => {
                    return(
                        <ArticleHome key={index} step={index+1} title={article.title} src={article.src} alt={article.alt} description={article.description} mode={mode}/>
                    )
                })}
            </section>


        </main>
    )
}

export default Home;