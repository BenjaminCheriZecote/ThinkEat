import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { useState } from "react";
import { useSelector } from "react-redux";

import store from "../../../store";


import './Proposal.scss';


const Proposal = () => {


    const [numberOfProposals, setNumber] = useState(0);
    const [proposal, setProposal] = useState([])
    const [hungryState, setHungry] = useState("Petite faim");
    const {favorites} = useSelector((state) => state.favorites);
    const {historical_propositions} = useSelector((state) => state.historical_propositions);

    const handleClickMinus = () => {
        if (numberOfProposals !== 0) setNumber((currentProposal) => currentProposal - 1);
        console.log(numberOfProposals);
    }

    const handleClickPlus = () => {
        setNumber((currentProposal) => currentProposal + 1);
        console.log(numberOfProposals);
    }
    
    const handleChangeHungryFilter = (event) => {
        if (event.target.checked) {
            setHungry("Grande faim")
        } else {
            setHungry("Petite faim")
        }
    }

    const handleChange = () => {
        //
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(numberOfProposals);
        setPropostions();
    }


    const setPropostions = () => {
        const findedMeals = favorites.filter((e) => e.hungry === hungryState);
        const findedMealsSorted = findedMeals.slice(0, numberOfProposals);
        setProposal(findedMealsSorted);
        console.log("results propositions", findedMealsSorted);
        store.dispatch({type:"SET_HISTORIC", payload:[... historical_propositions, {date:new Date().toLocaleString(), historic:findedMealsSorted}]})
    }


    return(
        <>
            <section className="section">
                <form className="form" action="" onSubmit={handleSubmit}>
                        <div >
                            <FaCircleMinus onClick={handleClickMinus} id="minus"/>
                            <input type="number" value={numberOfProposals} onChange={handleChange}/>
                            <FaCirclePlus onClick={handleClickPlus} id="plus"/>
                        </div>

                        <div>
                            <input id="hungryFilter" type="checkbox" onChange={handleChangeHungryFilter}/>
                            <label htmlFor="hungryFilter" >{hungryState}</label>
                        </div>
                            
                        <button type="submit">C'est parti !</button>
                </form>
            </section>

            <section className="section">
                <ul className="section__ulContainerProposal">
                    {proposal.map((element, index) => {
                        return(
                            <li key={index} className="section-ulContainerProposal__li">
                                <p className="section-ulContainerProposal-li__p--name">{element.name}</p>
                                <p className="section-ulContainerProposal-li__p--hungry">{element.hungry}</p>

                            </li>
                        )
                    })}
                </ul>
            </section>
        </>
    )
}

export default Proposal;