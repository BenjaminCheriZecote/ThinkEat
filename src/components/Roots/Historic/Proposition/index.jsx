import './Proposition.scss'

const Proposition = ({proposition}) => {
    console.log(proposition)
    return(
        <>
            <ul className="ulContainer">
                {proposition.historic.array.map((element, index) => {
                    return(
                        <li key={index} className={element.validate?"ulContainer__li":"ulContainer__li unvalidate"}>
                            <p>{element.name}</p>
                            <p>{element.hungry}</p>
                            <p>{element.cooking_time}</p>
                        </li>
                    )
                })}
            </ul>
        </>
    )
}

export default Proposition