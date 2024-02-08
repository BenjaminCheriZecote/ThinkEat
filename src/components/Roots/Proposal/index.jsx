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
    const {numberOfProposition} = useSelector((state) => state.criterias.criterias[0]);
    const {hungerBigCriteria} = useSelector((state) => state.criterias.criterias[1]);
    const {hungerFewCriteria} = useSelector((state) => state.criterias.criterias[2]);
    const {preparating_timeLongCriteria} = useSelector((state) => state.criterias.criterias[3]);
    const {preparating_timeShortCriteria} = useSelector((state) => state.criterias.criterias[4]);
    const {hungerBigFilter} = useSelector((state) => state.filters.filters[0]);
    const {hungerFewFilter} = useSelector((state) => state.filters.filters[1]);
    const {preparating_timeLongFilter} = useSelector((state) => state.filters.filters[2]);
    const {preparating_timeShortFilter} = useSelector((state) => state.filters.filters[3]);
    const [filteredProposal, setFilteredProposal] = useState([]);
    const [newFilteredProposal, setNewFilteredProposal] = useState([]);
    
    const [proposal, setProposal] = useState([]);
    const {historical_propositions} = useSelector((state) => state.historical_propositions);

    useEffect(() => {
        setNewFilteredProposal({
            id: uuidv4(),
            array: filteredProposal
        })
    }, [filteredProposal])


    const handleClickMinus = () => {
        if (numberOfProposition !== 0) store.dispatch({type:"SUBTRACT_NUMBER_OF_PROPOSITION"});
        
    }

    const handleClickPlus = () => {
        store.dispatch({type:"ADD_NUMBER_OF_PROPOSITION"});
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

    if (hungerBigCriteria) {
        const array = convertedFavoritesArray.filter((meal) => meal.hunger === "Copieux");
        array.forEach(element => {
            result.push(element)
        });
    }

    if (hungerFewCriteria) {
        const array = convertedFavoritesArray.filter((meal) => meal.hunger === "Petite faim");
        array.forEach(element => {
            result.push(element)
        });
    }

    if (preparating_timeLongCriteria) {
        const array = convertedFavoritesArray.filter((e) => e.preparating_time === "Long");
        array.forEach(element => {
            result.push(element)
        });
    }

    if (preparating_timeShortCriteria) {
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
            
        const finalResult = resultAddStatus.slice(0, numberOfProposition);
        
        // uId
        const objectProposal = {
            id: uuidv4(),
            array: finalResult
        }

        setProposal(objectProposal);
        filterProposition(finalResult)
    }

    const filterProposition = (finalResult) => {
        let proposalReadyToFilter = finalResult;
        console.log(proposalReadyToFilter)
        
        if (hungerBigFilter) {
            proposalReadyToFilter = proposalReadyToFilter.filter((meal) => meal.hunger === "Copieux");
        }
    
        if (hungerFewFilter) {
            proposalReadyToFilter = proposalReadyToFilter.filter((meal) => meal.hunger === "Petite faim");
        }
    
        if (preparating_timeLongFilter) {
            proposalReadyToFilter = proposalReadyToFilter.filter((e) => e.preparating_time === "Long");
        }
    
        if (preparating_timeShortFilter) {
            proposalReadyToFilter = proposalReadyToFilter.filter((e) => e.preparating_time === "Court");
        }
        
        const filterArray = proposalReadyToFilter;
        setFilteredProposal(filterArray)
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
                
                    <div className="section__start">
                        <div >
                            <FaCircleMinus onClick={handleClickMinus} id="minus"/>
                            <input type="number" value={numberOfProposition} onChange={handleChange} id="starter"/>
                            <FaCirclePlus onClick={handleClickPlus} id="plus"/>
                        </div>
  
                        <button onClick={handleSubmit} type="submit">C'est parti !</button>
                    </div>
            </section>

            <section className="section">
                    {proposal.array?
                    <>
                        {newFilteredProposal?
                             <ul className="section__ulContainerProposal">
                             {newFilteredProposal.array.map((element, index) => {
                                 return(
                                     <Proposition proposition={element} key={index}/>
                                 )
                             })}
                         </ul>
                            :
                            <ul className="section__ulContainerProposal">
                                {proposal.array.map((element, index) => {
                                    return(
                                        <Proposition proposition={element} key={index}/>
                                    )
                                })}
                            </ul>
                            }

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