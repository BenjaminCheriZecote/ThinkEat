import './Proposition.scss'

const Proposition = ({proposition}) => {
    console.log(proposition)
    return(
        <>
            <ul className="ulContainer">
                {proposition.historic.map((element, index) => {
                    return(
                        <li key={index} className="ulContainer__li">
                            <p>{element.name}</p>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Proposition