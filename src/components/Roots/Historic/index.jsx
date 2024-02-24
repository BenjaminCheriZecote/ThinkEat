import { useSelector } from "react-redux";
import Proposition from "./Proposition";
import { useEffect } from "react";
import './Historic.css'
import { IoCartOutline } from "react-icons/io5";
import store from "../../../store";
import types from "../../../store/reducers/types";

const Historic = () => {
    
    const {historical_propositions} = useSelector((state) => state.historical_propositions);
    useEffect(() => {
        console.log(historical_propositions)
    }, [])

    return (
        <main className="outlet">
            <section className="section">
                <h1>Historic</h1>
                <ul className="section__ulContainer">
                    {historical_propositions.map((proposition, index) => {
                        return(
                            <li key={index} className="section-ulContainer__li">
                                <p>{proposition.date}</p>
                                <Proposition proposition={proposition}/>
                                <IoCartOutline className="section-ulContainer-li--cartShopping" size={23}/>
                            </li>
                        )
                    })}
                    
                </ul>
            </section>
        </main>
    )
}

export default Historic;

export async function historicLoader(){

    store.dispatch({type:types.SET_IS_ASIDE_FALSE});
    
    return null
}