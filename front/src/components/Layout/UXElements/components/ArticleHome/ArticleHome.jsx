import { useSelector } from "react-redux";


const ArticleHome = ({title, src, alt, description, step, mode}) => {

    return(
        <article className="main_section_article--article">
            <img src={src} aria-label={alt} />
            <h5>Etape {step} : {title}</h5>
            <p style={mode?{color:"white"}:{color:"rgba(68, 68, 68, 0.714)"}} >{description} </p>
        </article>
    )
}

export default ArticleHome;