import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import Proposition from "./Proposition";
import { v4 as uuidv4 } from 'uuid';

import store from "../../../store";


import './Proposal.scss';

// {
    //     id:1,
    //     name:"Hamburger",
    //     image:"",
    //     steps:["Cuire les steak à la poèle.", "Chauffer le pain au four, avec steak et fromage", "Rajouter tomate et salade"],
    //     hunger:"Copieux",
    //     preparating_time:10,
    //     ingredients:["pain", "salade", "tomate", "steak", "fromage"]
    // },


const Proposal = () => {

    const {favorites} = useSelector((state) => state.favorites);
    const {searchResult} = useSelector((state) => state.criterias);
    const {numberOfProposition} = useSelector((state) => state.criterias.criterias[0]);
    const {hungerBig} = useSelector((state) => state.criterias.criterias[1]);
    const {hungerFew} = useSelector((state) => state.criterias.criterias[2]);
    const {preparating_timeLong} = useSelector((state) => state.criterias.criterias[3]);
    const {preparating_timeShort} = useSelector((state) => state.criterias.criterias[4]);
    const [findedMeals, setFindedMeals] = useState();
    const [proposal, setProposal] = useState([]);
    const {historical_propositions} = useSelector((state) => state.historical_propositions);


    const handleClickMinus = () => {
        if (numberOfProposition !== 0) store.dispatch({type:"SUBTRACT_NUMBER_OF_PROPOSITION"});
        
    }

    const handleClickPlus = () => {
        store.dispatch({type:"ADD_NUMBER_OF_PROPOSITION"});
    }
   
    const handleChangeHungerBigFilter = (event) => {
        store.dispatch({type:"SET_HUNGER_BIG"});
    }

    const handleChangeHungerFewFilter = (event) => {
        store.dispatch({type:"SET_HUNGER_FEW"});
    }

    const handleChangePreparatingTimeLongFilter = (event) => {
        store.dispatch({type:"SET_PREPARATING_TIME_LONG"})
    }

    const handleChangePreparatingTimeShortFilter = (event) => {
        store.dispatch({type:"SET_PREPARATING_TIME_SHORT"})
    }

    const handleChange = () => {
        //
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        setPropostions();
    }



    const setPropostions = () => {

        const convertedFavoritesArray = favorites.map((e) => {
            const object = {...e}
            if (object.preparating_time < 10) {
                object.preparating_time = "Court";
            } else {
                object.preparating_time = "Long";
            }
            return object
        });

        const result = []

    if (hungerBig) {
        const array = convertedFavoritesArray.filter((meal) => meal.hunger === "Copieux");
        array.forEach(element => {
            result.push(element)
        });
    }

    if (hungerFew) {
        const array = convertedFavoritesArray.filter((meal) => meal.hunger === "Petite faim");
        array.forEach(element => {
            result.push(element)
        });
    }

    if (preparating_timeLong) {
        const array = convertedFavoritesArray.filter((e) => e.preparating_time === "Long");
        array.forEach(element => {
            result.push(element)
        });
    }

    if (preparating_timeShort) {
        const array = convertedFavoritesArray.filter((e) => e.preparating_time === "Court");
        array.forEach(element => {
            result.push(element)
        });
    }

    // Autres conditions de filtrage ici si nécessaire

    const result2 = [];
    result2.push(result[0])

    for (let i = 0; i < result.length; i++) {
        let existedMeal = result2.find((e) => result[i].id === e.id)
        if (!existedMeal) {
            result2.push(result[i])
        } 
    }

    const resultAddStatus = result2.map((e) => {
        const object = {...e};
        object.validate = true;
        return object
    });
            
        const resultFiltered = resultAddStatus.slice(0, numberOfProposition);
        
        // uId
        const objectProposal = {
            id: uuidv4(),
            array: resultFiltered
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
                            <input type="number" value={numberOfProposition} onChange={handleChange}/>
                            <FaCirclePlus onClick={handleClickPlus} id="plus"/>
                        </div>

                        <div>
                            <input id="hungryFilter" type="checkbox" onChange={handleChangeHungerBigFilter} checked={hungerBig?true:false}/>
                            <label htmlFor="hungryFilter" >Copieux</label>
                        </div>

                        <div>
                            <input id="hungryFilter" type="checkbox" onChange={handleChangeHungerFewFilter} checked={hungerFew?true:false}/>
                            <label htmlFor="hungryFilter" >Petite faim</label>
                        </div>

                        <div>
                            <input id="cookingTimeFilter" type="checkbox" onChange={handleChangePreparatingTimeLongFilter} checked={preparating_timeLong?true:false}/>
                            <label htmlFor="cookingTimeFilter" >Preparation longue</label>
                        </div>

                        <div>
                            <input id="cookingTimeFilter" type="checkbox" onChange={handleChangePreparatingTimeShortFilter} checked={preparating_timeShort?true:false}/>
                            <label htmlFor="cookingTimeFilter" >Preparation courte</label>
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