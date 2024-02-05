import { useSelector } from "react-redux";
import Proposition from "./Proposition";
import { useEffect } from "react";
import './Historic.scss'

const Historic = () => {
    
    const {historical_propositions} = useSelector((state) => state.historical_propositions);
    useEffect(() => {
        console.log(historical_propositions)
    }, [])

    return (
        <section className="section">
            <h1>Historic</h1>
            <ul className="section__ulContainer">
                {historical_propositions.map((proposition, index) => {
                    return(
                        <li key={index} className="section-ulContainer__li">
                            <p>{proposition.date}</p>
                            <Proposition proposition={proposition}/>
                        </li>
                    )
                })}
            </ul>
        </section>
    )
}

export default Historic;