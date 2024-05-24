
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import Proposition from "../../Layout/UXElements/components/Proposition";
import { v4 as uuidv4 } from 'uuid';
import { FaPlus } from "react-icons/fa";
import { FaMinus } from "react-icons/fa6";
import LogoTet from '../../Layout/UXElements/icons/LogoTet/index'
import './Proposal.css';
import { NavLink } from "react-router-dom";
import types from "../../../store/reducers/types";
import { Form } from "react-router-dom";
import { HistoryApi } from "../../../api";


const Proposal = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()
    
    const {isConnected, id} = useSelector((state) => state.session);
    const {recipes} = useSelector((state) => state.proposal);
    const {numberOfProposition, generatedProposal, proposal, historicalPropositions} = useSelector((state) => state.proposal);

    const findProposal = historicalPropositions.find((e) => e.historic.id === proposal.id);
    const logoElement = document.querySelector("#imgLogo");
    const animationChef = "zoomInLeft"

    useEffect(() => {
        dispatch({type:types.SET_IS_ASIDE_TRUE});
    }, [])

    useEffect(() => {
        if (generatedProposal === false && generatedProposal !== null) {
            setProposition();
            dispatch({type:types.CLOSE_PROPOSAL})
        }

    }, [generatedProposal])

    const handleClickMinus = () => {
        if (numberOfProposition !== 0) dispatch({type:types.SUBTRACT_NUMBER_OF_PROPOSITION});
    }
    
    const handleClickPlus = () => {
        dispatch({type:types.ADD_NUMBER_OF_PROPOSITION});
    }

    const handleChange = () => {
        //
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch({type:types.GENERATE_PROPOSAL});
        new Promise((resolve, reject) => {
            logoElement.classList.add("animate__animated", `animate__${animationChef}`);
        
            // When the animation ends, we clean the classes and resolve the Promise
            function handleAnimationEnd(event) {
              event.stopPropagation();
              logoElement.classList.remove("animate__animated", `animate__${animationChef}`);
              resolve('Animation ended');
            }
        
            logoElement.addEventListener('animationend', handleAnimationEnd, {once: true});
          });
    }

    const setProposition = async () => {
        const proposalsWithValidate = recipes.map(recipe => {
            return { ...recipe, validate: true }; // Crée un nouvel objet avec la propriété validate ajoutée
        });

        const limitedProposal = proposalsWithValidate.slice(0, numberOfProposition)
        
        const objectProposal = {
            id: uuidv4(),
            array: limitedProposal
        }
        dispatch({ type: types.SET_PROPOSAL, payload: objectProposal });
    }

    const handleClickValidateChoices = async () => {

        if (proposal.array.length > 0) {
            if (!findProposal) {
                const createdHistory = await HistoryApi.create({userId:id});
                await Promise.all(proposal.array.map(async (recipe) => await HistoryApi.addRecipeToHistory(createdHistory.id, recipe.id, {validate:recipe.validate}) ));
                
                dispatch({type:types.SET_HISTORIC_PROPOSAL, payload:[... historicalPropositions, {date:new Date().toLocaleString(), historic:proposal}]});
                
            } else {
                navigate('/history')
            }
        }
    }
  

    return(
        <main className="outlet" style={{ gridColumn: '2 / -1' }}>
            <LogoTet size={10}/>
            <section className="section">
                
                    <Form className="section__start" action="/proposal">
                        <div>
                            <FaMinus onClick={handleClickMinus} id="minus" style={{color:"var(--colorUi4)"}} size={20}/>
                            <input type="number" value={numberOfProposition} onChange={handleChange} id="starter" aria-label="Nombre de propositions."/>
                            <FaPlus onClick={handleClickPlus} id="plus" style={{color:"var(--colorUi4)"}} size={20}/>
                        </div>
  
                        <button onClick={handleSubmit} className="buttonStarter" id="starterButton">C'est parti !</button>
                    </Form>
            </section>

            <section className="section">
                    {proposal.array.length > 0?
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
                                <button className="btnValidate" role="button" onClick={handleClickValidateChoices}>{findProposal?"Voir l'historique":"Valider les choix"}</button>
                            </div>
                            :
                            <div className="section__btnValidate">
                                <p>Connecte toi <NavLink to={"/signin"}>ici</NavLink> pour valider tes choix</p>
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

