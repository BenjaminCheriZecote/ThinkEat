import store from '../../../../store'
import { useSelector } from 'react-redux';
import Options from './OptionListFamily/Option';
import OptionChosen from './OptionListChosenFamily/OptionChosen';
import { MdKeyboardArrowDown } from "react-icons/md";


// import './Aside.scss'
import { NavLink, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { FamilyApi, IngredientApi } from '../../../../store/api';
import style from './Aside.module.css'
import { Form } from 'react-router-dom';
import { LiaEqualsSolid } from "react-icons/lia";
import { LiaGreaterThanEqualSolid } from "react-icons/lia";
import { LiaLessThanEqualSolid } from "react-icons/lia";



const Aside = () => {

    const [activeSelector, setActiveSelector] = useState(null)
    const location = useLocation();
    const currentPath = location.pathname;

    const {filters} = useSelector((state) => state.filters)
    const {criterias} = useSelector((state) => state.criterias)
    const {families} = useSelector((state) => state.families);
    const [familiesCopy, setFamiliesCopy] = useState(families);
    const {familiesChoices} = useSelector((state) => state.families);
    
    const {ingredients} = useSelector((state) => state.ingredients);
    const [ingredientsCopy, setIngredientsCopy] = useState(ingredients);
    const {ingredientsChoices} = useSelector((state) => state.ingredients);
    
    const allFamilies = {families,familiesChoices,familiesCopy}
    const allIngredients = {ingredients, ingredientsChoices, ingredientsCopy}
    
    // const {ingredientsbis} = useSelector((state) => state.ingredients)
    const [isRotatedFamilyIngredientSelect, setIsRotatedFamilyIngredient] = useState(false)
    const [isRotatedIngredientSelect, setIsRotatedIngredient] = useState(false)
    
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
    const {familyIngredientFilter} = useSelector((state) => state.filters.filters[5]);
    const {ingredientFilter} = useSelector((state) => state.filters.filters[6]);

    
    
    
    
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

    const handleClickSelectFamily = () => {
        if (activeSelector !== "families") {
            setActiveSelector("families");
        } else {
            setActiveSelector(null)
        }
        setIsRotatedFamilyIngredient(!isRotatedFamilyIngredientSelect);
        if (isRotatedIngredientSelect) {
            setIsRotatedIngredient(!isRotatedIngredientSelect);
        }
    }

    const handleClickSelectIngredient = () => {
        // const optionsContainer = event.target.closest("li").querySelector(".content");
        // optionsContainer.classList.toggle("hidden");
        if (activeSelector !== "ingredients") {
            setActiveSelector("ingredients");
            
        } else {
            setActiveSelector(null)
            setIsRotatedIngredient(false)
        }
        setIsRotatedIngredient(!isRotatedIngredientSelect);
    }

    
    const handleChangeSearchFamily = (event) => {
        const filteredResearch = families.filter((element) => element.name.toLowerCase().startsWith(event.target.value.toLocaleLowerCase()));
        setFamiliesCopy(filteredResearch)
    }

    const handleChangeSearchIngredient = (event) => {
        const filteredResearch = ingredients.filter((element) => element.name.toLowerCase().startsWith(event.target.value.toLocaleLowerCase()));
        setIngredientsCopy(filteredResearch)
    }
    
    const handleChangeFamilyIngredientFilter = () => {
        store.dispatch({type:"SET_FAMILY_FILTER"})
    }

    const handleChangeIngredientFilter = () => {
       store.dispatch({type:"SET_INGREDIENT_FILTER"})
    }

    const handleSubmitFilter = (event) => {
        // event.preventDefault();
        store.dispatch({type:"TURN_FILTER"})
    }
    return(
        <aside className={style.aside}>
            
                <Form className={style.aside__formCriteria} method="get"> 
                        <h3>Critères</h3>
                        <fieldset>
                            <legend>Faim</legend>
                            <div>
                                <li>
                                    <label htmlFor="hungryCriteria" >{criterias[1].name}</label>
                                    {/* <div className={style.checkboxWrapper19} >
                                    <input id="cbtest19" type="checkbox"/>
                                    <label className={style.checkBox} htmlFor="cbtest19">
                                    </label></div> */}
                                    <input id="hungryCriteria" type="checkbox" onChange={handleChangeHungerBigCriteria} checked={hungerBigCriteria?true:false}/>
                                </li>

                                <li>
                                    <label htmlFor="hungryCriteria" >Normal</label>
                                    <input id="hungryCriteria" type="checkbox" onChange={handleChangeHungerFewCriteria} checked={hungerFewCriteria?true:false}/>
                                </li>

                                <li>
                                    <label htmlFor="hungryCriteria" >{criterias[2].name}</label>
                                    <input id="hungryCriteria" type="checkbox" onChange={handleChangeHungerFewCriteria} checked={hungerFewCriteria?true:false}/>
                                </li>

                            </div>

                        </fieldset>
                    
                        <fieldset>
                            <legend>Temps</legend>
                            <div>
                                <li>
                                    <label htmlFor="cookingTimeCriteria" >{criterias[3].name}</label>
                                    <input id="cookingTimeCriteria" type="checkbox" onChange={handleChangePreparatingTimeLongCriteria} checked={preparating_timeLongCriteria?true:false}/>
                                </li>

                                <li>
                                    <label htmlFor="cookingTimeCriteria" >{criterias[4].name}</label>
                                    <input id="cookingTimeCriteria" type="checkbox" onChange={handleChangePreparatingTimeShortCriteria} checked={preparating_timeShortCriteria?true:false}/>
                                </li>
                            </div>

                        </fieldset>

                        <div className={style.asideFormCriteria__foodContainer}>
                            <fieldset>
                                <legend>Ingredients</legend>

                                <li className={style.selectBox}>
                                    <div className={style.selectOption} onClick={handleClickSelectFamily}>
                                        <button >Catégories</button><MdKeyboardArrowDown className={style.arrowSoValue} style={{transform: isRotatedFamilyIngredientSelect ? "rotate(180deg)" : "rotate(0)"}}/> 
                                    </div>

                                    {activeSelector === "families" && 
                                        <div className={style.content}>

                                            <div className={style.search}>
                                                <input type="search" id="optionSearchFamilyIngredient" placeholder="Rechercher" name="" onChange={handleChangeSearchFamily}/>
                                            </div>
                                            <ul className={style.options} >
                                            {familiesChoices.map((family, index) => (
                                                <OptionChosen key={index} choosen={family} stateName="families" />
                                            ))}
                                            {allFamilies[familiesCopy.length > 0 ? "familiesCopy" : "families"].map((family, index) => (
                                                <Options key={index} family={family} >{family.name}</Options>
                                            ))}
                                            {/* {familiesCopy.length > 0 ? (
                                                    familiesCopy.map((family, index) => (
                                                        <Options key={index} family={family} >{family.name}</Options>
                                                    ))
                                                ) : (
                                                    <>
                                                        
                                                        {families.map((family, index) => (
                                                            <Options key={index} family={family} >{family.name}</Options>
                                                        ))}
                                                    </>
                                                )} */}
                                            </ul>
                                        </div>}
                                    
                                </li>

                                <li className={style.selectBox}>
                                    <div className={style.selectOption} onClick={handleClickSelectIngredient}>
                                        <button >Ingrédients </button><MdKeyboardArrowDown className={style.arrowSoValue} style={{transform: isRotatedIngredientSelect ? "rotate(180deg)" : "rotate(0)"}}/> 
                                    </div>

                                    {activeSelector === "ingredients" &&
                                    <div className={style.content}>

                                        <div className={style.search}>
                                            <input type="search" id="optionSearchIngredient" placeholder="Rechercher" name="" onChange={handleChangeSearchIngredient}/>
                                        </div>
                                        <ul className={style.options} >
                                        {ingredientsChoices.map((ingredient, index) => {
                                            console.log(ingredient)
                                            return (<OptionChosen key={index} choosen={ingredient} stateName="ingredients" />)
                                        })}
                                        {allIngredients[ingredientsCopy.length > 0 ? "ingredientsCopy" : "ingredients"].map((ingredient, index) => (
                                        <Options key={index} ingredient={ingredient} >{ingredient.name}</Options>
                                        ))}

                                        {/* {ingredientsCopy.length > 0 ? (
                                                ingredientsCopy.map((ingredient, index) => (
                                                    <Options key={index} ingredient={ingredient} >{ingredient.name}</Options>
                                                ))
                                            ) : (
                                                <>
                                                    {ingredients.map((ingredient, index) => (
                                                        <Options key={index} ingredient={ingredient} >{ingredient.name}</Options>
                                                    ))}
                                                </>
                                            )} */}
                                        </ul>
                                    </div>}
                                    
                                </li> 
                            </fieldset> 

                            <fieldset>
                                <legend>Régimes alimentaires</legend>
                            </fieldset> 

                        </div>

                            <li>
                                <input id="cookingTimeCriteria" type="checkbox" onChange={handleChangeNonFavoritesRecipesCriteria} checked={nonFavoritesRecipesCriteria?true:false}/>
                                <label htmlFor="cookingTimeCriteria" >{criterias[5].name}</label>
                            </li>

                            <footer>
                                <small>0 résultats possibles</small>
                            </footer>        
                </Form>

                <div>
                    
                    <Form className={style.aside__formFilter} method="get" action={currentPath === "/proposal"?"/proposal":currentPath === "/recipes"?"/recipes":"/favorites"} onSubmit={handleSubmitFilter}>
                        <h3>Filtres</h3>
                        <fieldset>
                            <legend>Faim</legend>
                                <div>
                                    <li>
                                        <input id="hungerBigFilter" name="hunger" value="Copieux" type="checkbox" onChange={handleChangeHungerBigFilter} checked={hungerBigFilter?true:false}/>
                                        <label htmlFor="hungryBigFilter" >{filters[0].name}</label>
                                    </li>

                                    <li>
                                        <input id="hungerFewFilter" name="hunger" value="Normal" type="checkbox" onChange={handleChangeHungerFewFilter} checked={hungerFewFilter?true:false}/>
                                        <label htmlFor="hungerFewFilter" >{filters[1].name}</label>
                                    </li>

                                    <li>
                                        <input id="hungerNormalFilter" name="hunger" value="Léger" type="checkbox" onChange={handleChangeHungerFewFilter} checked={hungerFewFilter?true:false}/>
                                        <label htmlFor="hungerNormalFilter" >Normal</label>
                                    </li>

                                </div>
                        </fieldset>

                        <fieldset>
                            <legend>Temps</legend>
                            <div>
                                <li className={style.asideformFilter__inputTimeContainer}>
                                    <label htmlFor="preparatingTimeFilter" >Préparation</label>
                                    <div>
                                        <span></span>
                                        <input type="number" name="preparatingTimeFilter" id="preparatingTimeFilter" className={style.asideFormFilter__inputTime}/>
                                    </div>
                                </li>

                                <li className={style.asideformFilter__inputTimeContainer}>
                                    <label htmlFor="cookingTimeFilter" >Cuisson</label>
                                    <div>
                                        <span></span>
                                        <input type="number" name="cookingTimeFilter" id="cookingTimeFilter" className={style.asideFormFilter__inputTime}/>
                                    </div>
                                </li>
                                {/* <li className={style.asideformFilter__inputTimeContainer}>
                                    <label htmlFor="timeFilter" >Total</label>
                                    <div>
                                        <span></span>
                                        <input type="number" name="timeFilter" id="timeFilter" className={style.asideFormFilter__inputTime}/>
                                    </div>
                                </li> */}
                            </div>
                        </fieldset>

                        
                            <fieldset>
                                    <legend>Ingredients</legend>

                                    <div className={style.asideFormFilter__foodContainer}>
                                        <li className={style.selectBox}>
                                            <div className={style.selectOption} onClick={handleClickSelectFamily}>
                                                <button >Catégories</button><MdKeyboardArrowDown className={style.arrowSoValue} style={{transform: isRotatedFamilyIngredientSelect ? "rotate(180deg)" : "rotate(0)"}}/> 
                                            </div>

                                            {activeSelector === "families" && 
                                                <div className={style.content}>

                                                    <div className={style.search}>
                                                        <input type="search" id="optionSearchFamilyIngredient" placeholder="Rechercher" name="" onChange={handleChangeSearchFamily}/>
                                                    </div>
                                                    <ul className={style.options} >
                                                    {familiesChoices.map((family, index) => (
                                                        <OptionChosen key={index} choosen={family} stateName="families" />
                                                    ))}
                                                    {allFamilies[familiesCopy.length > 0 ? "familiesCopy" : "families"].map((family, index) => (
                                                        <Options key={index} family={family} >{family.name}</Options>
                                                    ))}
                                                    {/* {familiesCopy.length > 0 ? (
                                                            familiesCopy.map((family, index) => (
                                                                <Options key={index} family={family} >{family.name}</Options>
                                                            ))
                                                        ) : (
                                                            <>
                                                                
                                                                {families.map((family, index) => (
                                                                    <Options key={index} family={family} >{family.name}</Options>
                                                                ))}
                                                            </>
                                                        )} */}
                                                    </ul>
                                                </div>}
                                            
                                        </li>

                                        <li className={style.selectBox}>
                                            <div className={style.selectOption} onClick={handleClickSelectIngredient}>
                                                <button >Ingrédients  </button><MdKeyboardArrowDown className={style.arrowSoValue} style={{transform: isRotatedIngredientSelect ? "rotate(180deg)" : "rotate(0)"}}/> 
                                            </div>

                                            {activeSelector === "ingredients" &&
                                            <div className={style.content}>

                                                <div className={style.search}>
                                                    <input type="search" id="optionSearchIngredient" placeholder="Rechercher" name="" onChange={handleChangeSearchIngredient}/>
                                                </div>
                                                <ul className={style.options} >
                                                {ingredientsChoices.map((ingredient, index) => {
                                                    console.log(ingredient)
                                                    return (<OptionChosen key={index} choosen={ingredient} stateName="ingredients" />)
                                                })}
                                                {allIngredients[ingredientsCopy.length > 0 ? "ingredientsCopy" : "ingredients"].map((ingredient, index) => (
                                                <Options key={index} ingredient={ingredient} >{ingredient.name}</Options>
                                                ))}

                                                {/* {ingredientsCopy.length > 0 ? (
                                                        ingredientsCopy.map((ingredient, index) => (
                                                            <Options key={index} ingredient={ingredient} >{ingredient.name}</Options>
                                                        ))
                                                    ) : (
                                                        <>
                                                            {ingredients.map((ingredient, index) => (
                                                                <Options key={index} ingredient={ingredient} >{ingredient.name}</Options>
                                                            ))}
                                                        </>
                                                    )} */}
                                                </ul>
                                            </div>}
                                            
                                        </li> 

                                    </div>

                            </fieldset> 
                        

                        <li>
                            <input id="favoriteFilter" name="favoriteFilter" type="checkbox" onChange={handleChangeFavoriteFilter} checked={favoriteFilter?true:false}/>
                            <label htmlFor="favoriteFilter" >{filters[4].name}</label>
                        </li>

                        <li>
                            <button>Filtrer</button>
                        </li>
                    </Form>
                </div>
                    
            
            <NavLink className={style.asideA} to={"/proposal"}>
                <p>Nouvelle proposition </p>
                <label className={style.container}>
                    <input checked="checked" type="checkbox"/>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="50px" width="50px" className={style.like}>
                        <path d="M8 10V20M8 10L4 9.99998V20L8 20M8 10L13.1956 3.93847C13.6886 3.3633 14.4642 3.11604 15.1992 3.29977L15.2467 3.31166C16.5885 3.64711 17.1929 5.21057 16.4258 6.36135L14 9.99998H18.5604C19.8225 9.99998 20.7691 11.1546 20.5216 12.3922L19.3216 18.3922C19.1346 19.3271 18.3138 20 17.3604 20L8 20"></path>
                    </svg>
                    <svg width="50" height="50" xmlns="http://www.w3.org/2000/svg" className={style.celebrate}>
                        <polygon points="0,0 10,10"></polygon>
                        <polygon points="0,25 10,25"></polygon>
                        <polygon points="0,50 10,40"></polygon>
                        <polygon points="50,0 40,10"></polygon>
                        <polygon points="50,25 40,25"></polygon>
                        <polygon points="50,50 40,40"></polygon>
                    </svg>
                </label> 
            </NavLink>
        </aside>
    )
};

export default Aside;

export async function asideLoader() {
    async function fetchDataFamilyApi() {
        try {
            const families = await FamilyApi.getAll();
            store.dispatch({type:"SET_FAMILIES", payload: families})
            return families
        } catch (error) {
            console.log(error)
        }
    }
    fetchDataFamilyApi()

    // async function fetchDataIngredientApi() {
    //     try {
    //         const ingredients = await IngredientApi.getAll();
    //         console.log(ingredients)
    //         store.dispatch({type:"SET_INGREDIENTS_BIS", payload: ingredients})
    //         return ingredients
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }
    // fetchDataIngredientApi()

    // route back à corrigé

    // autre fetch ici
    return null;
  }