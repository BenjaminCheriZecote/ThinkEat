import store from '../../../../store'
import { useSelector } from 'react-redux';
import Options from './OptionListFamily/Option';
import OptionChosen from './OptionListChosenFamily/OptionChosen';
import { MdKeyboardArrowDown } from "react-icons/md";


import './Aside.scss'
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

const Aside = () => {

    const {filters} = useSelector((state) => state.filters)
    const {criterias} = useSelector((state) => state.criterias)
    const {families} = useSelector((state) => state.families);
    const [familiesCopy, setFamiliesCopy] = useState(families);
    const [familiesChoices, setFamiliesChoices] = useState([])

    const {hungerBigCriteria} = useSelector((state) => state.criterias.criterias[1]);
    const {hungerFewCriteria} = useSelector((state) => state.criterias.criterias[2]);
    const {preparating_timeLongCriteria} = useSelector((state) => state.criterias.criterias[3]);
    const {preparating_timeShortCriteria} = useSelector((state) => state.criterias.criterias[4]);
    const {nonFavoritesRecipesCriteria} = useSelector((state) => state.criterias.criterias[5]);

    const {hungerBigFilter} = useSelector((state) => state.filters.filters[0]);
    const {hungerFewFilter} = useSelector((state) => state.filters.filters[1]);
    const {preparating_timeLongFilter} = useSelector((state) => state.filters.filters[2]);
    const {preparating_timeShortFilter} = useSelector((state) => state.filters.filters[3]);
    const {favoriteFilter} = useSelector((state) => state.filters.filters[4]);

    const handleChangeHungerBigCriteria = () => {
        store.dispatch({type:"SET_HUNGER_BIG_CRITERIA"});
    }

    const handleChangeHungerFewCriteria = () => {
        store.dispatch({type:"SET_HUNGER_FEW_CRITERIA"});
    }

    const handleChangePreparatingTimeLongCriteria = () => {
        store.dispatch({type:"SET_PREPARATING_TIME_LONG_CRITERIA"})
    }

    const handleChangePreparatingTimeShortCriteria = () => {
        store.dispatch({type:"SET_PREPARATING_TIME_SHORT_CRITERIA"})
    }


    const handleChangeHungerBigFilter = () => {
        store.dispatch({type:"SET_HUNGER_BIG_FILTER"});
    }

    const handleChangeHungerFewFilter = () => {
        store.dispatch({type:"SET_HUNGER_FEW_FILTER"});
    }

    const handleChangePreparatingTimeLongFilter = () => {
        store.dispatch({type:"SET_PREPARATING_TIME_LONG_FILTER"})
    }

    const handleChangePreparatingTimeShortFilter = () => {
        store.dispatch({type:"SET_PREPARATING_TIME_SHORT_FILTER"})
    }

    const handleChangeNonFavoritesRecipesCriteria = () => {
        store.dispatch({type:"SET_NON_FAVORITES_RECIPES_CRITERIA"})
    }

    const handleChangeFavoriteFilter = () => {
        store.dispatch({type:"SET_FAVORITES_FILTER"})
    }

    const handleClickFilter = () => {
        store.dispatch({type:"TURN_FILTER"})
    }

    const handleClickSelectFamily = (event) => {
        const optionsContainer = event.target.closest("li").querySelector(".content");
        optionsContainer.classList.toggle("hidden");
        const arrowElement = event.target.querySelector(".arrowSoValue")
        arrowElement.classList.toggle("rotate")
    }

    const handleChangeSearchFamily = (event) => {
        console.log(familiesCopy)
        const filteredResearch = families.filter((element) => element.name.toLowerCase().includes(event.target.value.toLocaleLowerCase()) );
        setFamiliesCopy(filteredResearch)
    }



    return(
        <aside className="aside">
            
                <ul className="aside__top"> Critères
                    
                            <li>
                                <input id="hungryCriteria" type="checkbox" onChange={handleChangeHungerBigCriteria} checked={hungerBigCriteria?true:false}/>
                                <label htmlFor="hungryCriteria" >{criterias[1].name}</label>
                            </li>

                            <li>
                                <input id="hungryCriteria" type="checkbox" onChange={handleChangeHungerFewCriteria} checked={hungerFewCriteria?true:false}/>
                                <label htmlFor="hungryCriteria" >{criterias[2].name}</label>
                            </li>

                            <li>
                                <input id="cookingTimeCriteria" type="checkbox" onChange={handleChangePreparatingTimeLongCriteria} checked={preparating_timeLongCriteria?true:false}/>
                                <label htmlFor="cookingTimeCriteria" >{criterias[3].name}</label>
                            </li>

                            <li>
                                <input id="cookingTimeCriteria" type="checkbox" onChange={handleChangePreparatingTimeShortCriteria} checked={preparating_timeShortCriteria?true:false}/>
                                <label htmlFor="cookingTimeCriteria" >{criterias[4].name}</label>
                            </li>

                            <li>
                                <input id="cookingTimeCriteria" type="checkbox" onChange={handleChangeNonFavoritesRecipesCriteria} checked={nonFavoritesRecipesCriteria?true:false}/>
                                <label htmlFor="cookingTimeCriteria" >{criterias[5].name}</label>
                            </li>

                            <li className='select-box'>
                                <div className="select-option">
                                    <button  id='soValue' onClick={handleClickSelectFamily}>Catégorie d'ingrédients <MdKeyboardArrowDown className='arrowSoValue'/> </button> 
                                </div>

                                <div className="content hidden">

                                    <div className="search">
                                        <input type="search" id="optionSearch" placeholder="Rechercher" name="" onChange={handleChangeSearchFamily}/>
                                    </div>
                                    <ul className="options" >
                                        {familiesCopy.length > 0?
                                            familiesCopy.map((family, index) => {
                                                return(
                                                    <Options key={index} family={family} setFamiliesChoices={setFamiliesChoices} >{family.name}</Options>
                                                )
                                            })
                                            :
                                            families.map((family, index) => {
                                                return(
                                                    <Options key={index} family={family} setFamiliesChoices={setFamiliesChoices} >{family.name}</Options>
                                                )
                                            })}

                                    </ul>
                                </div>
                                
                            </li>

                            <li>
                                <ul>
                                    {familiesChoices ?
                                        familiesChoices.map((family, index) => {
                                            return(
                                                <OptionChosen key={index} family={family} setFamiliesChoices={setFamiliesChoices}/>
                                            )
                                        })
                                    :
                                    ""}

                                </ul>
                            </li>

                            

                </ul>

                <div>
                    
                    <ul> Filtres
                        <li >
                            <input id="hungryFilter" type="checkbox" onChange={handleChangeHungerBigFilter} checked={hungerBigFilter?true:false}/>
                            <label htmlFor="hungryFilter" >{filters[0].name}</label>
                        </li>

                        <li>
                            <input id="hungryFilter" type="checkbox" onChange={handleChangeHungerFewFilter} checked={hungerFewFilter?true:false}/>
                            <label htmlFor="hungryFilter" >{filters[1].name}</label>
                        </li>

                        <li>
                            <input id="cookingTimeFilter" type="checkbox" onChange={handleChangePreparatingTimeLongFilter} checked={preparating_timeLongFilter?true:false}/>
                            <label htmlFor="cookingTimeFilter" >{filters[2].name}</label>
                        </li>

                        <li>
                            <input id="cookingTimeFilter" type="checkbox" onChange={handleChangePreparatingTimeShortFilter} checked={preparating_timeShortFilter?true:false}/>
                            <label htmlFor="cookingTimeFilter" >{filters[3].name}</label>
                        </li>

                        <li>
                            <input id="favoriteCriteria" type="checkbox" onChange={handleChangeFavoriteFilter} checked={favoriteFilter?true:false}/>
                            <label htmlFor="favoriteCriteria" >{filters[4].name}</label>
                        </li>

                        <li>
                            <button onClick={handleClickFilter}>Filtrer</button>
                        </li>
                    </ul>
                </div>
                    
            
            <NavLink className="aside__a" to={"/proposal"}>Nouvelle proposition</NavLink>
        </aside>
    )
};

export default Aside;