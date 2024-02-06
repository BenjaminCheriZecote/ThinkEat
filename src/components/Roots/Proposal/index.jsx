import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { useState } from "react";
import { useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import Proposition from "./Proposition";
import { v4 as uuidv4 } from 'uuid';

import store from "../../../store";


import './Proposal.scss';


const Proposal = () => {

    const [numberOfProposals, setNumber] = useState(0);
    const [proposal, setProposal] = useState([])
    const [hungryState, setHungry] = useState("Petite faim");
    const [cookingTimeState, setCookingTimeState] = useState("Court");
    const {favorites} = useSelector((state) => state.favorites);
    const [validatePropositionState, setValidateState] = useState();
    const {historical_propositions} = useSelector((state) => state.historical_propositions);

    const handleClickMinus = () => {
        if (numberOfProposals !== 0) setNumber((currentProposal) => currentProposal - 1);
    }

    const handleClickPlus = () => {
        setNumber((currentProposal) => currentProposal + 1);
    }
    
    const handleChangeHungryFilter = (event) => {
        if (event.target.checked) {
            setHungry("Grande faim")
        } else {
            setHungry("Petite faim")
        }
    }

    const handleChangeCookingTimeFilter = (event) => {
        if (event.target.checked) {
            setCookingTimeState("Long")
        } else {
            setCookingTimeState("Court")
        }
    }

    const handleChange = () => {
        //
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setPropostions();
    }


    const setPropostions = () => {
        const findedMealsHungryFilter = favorites.filter((e) => e.hungry === hungryState);
        const findedMealsCookingTimeFilter = findedMealsHungryFilter.filter((e) => e.cooking_time === cookingTimeState)
        const findedMealsAddStatus = findedMealsCookingTimeFilter.map((e) => {
            const object = {...e};
            object.validate = true;
            return object
            });
        const findedMealsFiltered = findedMealsAddStatus.slice(0, numberOfProposals);

        // uId
        const objectProposal = {
            id: uuidv4(),
            array: findedMealsFiltered
        }

        setProposal(objectProposal);
        
    }

    const handleClickValidateChoices = (event) => {
        
        if (proposal.array.length > 0) {
            const findProposal = historical_propositions.find((e) => e.historic.id === proposal.id)
            if (!findProposal) store.dispatch({type:"SET_HISTORIC", payload:[... historical_propositions, {date:new Date().toLocaleString(), historic:proposal}]});
        }
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

                        <div>
                            <input id="cookingTimeFilter" type="checkbox" onChange={handleChangeCookingTimeFilter}/>
                            <label htmlFor="cookingTimeFilter" >{cookingTimeState}</label>
                        </div>
                            
                        <button type="submit">C'est parti !</button>
                </form>
            </section>

            <section className="section">
                    {proposal.array?
                    <>
                        <ul className="section__ulContainerProposal">
                            {proposal.array.map((element, index) => {
                                return(
                                    <Proposition proposition={element} key={index}/>
                                )
                            })}
                        </ul>

                        <button onClick={handleClickValidateChoices}>Valider mes choix</button>
                    </>
                        :
                        <p>Aucun résultats</p>
                    }
            </section>
        </>
    )
}

export default Proposal;