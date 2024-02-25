import { useSelector } from "react-redux";
import Proposition from "./Propositions";
// import Proposition from "../Proposal/Proposition";
import { useEffect } from "react";
import './Historic.css'
import { IoCartOutline } from "react-icons/io5";
import FavoriteStarOutline from "../../Layout/UXElements/icons/FavoriteStarOutline";
import store from "../../../store";
import types from "../../../store/reducers/types";
import { HistoryApi } from "../../../api";
import { useLoaderData } from "react-router-dom";

const Historic = () => {
    // const historicalPropositions = useLoaderData()
    const {historicalPropositions} = useSelector((state) => state.historicalPropositions);

    return (
        <main className="outlet">
            <section className="section">
                <h1>Historic</h1>
                <ul className="section__ulContainer">
                    {historicalPropositions.map((proposition, index) => {
                        return(
                            <li key={index} className="section-ulContainer__li">
                                <p>{proposition.date}</p>
                                <Proposition proposition={proposition}/>
                                <FavoriteStarOutline className="section-ulContainer-li--cartShopping" size={23}/>
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

    // const hystory = await HistoryApi.getAll();

    // return hystory
    return null
}