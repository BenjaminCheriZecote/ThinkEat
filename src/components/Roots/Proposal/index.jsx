import { FaCirclePlus } from "react-icons/fa6";
import { FaCircleMinus } from "react-icons/fa6";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { MdCancel } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { FaPerson } from "react-icons/fa6";
import { CiCircleMinus } from "react-icons/ci";
import { CiCirclePlus } from "react-icons/ci";
import Proposition from "./Proposition";
import { v4 as uuidv4 } from 'uuid';

import store from "../../../store";


import './Proposal.css';
import { NavLink } from "react-router-dom";
import types from "../../../store/reducers/types";
import { Form } from "react-router-dom";
import { mappingUrlFunction } from "../../../helpers/httpQueries"
import { RecipeApi } from "../../../api";
import OrderByComponent from "../../Layout/UXElements/components/OrderByComponent";


const Proposal = () => {

    const {isAside} = useSelector((state) => state.isAside)

    const {isConnected} = useSelector((state) => state.session);
    const {favorites} = useSelector((state) => state.favorites);
    const {recipes} = useSelector((state) => state.recipes);
    const {numberOfProposition} = useSelector((state) => state.filters.filters);
    
    const {proposal} = useSelector((state) => state.proposal)
    const {historical_propositions} = useSelector((state) => state.historical_propositions);

    const handleClickMinus = () => {
        if (numberOfProposition !== 0) store.dispatch({type:types.SUBTRACT_NUMBER_OF_PROPOSITION});
    }

    const handleClickPlus = () => {
        store.dispatch({type:types.ADD_NUMBER_OF_PROPOSITION});
    }

    const handleChange = () => {
        //
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        store.dispatch({type:types.TURN_FILTER})
        setProposition2();
    }

    const setProposition2 = async () => {
        const recipes = await RecipeApi.getAll();
        const proposalsWithValidate = recipes.map(recipe => {
            return { ...recipe, validate: true }; // Crée un nouvel objet avec la propriété validate ajoutée
        });

        const limitedProposal = proposalsWithValidate.slice(0, numberOfProposition)
        
        const objectProposal = {
            id: uuidv4(),
            array: limitedProposal
        }
        store.dispatch({ type: types.SET_PROPOSAL, payload: objectProposal });
    }

    const handleClickValidateChoices = () => {
        

        if (proposal.array.length > 0) {
            const findProposal = historical_propositions.find((e) => e.historic.id === proposal.id)
            if (!findProposal) store.dispatch({type:"SET_HISTORIC", payload:[... historical_propositions, {date:new Date().toLocaleString(), historic:proposal}]});
        }
    }
  

    return(
        <main className="outlet" style={{ gridColumn: '2 / -1' }}>
            <section className="section">
                
                    <Form className="section__start">
                        <div>
                            <CiCircleMinus onClick={handleClickMinus} id="minus"/>
                            <input type="number" value={numberOfProposition} onChange={handleChange} id="starter"/>
                            <CiCirclePlus onClick={handleClickPlus} id="plus"/>
                        </div>
  
                        <button onClick={handleSubmit} className="buttonStarter">C'est parti !</button>
                    </Form>
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
                        {isConnected?
                            <div className="section__btnValidate">
                                <button onClick={handleClickValidateChoices}>Valider mes choix</button>
                            </div>
                            :
                            <div className="section__btnValidate">
                                <NavLink to={"/signin"}>Connecte toi pour valider tes choix</NavLink>
                            </div>
                            }
                    
                    </>
                        :
                        <p className="section__pNoResults">Aucuns résultats. Précise tes critères</p>
                    }
            </section>
        </main>
    )
}

export default Proposal;

export async function proposaLoader(){

store.dispatch({type:types.SET_IS_ASIDE_TRUE});

const urlClient = window.location.href;
const endpointApi = 'https://localhost:3000/api/recipe?';
const routeName = "recipe";


mappingUrlFunction(urlClient, endpointApi, routeName);

return null
}

